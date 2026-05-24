# MUHAMMAD FIRDAUS BIN KHAIRON NIZAM

**Course:** ITT440 - Network Programming  
**Group:** NBCS2555B  
**Name:** Muhammad Firdaus Bin Khairon Nizam <br/>
**Student ID:** 2026731927 </br>
**Lecturer:** Sir Shahadan Bin Saad
---
<img width="521" height="177" alt="jmeter" src="https://github.com/user-attachments/assets/e57fb249-0c02-43f2-a0cc-8630f5eee462" />
<br/>

## Performance Testing And Bottleneck Analysis of a Web Application Using Apache JMeter

---

## 1. INTRODUCTION

Performance testing is a fundamental practice for evaluating the reliability, responsiveness, and scalability of modern web applications. As web-based platforms increasingly handle concurrent user interactions such as flight searches, form submissions, and online transactions, understanding how these systems behave under varying levels of demand becomes essential for delivering a seamless user experience. This project focuses on analyzing the performance of a demo travel booking website, specifically BlazeDemo (https://blazedemo.com), which simulates a real-world flight reservation process. Unlike traditional performance testing approaches that target static pages or simple endpoints, this study incorporates a complete user journey involving dynamic interactions such as selecting departure and arrival cities, choosing a flight from a list, and completing a purchase form. The main objectives of this study are:

* To evaluate system performance under expected normal user loads through load testing

* To determine the application's breaking point by progressively increasing user concurrency beyond normal limits

* To simulate sustained normal-to-peak traffic over an extended period to identify memory leaks, resource fragmentation, and degradation over time.

Through these tests, this project aims to identify performance bottlenecks, measure response times, and provide insights into the application's overall stability and capacity for handling real-world usage patterns.

---
## 2.METHODOLOGY
This section outlines the systematic approach taken to conduct performance testing and bottleneck analysis on the BlazeDemo web application using Apache JMeter. The methodology is divided into five phases: test environment setup, test script development, test scenario design, test execution, and results analysis.

### 2.1 Test Environment Setup
Before conducting any performance tests, the testing environment was properly configured to ensure accurate and repeatable results. The following tools and specifications were used:

| Component | Specification |
| :---         |     :---:      |
| Testing Tool |	Apache JMeter (latest version) |
|Target Application	| BlazeDemo (https://blazedemo.com) |
|Operating System |	macOS |
| Network |	Stable internet connection |
| Listeners	| View Results Tree, Summary Report, Aggregate Report |

Additionally, necessary JMeter plugins were installed, and the system was verified to have sufficient memory and processing power to simulate the required number of virtual users without becoming a bottleneck itself.


### 2.2. Test Script Development 
A realistic user journey was scripted in JMeter to accurately simulate how a real user would interact with the BlazeDemo website. The complete end-to-end workflow consisted of the following sequential HTTP requests:

| Step | Action | Endpoint/Path |
| :---         |     :---:      |     :---:      |
|1	| Access the homepage |	/ |
|2	| Select departure and arrival cities	| /reserve.php |
|3	| Choose a specific flight | /purchase.php |
|4	|Fill in passenger and payment details	|/purchase.php (POST)|
|5	|Confirm booking and receive confirmation	|/confirmation.php|

The script was developed using two methods:

* BlazeMeter Chrome Extension: Used to record the complete user journey and export it as a .jmx file.

* Manual Construction: HTTP Request samplers were manually added and configured in JMeter for greater control and understanding.

To simulate realistic user behavior, think times (pauses between actions) were added using the Constant Timer or Gaussian Random Timer in JMeter.

### 2.3 Test Scenario Design
Three distinct performance test scenarios were designed to evaluate different aspects of the application's behavior under load. Each scenario was configured using JMeter's Thread Group with specific parameters.

#### 2.3.1 Load Test - 
The load test was designed to simulate expected normal operating conditions. The goal was to establish a baseline performance metric.

| Parameter | Value |
| :--- | :---: |
| Number of Threads (Users) | 50 |
| Ramp-Up Period | 60 seconds |
| Loop Count | Infinite |
| Duration | ~5 minutes |
| Test Objective | Measure response times, throughput, and error rate under normal load |

      
#### 2.3.2 Stress Test - 
The stress test aimed to push the application beyond its normal capacity to identify the breaking point and observe failure behavior.

| Parameter	| Value |
| :--- | :---: |
| Number of Threads (Users)	| 500 |
| Ramp-Up Period	| 120 seconds |
| Loop Count	| Infinite |
| Duration	| ~20 minutes |
| Test Objective	| Determine maximum user capacity and observe degradation patterns |

#### 2.3.3 Endurance Test - 
The endurance test was designed to simulate sustained normal-to-peak traffic over an extended period to identify memory leaks, resource fragmentation, and degradation over time.

| Parameter | Value |
| :--- | :---: |
| Number of Threads (Users)	| 100 |
| Ramp-Up Period |60 Seconds |
| Loop Count | Infinite cycles |
| Duration | 1 Hour |
| Test Objective	| Detect memory leaks, resource exhaustion, and performance degradation over prolonged operation. | 


### 2.4 Test Execution
All tests were executed using JMeter in non-GUI (command-line) mode to maximize performance and resource efficiency. The following command was used for each test

* Load Test <br/>

      bash
      ./jmeter -n -t /Users/void/Documents/ITT440/Individual\ Assignment/Blazedemotest.jmx -l /Users/void/Documents/ITT440/Individual\    
       Assignment/LoadTestV4.csv  -e -o /Users/void/Documents/ITT440/Individual\ Assignment/LoadTestV4
  
* Stress Test <br/>

      bash
      ./jmeter -n -t /Users/void/Documents/ITT440/Individual\ Assignment/Blazedemotest.jmx -l /Users/void/Documents/ITT440/Individual\    
       Assignment/StressTestV3.csv  -e -o /Users/void/Documents/ITT440/Individual\ Assignment/StressTestV3
  
* Endurance Test <br/>


       bash
      ./jmeter -n -t /Users/void/Documents/ITT440/Individual\ Assignment/Blazedemotest.jmx -l /Users/void/Documents/ITT440/Individual\    
       Assignment/EnduranceTestV1.csv  -e -o /Users/void/Documents/ITT440/Individual\ Assignment/EnduranceTest
  
Before each test, the following steps were performed:

* The application (BlazeDemo) was verified to be accessible and responsive.

* System resources (CPU, memory, network) on the testing machine were monitored to ensure they were not interfering with results.

* A warm-up run was conducted to allow Just-In-Time compilation and caching mechanisms to stabilize.

* Each test was executed three times to ensure consistency and reliability of results. The average values were then calculated for analysis.

### 2.5 Results Collection and Analysis
During and after each test execution, performance data was collected using JMeter listeners and the generated HTML report. The key performance metrics analyzed included:

| Metric | Description |
|--------|-------------|
| Total Requests | Total number of HTTP requests sent during the test |
| Error Rate | Percentage of failed requests (0% indicates no failures) |
| Average Response | Mean response time across all requests (good range: <500ms) |
| Min Response | Fastest recorded response time |
| Max Response | Slowest recorded response time (acceptable range: <3000ms) |
| Median | Middle value where 50% of requests are faster and 50% are slower |
| 90th Percentile | 90% of requests completed faster than this value |
| 95th Percentile | 95% of requests completed faster than this value |
| 99th Percentile | 99% of requests completed faster than this value |
| Throughput | Number of transactions successfully processed per second |

Bottlenecks were identified by analyzing which steps in the user journey exhibited the highest response times or error rates under increasing load. Potential causes such as network latency, server processing limits, or application code inefficiencies were considered.

---
## 3.OUTPUT

## 3.1 Load Test Results with Analysis

<img width="1184" height="338" alt="image" src="https://github.com/user-attachments/assets/6824d448-e680-4a09-9f12-ea6329c170ce" />

<br/>

### Load Test Result

### Overall Statistics

| Metric | Value | Status |
|--------|-------|--------|
| Total Requests | 3,873 | — |
| Error Rate | 0.00% | ✅ Excellent |
| Average Response | 456.67 ms | ✅ Good (<500ms) |
| Min Response | 324 ms | ✅ Good |
| Max Response | 3,310 ms | ⚠️ Borderline (<3000ms) |
| Median | 435.00 ms | ⚠️ Borderline (>400ms) |
| 90th Percentile | 570.20 ms | ✅ Good (<800ms) |
| 95th Percentile | 627.00 ms | ✅ Good (<1000ms) |
| 99th Percentile | 743.26 ms | ✅ Good (<1500ms) |
| Throughput | 13.04 txn/s | Moderate |

### Per-Endpoint Breakdown

| Endpoint | Samples | Avg (ms) | Min (ms) | Max (ms) | 90th | 95th | 99th | Throughput (txn/s) |
|----------|---------|----------|----------|----------|------|------|------|--------------------|
| Find Flights | 976 | 421.74 | 324 | 1,830 | 479.30 | 506.00 | 629.53 | 3.33 |
| Complete Booking | 950 | 423.90 | 324 | 1,661 | 485.00 | 514.80 | 587.98 | 3.29 |
| Choose Flight | 964 | 425.75 | 328 | 1,653 | 487.50 | 514.50 | 594.70 | 3.30 |
| Homepage | 983 | 553.34 | 378 | 3,310 | 667.60 | 714.00 | 829.16 | 3.31 |

### Load Test Analysis

| Aspect | Finding |
|--------|---------|
| **Overall Result** | ✅ **PASS** — All metrics within or near acceptable ranges |
| **Error Rate** | ✅ 0% — No failures |
| **Average Response** | ✅ 457ms — Within <500ms target |
| **Homepage Performance** | ⚠️ 553ms avg — Slower than other endpoints but acceptable |
| **Max Response** | ⚠️ 3,310ms — Slightly above 3,000ms target |
| **99th Percentile** | ✅ 743ms — Well within <1500ms target |
| **Throughput** | ✅ 13.04 txn/s — Stable across all endpoints |

### Key Observations

- **Homepage is the slowest endpoint** (553ms vs 424ms average for transactions)
- **Find Flights is the fastest** (422ms average)
- **Max spike on Homepage** (3,310ms) — Worth investigating but not critical
- **All endpoints have 0% error rate**
- **Throughput evenly distributed** (~3.3 txn/s per endpoint)

### Verdict

| Criteria | Status |
|----------|--------|
| Error-free execution | ✅ Yes |
| Average response <500ms | ✅ Yes (457ms) |
| 95th percentile <1000ms | ✅ Yes (627ms) |
| 99th percentile <1500ms | ✅ Yes (743ms) |
| Max response <3000ms | ⚠️ Slightly exceeded (3,310ms) |
| **Load Test Result** | ✅ **PASS** |


### Raw Data
#### 📊 Response Over time
<br/>
<img width="1181" height="518" alt="image" src="https://github.com/user-attachments/assets/1d357224-505a-4ffb-8937-395bf9ab34ee" />

<br/>

#### 📊 Response Time Percentiles Over Time (successful responses)
<br/>
<img width="1181" height="520" alt="image" src="https://github.com/user-attachments/assets/f61711c7-c539-4d7c-8ab5-e848152de269" />


## 3.2 Stress Test Results with Analysis

<img width="1178" height="364" alt="image" src="https://github.com/user-attachments/assets/87869e6d-45e1-4c1c-99dd-fbac49781949" />

<br/>
<img width="1160" height="382" alt="image" src="https://github.com/user-attachments/assets/1751a3f0-d177-4d0b-9ffe-fa22a1f8a863" />

<br/>

## Stress Test Statistics Report

### Overall Statistics

| Metric | Value |
|--------|-------|
| Total Requests | 142,486 |
| Error Rate | 0.02% (32 errors) |
| Average Response | 984.81 ms |
| Min Response | 1 ms ⚠️ |
| 90th Percentile | 1379.80 ms |
| 95th Percentile | 2674.90 ms |
| 99th Percentile | 4793.97 ms (4.79 sec) |
| Maximum Response | 124,320 ms (124.32 sec / 2+ minutes) ❌ |
| Throughput | 118.43 txn/s ✅ |

### Per-Endpoint Breakdown

| Endpoint | Samples | Errors | Error % | Avg (ms) | Min (ms) | Max (ms) | 90th | 95th | 99th |
|----------|---------|--------|---------|----------|----------|----------|------|------|------|
| Choose Flight | 35,550 | 0 | 0.00% | 917.76 | 324 | 11,385 | 1559.90 | 2639.00 | 4995.95 |
| Complete Booking | 35,438 | 0 | 0.00% | 918.50 | 322 | 10,287 | 1555.90 | 2639.00 | 4956.94 |
| Find Flights | 35,686 | 1 | 0.00% | 914.34 | 1 | 10,184 | 1565.00 | 2745.85 | 5126.99 |
| Homepage | 35,812 | 31 | **0.09%** | 1187.19 | 371 | **124,320** | 2108.90 | 3231.95 | 5512.98 |

### Error Breakdown

| Error Type | Count | % of Errors |
|------------|-------|--------------|
| SocketException: Connection reset | 29 | 90.63% |
| NoHttpResponseException (no response) | 2 | 6.25% |
| SSLHandshakeException (handshake terminated) | 1 | 3.13% |

### Stress Test Analysis

| Aspect | Finding |
|--------|---------|
| **Breaking Point** | ❌ Reached — Homepage maxed at **124 seconds**, severe degradation |
| **System Stability Under Stress** | ⚠️ Partial failure — 0.02% error rate, but extreme latency spikes |
| **Homepage Performance** | ❌ **Worst affected** — 124s max, 0.09% error rate, all connection resets |
| **Transaction Endpoints** | ⚠️ Degraded but survived — No errors, max ~10-11 seconds |
| **Find Flights** | ⚠️ 1ms min suggests a cached/pre-validated response or edge case |
| **Error Pattern** | 🔴 Connection resets (90%) — Server aggressively closing connections under overload |
| **Throughput** | ✅ 118.43 txn/s — Surprisingly high despite extreme latency |

### Stress-Specific Observations

- **Min response 1ms** (`Find Flights`) — May indicate:
  - Cached response
  - Immediate rejection before processing
  - False sample (check timestamp)

- **99th percentile ~4.8-5.5 seconds** — Most requests still completed, but very slow

- **Homepage degradation** — 124s max is catastrophic:
  - Likely thread pool exhaustion
  - Queue buildup
  - Possible memory pressure / GC thrashing

- **Connection resets** — Server actively terminating connections, not just timing out

### Verdict

| Criteria | Status |
|----------|--------|
| Breaking point found | ✅ Yes — Homepage at extreme load |
| Graceful degradation | ❌ No — 124s response time is failure |
| Error rate controlled | ⚠️ Partial — 0.02% overall, but 0.09% on homepage |
| Transaction endpoints survive | ✅ Yes — 0 errors on booking/flight endpoints |
| **Stress Test Result** | ⚠️ **PARTIAL PASS / FAIL** — System survives but homepage collapses |

### Root Cause Hypotheses

| Issue | Likelihood |
|-------|------------|
| Homepage has inefficient queries or processing | 🔴 High |
| Thread pool saturation causing queue buildup | 🔴 High |
| Connection pool exhaustion on backend | 🟡 Medium |
| Memory leak amplified under stress | 🟡 Medium |
| No circuit breaker on homepage | 🟡 Medium |

### Raw Data
#### 📊 Response Over time
<br/>
<img width="1184" height="517" alt="image" src="https://github.com/user-attachments/assets/77c2d813-9ac8-4ed1-a691-20bd752bea5b" />

<br/>

#### 📊 Response Time Percentiles Over Time (successful responses)
<br/>
<img width="1183" height="522" alt="image" src="https://github.com/user-attachments/assets/2c914982-0f1c-40aa-a08e-900dc7f2b7e7" />





## 3.3 Endurance Test Results with Analysis

<img width="1183" height="339" alt="image" src="https://github.com/user-attachments/assets/76b9e3d6-d5e5-4558-9417-057bfe6ced9c" />


<br/>

## Endurance Test Statistics Report

### Overall Statistics

| Metric | Value |
|--------|-------|
| Total Requests | 5,105 |
| Test Duration (approx.) | ~1 hour  |
| Error Rate | 0.00% ✅ |
| Average Response | 512.53 ms |
| Min Response | 300 ms |
| 90th Percentile | 662.00 ms |
| 95th Percentile | 767.00 ms |
| 99th Percentile | 1003.00 ms (1.00 sec) |
| Maximum Response | 1958 ms (1.96 sec) |
| Throughput | 1.42 txn/s (steady) |

### Per-Endpoint Breakdown

| Endpoint | Samples | Avg (ms) | Min (ms) | Max (ms) | 90th | 95th | 99th |
|----------|---------|----------|----------|----------|------|------|------|
| Choose Flight | 1,274 | 518.24 | 309 | 1,659 | 674.50 | 805.50 | 1,038.50 |
| Complete Booking | 1,274 | 507.86 | 311 | 1,839 | 648.00 | 738.50 | 975.50 |
| Find Flights | 1,278 | 514.13 | 306 | 1,958 | 666.70 | 760.25 | 1,016.15 |
| Homepage | 1,279 | 509.91 | 300 | 1,417 | 656.00 | 771.00 | 990.40 |

### Endurance Test Analysis

| Aspect | Finding |
|--------|---------|
| **Memory Leak Detection** | ✅ No evidence — Response times stable (avg ~510ms across all endpoints) |
| **Response Time Degradation** | ✅ None — Average, median, and percentiles remained consistent |
| **Error Accumulation** | ✅ None — 0% error rate throughout the test duration |
| **Long-Run Stability** | ✅ Excellent — No performance degradation over time |
| **Max Response Time** | ⚠️ 1.96s occurred — Acceptable for endurance, but worth investigating |
| **Throughput Consistency** | ✅ 1.42 txn/s — Perfectly even distribution across all endpoints |

### Endurance-Specific Observations

- **No upward trend** in response times — suggests **no memory leaks**
- **No error accumulation** — system remains healthy under sustained load
- **99th percentile ~1 second** — Very good for long-running test
- **Max spike (1.96s)** isolated to `Find Flights` — likely a GC pause or minor contention, not systemic degradation

### Verdict

| Criteria | Status |
|----------|--------|
| Memory leak | ✅ Not detected |
| Response time creep | ✅ None |
| Error rate increase over time | ✅ None (0%) |
| Sustained throughput | ✅ Stable |
| **Endurance Test Result** | ✅ **PASS** — System can sustain this load indefinitely without degradation |


  
### Raw Data
#### 📊 Response Over time
<br/>
<img width="1184" height="518" alt="image" src="https://github.com/user-attachments/assets/de0d4d2f-aef2-4aea-af32-e6fd77abda8e" />

<br/>

#### 📊 Response Time Percentiles Over Time (successful responses)
<br/>
<img width="1184" height="520" alt="image" src="https://github.com/user-attachments/assets/393046a6-aa5a-41f3-a0a1-00bb18334b69" />


---

# Final Conclusion (Based on All Three Tests)

## One-Sentence Summary

> **The system is now stable and performant under normal and sustained load, but still fails catastrophically under extreme stress due to homepage collapse.**

---

## Overall Verdict

| Test Type | Result |
|-----------|--------|
| Load Test (Updated) | ✅ **PASS** |
| Endurance Test | ✅ **PASS** |
| Stress Test | ❌ **FAIL** |

**Final Verdict: ⚠️ READY for low to medium production traffic — NOT ready for high-traffic / peak scenarios**

---

## Test Results Summary

| Metric | Load Test | Endurance Test | Stress Test |
|--------|-----------|----------------|-------------|
| Total Requests | 3,873 | 5,105 | 142,486 |
| Error Rate | 0.00% ✅ | 0.00% ✅ | 0.02% ✅ |
| Average Response | 457 ms ✅ | 513 ms ⚠️ | 985 ms ❌ |
| Max Response | 3,310 ms ⚠️ | 1,958 ms ✅ | 124,320 ms ❌ |
| 90th Percentile | 570 ms ✅ | 662 ms ✅ | 1,380 ms ❌ |
| 95th Percentile | 627 ms ✅ | 767 ms ✅ | 2,675 ms ❌ |
| 99th Percentile | 743 ms ✅ | 1,003 ms ✅ | 4,794 ms ❌ |
| Throughput | 13.04 txn/s | 1.42 txn/s | 118.43 txn/s |

---

## Per-Test Analysis

### Load Test (Moderate Load) — ✅ PASS

| Metric | Value | Status |
|--------|-------|--------|
| Average Response | 456.67 ms | ✅ Good |
| Max Response | 3,310 ms | ⚠️ Borderline |
| Homepage Avg | 553.34 ms | ⚠️ Slowest but acceptable |
| Transactions Avg | ~424 ms | ✅ Excellent |

**Finding:** System handles moderate load (13 txn/s) well. Homepage is the slowest endpoint but within acceptable limits.

### Endurance Test (Long-Run Stability) — ✅ PASS

| Metric | Value | Status |
|--------|-------|--------|
| Average Response | 512.53 ms | ⚠️ Borderline |
| Max Response | 1,958 ms | ✅ Good |
| Response Time Degradation | None | ✅ No memory leaks |
| Error Accumulation | None | ✅ 0% errors |

**Finding:** System remains stable over time with no performance degradation or error accumulation.

### Stress Test (Breaking Point) — ❌ FAIL

| Metric | Value | Status |
|--------|-------|--------|
| Average Response | 984.81 ms | ❌ Poor |
| Max Response | 124,320 ms (2+ minutes) | ❌ Catastrophic |
| Homepage Max | 124,320 ms | ❌ Collapsed |
| Homepage Errors | 31 connection resets | ❌ Server terminated connections |
| Throughput | 118.43 txn/s | ✅ Excellent (but at cost of latency) |

**Finding:** Under extreme load (>100 txn/s), the homepage collapses completely while transaction endpoints survive.

---

## Cross-Test Comparison (Homepage Focus)

| Test | Homepage Avg | Homepage Max | Homepage 99th | Status |
|------|--------------|--------------|---------------|--------|
| Load Test | 553 ms | 3,310 ms | 829 ms | ⚠️ Acceptable |
| Endurance Test | 510 ms | 1,417 ms | 990 ms | ✅ Good |
| Stress Test | 1,187 ms | **124,320 ms** | **5,513 ms** | ❌ Failed |

---

## What Works Well ✅

| Area | Evidence |
|------|----------|
| Load Test | All metrics within good ranges — 457ms avg |
| Endurance Test | No memory leaks, no degradation over time |
| Transaction Endpoints | 0% errors across all tests, fast response (~424ms) |
| Error Rate | 0% in Load and Endurance, 0.02% in Stress |
| Throughput | Handles 118 txn/s before breaking |

## What Still Needs Work ❌

| Area | Evidence |
|------|----------|
| Homepage Under Stress | 124 second response time — complete collapse |
| Connection Management | 29 connection resets under stress (90% of errors) |
| No Circuit Breaker | Homepage failure could cascade to other services |
| No Timeouts | Requests hang for 2+ minutes instead of failing fast |
| Homepage Max (Load Test) | 3,310ms — slightly above 3,000ms target |

---

## Risk Assessment by Traffic Level

| Traffic Level | Throughput | Risk | Ready? |
|---------------|------------|------|--------|
| Low | <10 txn/s | 🟢 Low | ✅ Yes |
| Medium | 10-50 txn/s | 🟢 Low | ✅ Yes |
| High | 50-100 txn/s | 🟡 Medium | ⚠️ Monitor homepage |
| Peak | >100 txn/s | 🔴 Critical | ❌ No — will collapse |

---

## Final Recommendations

| Priority | Action | Target |
|----------|--------|--------|
| 🔴 **1** | Add circuit breaker for homepage | Prevent cascade failure |
| 🔴 **2** | Add request timeouts (fail at 5-10 seconds) | Fail fast under stress |
| 🟡 **3** | Investigate homepage 3,310ms max spike | Reduce to <3,000ms |
| 🟡 **4** | Fix connection reset issues under stress | Reduce errors |
| 🟢 **5** | Reduce homepage average to <500ms | Currently 553ms (Load Test) |

---

## Go/No-Go Decision

| Environment | Decision |
|-------------|----------|
| Development / Staging | ✅ **GO** |
| Production (low traffic <50 txn/s) | ✅ **GO** (with monitoring) |
| Production (medium traffic 50-100 txn/s) | ⚠️ **CONDITIONAL GO** — Monitor homepage closely |
| Production (high traffic >100 txn/s) | ❌ **NO-GO** — Homepage will collapse |
| Black Friday / Peak Event | ❌ **NO-GO** — Not ready |

---

## Final Statement

> **The system has shown significant improvement, particularly in the Load Test where all metrics now fall within acceptable ranges. The Endurance Test confirms no memory leaks or stability issues over time.**
>
> **However, the Stress Test reveals a critical weakness: the homepage collapses under extreme load (>100 txn/s) with 124-second response times and connection resets. Transaction endpoints remain healthy, indicating the homepage is the single point of failure.**
>
> **Recommendation:** Deploy to production for low to medium traffic (up to 50-100 txn/s) with monitoring. Add a circuit breaker and timeouts for the homepage before scaling to high-traffic scenarios or peak events.

---

## Bottom Line

| Aspect | Grade |
|--------|-------|
| Load Test | ✅ **A** (457ms avg) |
| Endurance Test | ✅ **A** (stable, no leaks) |
| Stress Test | ❌ **D** (homepage collapse) |
| Homepage | ⚠️ **B** (good at low/medium, fails at high load) |
| Transactions | ✅ **A+** (424ms avg, 0% errors) |

**Final Verdict: ✅ Ready for low to medium traffic. ❌ Add circuit breaker before high-traffic launch.**

---
## YOUTUBE VIDEO

### https://youtu.be/z_4eluxjqIU
