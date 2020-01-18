const socket = io.connect();

//dom elements
let message = document.getElementById("message");
let username = document.getElementById("username");
let btn = document.getElementById("send");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

btn.addEventListener("click", () => {
  socket.emit("chat:message", {
    username: username.value,
    message: message.value
  });
});

message.addEventListener("keypress", function () {
    socket.emit('chat:typing', username.value)
})

socket.on('chat:message', function (data) {
    actions.innerHTML = ''
    output.innerHTML += `
    <p>
    <strong> ${data.username} </strong> : ${data.message}
    </P>`
})

socket.on('chat:typing', function (data) {

    actions.innerHTML = `<p><em>${data} esta escribiendo </em></P>`
})