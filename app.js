//Node doesn't support import by default. Need Babel for that. 
const http = require('http');

//req, res is commonly used shortand for request and response.
const server = http.createServer((req, res) => {
    //anonymous function that consoel.logs the request.
    console.log(req);
});

//the server listens on port 3000
server.listen(3000)
