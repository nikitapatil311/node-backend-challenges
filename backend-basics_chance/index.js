import { server } from "./server.js";

const port = 8000;
server.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});

// const server = http.createServer((request, result) => {
//   const personData = personRandomData();
//   result.statusCode = 200;
//   result.end(personData);
// });
