$(function(){
   	//make connection
	var socket = io.connect('http://localhost:3000')

  //buttons and inputs
	var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")

  //Emit message
	send_message.click(function(){
    console.log("send_message.click(function() ...")
    console.log("message.val() = ", message.val())
		socket.emit('new_message', {message : message.val()})
	})

	//Listen on new_message
	socket.on("new_message", (data) => {
		feedback.html('');
		message.val('');
		chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
	})

  //Emit a username
	send_username.click(function(){
    //nb: this console.log appears in browswer console.
    console.log("send_username.click(function()...")
    console.log("username.val() = ", username.val())
		socket.emit('change_username', {username : username.val()})
	})


});
