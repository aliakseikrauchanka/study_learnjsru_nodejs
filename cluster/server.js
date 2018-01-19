const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const http = require('http');

if (cluster.isMaster) {
    console.log(`Master process ${process.pid} is executed`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`Hello from child process with pid = ${process.pid} and worker ${cluster.worker.id}`);
    }).listen(8888);

}

