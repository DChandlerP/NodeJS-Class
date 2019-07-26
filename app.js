/*
Until I recently took a job that involves some work maintaining and rewirint legacy apps,
I'd only ever worked with Node and ES6+ syntax. I'm following a Node course to gain a deeper understanding
of what Node can do and, of course, how it does what it does. Most of this code isn't mine!
*/

//Node doesn't support import by default. Need Babel for that. 
const http = require('http');
const fs = require('fs');

//req, res is commonly used shortand for request and response.
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title><head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();
  }
  //The POST is created above as is the URL with the form action. 
  if (url === '/message' && method === 'POST') {
      const body = [];
    // Data Event listener
    res.on('data', (chunk) => {
        console.log(chunk)
        body.push(chunk);
    });
    req.on('end', () => {
        const parsebody = Buffer.concat(body).toString();
        console.log(parsebody)
    })
    fs.writeFileSync('message.txt', 'DUMMY');
    //Redirection status code
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);
