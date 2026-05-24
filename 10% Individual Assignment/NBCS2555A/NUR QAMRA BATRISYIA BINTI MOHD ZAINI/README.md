<img width="270" height="148" alt="TAURUS" src="https://github.com/user-attachments/assets/74e990d3-add5-4379-a622-88fb21004348" />

# NAME  : NUR QAMRA BATRISYIA BINTI MOHD ZAINI
# ID    : 2024116729
# GROUP : NBCS2555A

---

# 🚀 Performance Analysis of REST API Using Taurus Framework

---

# Introduction

Performance testing is used to check how well a system performs under different workloads. In this project, Taurus Framework is used to test the performance of a REST API.

The API selected for this testing is JSONPlaceholder REST API:

https://jsonplaceholder.typicode.com/posts

This project focuses on testing API response time, stability, and request handling under different testing conditions.

---

# Tool Used

The tool used in this project is Taurus Framework (bzt).

Taurus is an open-source testing tool that works together with Apache JMeter. It allows performance testing to be configured using simple YAML files.

Reason for choosing Taurus:
- Easy to configure
- Suitable for API testing
- Supports performance testing
- Generates testing statistics automatically

---

# Objectives

The objectives of this project are:

- To test REST API performance under different workloads
- To measure response time and request success rate
- To observe API stability during long duration testing
- To compare Load Test, Stress Test, and Soak Test results

---

# Test Environment

| Category | Details |
|---|---|
| Operating System | Ubuntu 24.04 |
| Tool | Taurus Framework |
| Backend Engine | Apache JMeter 5.5 |
| API | JSONPlaceholder REST API |
| Language | YAML |

---

# Project Structure

```text
Performance-Analysis-RESTAPI-Taurus
│
├── load_test.yml
├── stress_test.yml
├── soak_test.yml
├── README.md
└── screenshots
```

---

# YAML Configuration Files

- [Load Test Configuration](load_test.yml)
- [Stress Test Configuration](stress_test.yml)
- [Soak Test Configuration](soak_test.yml)

---

# Testing Process

## Load Test Execution

<img width="947" height="690" alt="LOAD TEST_TAURUS" src="https://github.com/user-attachments/assets/5e971a5c-e847-40cc-925f-e2d750c60f84" />

---

## Stress Test Execution

<img width="1150" height="698" alt="STRESS TEST" src="https://github.com/user-attachments/assets/1c3b56e9-34d4-4d25-97b9-56bd02556a3d" />

---

## Soak Test Execution

<img width="1280" height="697" alt="SOAK TEST" src="https://github.com/user-attachments/assets/8420ca5a-7eb9-4959-864b-bd1c33595c0b" />

---

# Load Test

## Purpose
Load Test is used to evaluate API performance under normal traffic conditions.

## Configuration

| Parameter | Value |
|---|---|
| Concurrent Users | 20 |
| Ramp-Up Time | 1 minute |
| Hold Duration | 2 minutes |

---

# Stress Test

## Purpose
Stress Test is used to observe API performance under heavy traffic conditions.

## Configuration

| Parameter | Value |
|---|---|
| Concurrent Users | 100 |
| Ramp-Up Time | 2 minutes |
| Hold Duration | 3 minutes |

---

# Soak Test

## Purpose
Soak Test is used to check API stability during long duration execution.

## Configuration

| Parameter | Value |
|---|---|
| Concurrent Users | 50 |
| Ramp-Up Time | 2 minutes |
| Hold Duration | 15 minutes |

---

# Test Results

## Load Test Result

| Metric | Result |
|---|---|
| Samples Count | 132,377 |
| Failure Rate | 0.00% |
| Average Response Time | 0.023 s |

<img width="514" height="274" alt="LOAD TEST_RESULT" src="https://github.com/user-attachments/assets/e058f9a4-0415-4117-98f5-ac1d61fbd967" />

---

## Stress Test Result

| Metric | Result |
|---|---|
| Samples Count | 571,388 |
| Failure Rate | 0.00% |
| Average Response Time | 0.041 s |

<img width="559" height="276" alt="STRESS TEST_RESULT" src="https://github.com/user-attachments/assets/0391b9b7-2657-4569-bb20-06b73768d347" />

---

## Soak Test Result

| Metric | Result |
|---|---|
| Samples Count | 910,603 |
| Failure Rate | 0.00% |
| Average Response Time | 0.052 s |

<img width="515" height="280" alt="SOAK TEST_RESULT" src="https://github.com/user-attachments/assets/581fa259-7dde-4380-81a6-40a97fa63db1" />

---

# Performance Comparison

| Test Type | Samples Count | Failure Rate | Avg Response Time |
|---|---|---|---|
| Load Test | 132,377 | 0.00% | 0.023 s |
| Stress Test | 571,388 | 0.00% | 0.041 s |
| Soak Test | 910,603 | 0.00% | 0.052 s |

---

# Analysis

From the testing results, the API was able to handle all requests successfully without failures.

The response time increased when the workload and testing duration increased. However, the API still maintained stable performance during all tests.

The Soak Test processed more than 900,000 requests successfully, showing that the API is stable during long duration execution.

---

# Findings

Several findings were observed during the testing process:

- The API successfully handled all requests without failures.
- Response time increased when concurrency and testing duration increased.
- The API remained stable during long duration execution.
- Taurus Framework was able to generate detailed performance statistics during testing.

---

# Recommendations

Some improvements that can help optimize API performance are:

1. Use caching to reduce repeated requests.
2. Monitor server resources during high traffic.
3. Optimize server-side processing.
4. Perform regular performance testing.
5. Use load balancing for larger systems.

---

# Conclusion

In conclusion, Taurus Framework successfully performed REST API performance testing using Load Test, Stress Test, and Soak Test methods.

The API showed stable performance with 0% failure rate during all tests. This project also shows that Taurus Framework is suitable for REST API performance analysis.

---

# References

- https://gettaurus.org/
- https://jsonplaceholder.typicode.com/
- https://jmeter.apache.org/

---

# 📼 Video Demonstration



---
