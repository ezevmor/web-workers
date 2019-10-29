let sharedUpTime = 0;

onconnect = (e) => {
  let counter = 0;
  let port = e.ports[0];

  port.onmessage = function(e) {
    port.postMessage({msg: 'hi main! you send me: ' + e.data});
  };

  function sendCount() {
    setTimeout(() => {
      counter++;
      port.postMessage({count: counter, sharedUp: sharedUpTime});
      sendCount();
    }, 1000);
  }

  sendCount();
}

function plusSharedUpTime() {
  setTimeout(() => {
    sharedUpTime++;
    plusSharedUpTime();
  }, 1000);
}

plusSharedUpTime();
