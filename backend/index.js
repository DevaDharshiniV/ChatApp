let express = require('express');
let app = express();

let http = require('http');
let server=http.Server(app);

let socketIO=require('socket.io');
let io = socketIO(server);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

server.listen(port, ()=> {
    console.log(`started on port: ${port}`);
});

io.on('connection',(socket) => {
    socket.on('join',(data) => {
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('user joined');
    });

    // socket.on('message',(data) => {
    //     io.on(data.room).emit('new message',{user: data.user, message: data.message});
    // });
    socket.on('message',(data) => {
        io.to(data.room).emit('new message',{user: data.user, message: data.message});
    });
    
})
