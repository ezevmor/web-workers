function saySomething(msg) {
  postMessage({msg: 'postmessage from external script 2, you send: ' + msg});
}