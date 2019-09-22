const http = require('http');
const pid = process.pid;

const server = http
  .createServer((req, res) => {
    for (let i = 0; i < 1e7; i++) {}
    
    if (req.url === '/error') {
      throw new Error('Oh no!')
    } else {
      res.writeHead(200);
      res.end(`Hello from Node.js!\n`);
    }
    
  })
  .listen(8800, err => {
    console.log(`Worker started on port: 8800, pid: ${pid}`);
    
    if (err) {
      console.log(`Server error ${err}`);
    }
  });

process.on('SIGINT', () => {
  console.log('Signal is SIGINT');
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('Signal is SIGTERM');
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGUSR2', () => {
  console.log('Signal is SIGUSR2');
  server.close(() => {
    process.exit(1);
  });
});