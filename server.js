var http=require("http");
http.createServer((req,res)=>{
  if(req.url=="/"){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('');
    res.end();
  }else if(req.url=="/favicon.ico"){res.end();}else{
    if(req.url.startsWith("/about:")){
      res.writeHead(200,{'Content-Type':'text/html','Access-Control-Allow-Origin':'*','Access-Control-Request-Method':'*','Access-Control-Allow-Methods':'OPTIONS, GET','Access-Control-Allow-Headers':'*'});
      res.write('<!DOCTYPE html><html><head></head><body></body></html>');
      return res.end();
    }
    if(req.url=="/https://kiwichat.ml/assets/images/kiwichat.png"){
      //resp.
    }
    (req.url.substr(1,5).endsWith("s")?require("https"):http).get(req.url.slice(1),(resp)=>{
      var headers={};
      Object.keys(resp.headers).forEach(e=>{
        var newKey='';
        e.split('-').forEach(i=>newKey+=(i==e.slice(0,e.includes('-')?e.indexOf('-'):undefined)?'':'-')+i[0].toUpperCase()+i.slice(1).toLowerCase());
        headers[newKey]=resp.headers[e];
      });
      headers['Access-Control-Allow-Origin']='*';
      headers['Access-Control-Request-Method']='*';
      headers['Access-Control-Allow-Methods']='OPTIONS, GET';
      headers['Access-Control-Allow-Headers']='*';
      if(headers['Location'])headers['Location']='https://cors-proxy-clone.glitch.me/'+headers['Location'];console.log(req.url); console.log(req.headers['x-forwarded-for']);
      if(headers['Refresh']&&headers['Refresh'].toLowerCase().includes('url'))headers['Refresh']=headers['Refresh'].substr(0,headers['Refresh'].substr(headers['Refresh'].toLowerCase().indexOf('url')).indexOf('=')+3)+'https://cors-proxy-clone.glitch.me/'+headers['Refresh'].substr(headers['Refresh'].substr(headers['Refresh'].toLowerCase().indexOf('url')).indexOf('=')+3);
      res.writeHead(resp.statusCode,headers);
      resp.on("end",()=>res.end());
      resp.pipe(res);
    }).on('error',e=>console.log(e)).end(()=>res.end());
  }
}).listen(8080);
