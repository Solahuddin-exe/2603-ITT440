// ============================================================================
// SPIKE TEST  -  JSONPlaceholder /posts endpoint
// Tool: Grafana k6
// ----------------------------------------------------------------------------
// PURPOSE OF A SPIKE TEST:
// A spike test throws a SUDDEN, MASSIVE burst of traffic at the system with
// almost no warning, then drops back down just as fast. This simulates events
// like a flash sale, a viral post, or a marketing email blast. We want to see:
//   - does the system survive the sudden surge?
//   - how high do response times jump at the moment of the spike?
//   - how quickly does it RECOVER once the spike passes?
// The key difference from a stress test: a stress test climbs gradually; a
// spike test jumps almost instantly.
// ============================================================================

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const errorRate = new Rate('custom_error_rate');
const responseTimeTrend = new Trend('custom_response_time');

// ---------------------------------------------------------------------------
// LOAD PROFILE for a SPIKE test: low baseline -> sudden jump to a huge number
// of users in seconds -> hold briefly -> drop back to baseline -> recover.
// ---------------------------------------------------------------------------
export const options = {
  stages: [
    { duration: '30s', target: 10  },  // calm baseline
    { duration: '10s', target: 300 },  // THE SPIKE: jump to 300 VUs in 10 seconds
    { duration: '1m',  target: 300 },  // hold the spike to observe behaviour
    { duration: '10s', target: 10  },  // drop sharply back to baseline
    { duration: '30s', target: 10  },  // recovery window: did response times return to normal?
    { duration: '10s', target: 0   },  // ramp down to finish
  ],
  thresholds: {
    http_req_duration: ['p(95)<3000'], // generous - spikes cause temporary pain
    http_req_failed:   ['rate<0.10'],  // tolerate up to 10% failures during the burst
  },
};

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export default function () {
  const res = http.get(BASE_URL);

  const ok = check(res, {
    'status is 200': (r) => r.status === 200,
  });

  errorRate.add(!ok);
  responseTimeTrend.add(res.timings.duration);

  sleep(1);
}
