exports.taskRoutes = (req, res) => {
    if(req.method === 'GET'){
        res.end('GET method is used');
    }
    if (req.method === 'POST') {
        res.end('POST method is used');
        
    }
    if (req.method === 'PATCH') {
        res.end("patch metod hasbeen used")
    }
    if (req.method === 'DELETE') {
        res.end('delete function has been used')
    }
    else{
        res.writeHead(404 , 'not found' , {'contente-typ':'aplication/json'});
        res.end(JSON.stringify({
            message: "page not found "
        }));
    }

}
