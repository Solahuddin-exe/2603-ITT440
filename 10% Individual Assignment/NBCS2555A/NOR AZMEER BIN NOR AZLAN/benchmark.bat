@echo off
echo Starting API Benchmarking...

echo Running Load Test (20 Connections)...
autocannon -c 20 -d 30 https://api.escuelajs.co/api/v1/products

echo Running Stress Test (100 Connections)...
autocannon -c 100 -d 30 https://api.escuelajs.co/api/v1/products

echo Running Flood/Spike Test (500 Connections)...
autocannon -c 500 -p 10 -d 20 https://api.escuelajs.co/api/v1/products

echo Tests Completed.
pause
