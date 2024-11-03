const http = require('http');
const { taskRoutes } = require('./routes/taskroutes');
const HOSTNAME = 'localhost';
const  PORT = 5000;

const server = http.createServer((req , res) =>{
    
    if (req.url.startsWith('/tasks')){
        taskRoutes(req , res);
    }
    else{
        res.writeHead(404 , 'not found' , {'contente-typ':'aplication/json'});
        res.end(JSON.stringify({
            message: "page not found "
        }));
    }
})
server.listen(PORT , HOSTNAME , ()=>{
    console.log(`server is running on ${HOSTNAME}:${PORT}`);
})
