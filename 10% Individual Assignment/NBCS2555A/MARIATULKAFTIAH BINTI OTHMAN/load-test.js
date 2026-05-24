// ============================================================================
// LOAD TEST  -  JSONPlaceholder /posts endpoint
// Tool: Grafana k6
// ----------------------------------------------------------------------------
// PURPOSE OF A LOAD TEST:
// A load test checks how the system behaves under an EXPECTED, NORMAL amount of
// traffic. We are NOT trying to break it here. We are confirming that under a
// realistic, steady number of concurrent users the response times stay
// acceptable and the error rate stays near zero.
// ============================================================================

import http from 'k6/http';            // lets us send HTTP requests
import { check, sleep } from 'k6';     // 'check' = assertions, 'sleep' = think-time
import { Rate, Trend } from 'k6/metrics'; // custom metrics we define ourselves

// ---- Custom metrics (these show up in the summary so we can analyse them) ----
const errorRate = new Rate('custom_error_rate');        // % of failed checks
const responseTimeTrend = new Trend('custom_response_time'); // response-time stats

// ---------------------------------------------------------------------------
// OPTIONS: this is the "load profile". For a LOAD test we ramp up gently to a
// normal load, hold it steady, then ramp down. This simulates a normal busy
// period (e.g. an office logging in over a few minutes).
// ---------------------------------------------------------------------------
export const options = {
  stages: [
    { duration: '30s', target: 20 },  // ramp UP from 0 to 20 virtual users (VUs)
    { duration: '1m',  target: 20 },  // HOLD steady at 20 VUs for 1 minute
    { duration: '30s', target: 0  },  // ramp DOWN back to 0
  ],
  // Thresholds are PASS/FAIL conditions. If these are breached, k6 marks the
  // whole test as failed. These numbers double as our "hypothesis" targets.
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must finish under 500ms
    http_req_failed:   ['rate<0.01'], // less than 1% of requests may fail
  },
};

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

// ---------------------------------------------------------------------------
// The default function = what EACH virtual user does, repeatedly, for the
// whole test duration. We simulate a realistic mix: mostly reading posts,
// occasionally creating one.
// ---------------------------------------------------------------------------
export default function () {
  // --- Scenario 1: GET the list of posts (a "read" - the most common action) ---
  const getRes = http.get(BASE_URL);

  // check() returns true/false; we feed the failures into our error metric
  const getOk = check(getRes, {
    'GET status is 200':            (r) => r.status === 200,
    'GET response time < 500ms':    (r) => r.timings.duration < 500,
    'GET body is not empty':        (r) => r.body && r.body.length > 0,
  });
  errorRate.add(!getOk);
  responseTimeTrend.add(getRes.timings.duration);

  sleep(1); // "think time": a real user pauses ~1s before the next action

  // --- Scenario 2: POST a new post (a "write" - less frequent) ---
  const payload = JSON.stringify({
    title: 'Performance test post',
    body: 'This is a test post created during a k6 load test.',
    userId: 1,
  });
  const params = { headers: { 'Content-Type': 'application/json' } };

  const postRes = http.post(BASE_URL, payload, params);
  const postOk = check(postRes, {
    'POST status is 201': (r) => r.status === 201, // 201 = "Created"
  });
  errorRate.add(!postOk);

  sleep(1);
}
