const http = require('http');
const fs = require('fs');
const path = require('path');

const staticDir = path.resolve(__dirname, '../koa');
console.log('staticDir', staticDir);

const server = http.createServer((req, res) => {
  const url = req.url;
  console.log('url', url);
  if (url === '/') {
    const dirs = fs.readdirSync(staticDir);
    let html = '<ul>';
    dirs.forEach(dirName => {
      html += `<li><a href="/${dirName}">${dirName}</a></li>`
    })
    html += '</ul>';
    res.setHeader('content-type', 'text/html');
    res.end(html);
    console.log('dirs', dirs);
  } else if (url.endsWith('.json')) {
    const content = fs.readFileSync(path.join(staticDir, url), 'utf-8');
    res.end(content);
  }

  console.log(url);
  res.end('1123');
})

server.listen(3000, () => {
  console.log('server listen in 3000~')
});