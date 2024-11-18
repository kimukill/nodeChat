const socket = io();

const mainElement = document.querySelector("main");
const h1Element = document.querySelector("h1");
h1Element.innerHTML = "work";

function isEmo(messageValue) {
    let outMsg = messageValue;
    if(messageValue.includes(":)")) {
        outMsg = messageValue.replace(":)","🙂");
    }
    return outMsg;
}

function appendMessage(text, isMine = false) {
    const msgul = mainElement.querySelector("ul#messages");
    const li = document.createElement("li");
    if (isMine) {
        li.classList.add("my-message");
    }
    li.textContent = isEmo(text);
    msgul.appendChild(li);
    msgul.scrollTop = msgul.scrollHeight;
}

socket.on("connect", () => {
    h1Element.innerHTML = "Server connected";
});

socket.on("hello", (msg) => {
    appendMessage(msg, false);
});

function sendMessage(event) {
    event.preventDefault();
    const input = document.querySelector("#messageInput");
    const message = input.value;
    appendMessage(message, true);
    socket.emit("new_message", message);
    input.value = "";
}

socket.on("new_message", (msg) => {
    appendMessage(msg, false);
});