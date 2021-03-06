const express = require('express')
const app = express()


//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))


//routes
app.get('/', (req, res) => {
  //res.send("Hello World")
	res.render('index')
})

//Listen on port 3000
server = app.listen(3000)

//socket.io instantiation
const io = require("socket.io")(server)

//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected')

  //default username
	socket.username = "Anonymous"

  //listen on change_username
  socket.on('change_username', (data) => {
      //nb: this console.log appears in server command line bash shell or log files.
      console.log("change_username event, data.username = ", data.username);
      socket.username = data.username;
  })

  //listen on new_message
  socket.on('new_message', (data) => {
    //broadcast the new message
    console.log("new_message event : data.message = ", data.message)
    console.log("socket.username = ", socket.username)
    io.sockets.emit('new_message', {message : data.message, username : socket.username});
  })


})
