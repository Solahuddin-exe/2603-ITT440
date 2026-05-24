// ============================================================================
// STRESS TEST  -  JSONPlaceholder /posts endpoint
// Tool: Grafana k6
// ----------------------------------------------------------------------------
// PURPOSE OF A STRESS TEST:
// A stress test deliberately pushes the system BEYOND normal load to find its
// breaking point. We keep increasing users in steps until response times
// degrade badly and/or errors appear. The goal is to discover:
//   - the maximum load the system can handle gracefully
//   - HOW it fails (slow responses? timeouts? 5xx errors?)
//   - whether it recovers when load drops back down
// ============================================================================

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const errorRate = new Rate('custom_error_rate');
const responseTimeTrend = new Trend('custom_response_time');

// ---------------------------------------------------------------------------
// LOAD PROFILE for a STRESS test: a "staircase" that climbs higher and higher.
// Each step holds for a moment so we can see the effect of each new level.
// We climb well past the 20 VUs used in the normal load test.
// ---------------------------------------------------------------------------
export const options = {
  stages: [
    { duration: '1m', target: 50  },  // step 1: above normal
    { duration: '1m', target: 100 },  // step 2: heavy
    { duration: '1m', target: 200 },  // step 3: very heavy
    { duration: '1m', target: 300 },  // step 4: extreme - looking for the breaking point
    { duration: '1m', target: 0   },  // recovery: drop to 0 and watch it recover
  ],
  thresholds: {
    // Looser limits than the load test - here we EXPECT some strain.
    // We still record them so we can report exactly when they were breached.
    http_req_duration: ['p(95)<2000'], // 95% under 2s (relaxed)
    http_req_failed:   ['rate<0.05'],  // tolerate up to 5% failures
  },
};

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export default function () {
  const res = http.get(BASE_URL);

  const ok = check(res, {
    'status is 200':          (r) => r.status === 200,
    'response time < 2000ms': (r) => r.timings.duration < 2000,
  });

  errorRate.add(!ok);
  responseTimeTrend.add(res.timings.duration);

  sleep(1);
}
