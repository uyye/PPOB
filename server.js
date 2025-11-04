const server = require("./app");
const port = 3000

server.listen(port, ()=>{
    console.log('Listen on port ' + port);
})