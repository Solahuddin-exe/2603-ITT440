import http from 'k6/http';

export const options = {
  stages: [
    { duration: '10s', target: 20 },
    { duration: '10s', target: 300 },
    { duration: '20s', target: 300 },
    { duration: '10s', target: 20 },
  ],
};

export default function () {
  http.get('https://api.spacexdata.com/v4/launches/latest');
}
