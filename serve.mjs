import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('.',import.meta.url));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.json':'application/json; charset=utf-8','.md':'text/plain; charset=utf-8'};
const server=http.createServer(async(req,res)=>{
 try{
  const requestPath=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=path.resolve(root,'.'+(requestPath==='/'?'/index.html':requestPath));
  if(!file.startsWith(root)){res.writeHead(403);res.end();return;}
  const bytes=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(bytes);
 }catch{res.writeHead(404);res.end('Not found');}
});
server.listen(Number(process.env.PORT||4173),'127.0.0.1',()=>console.log('Clawd demo: http://127.0.0.1:'+server.address().port));
