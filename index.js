const http = require('http');
const pid = process.pid;

http
  .createServer((req, res) => {
    res.end(`Hello from Node.js!\n`);
  })
  .listen(8800, () => {
    console.log(`Server started on port: 8800, pid: ${pid}`);
  });