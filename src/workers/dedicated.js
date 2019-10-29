importScripts('../scripts/external.js');

let counter = 0;

onmessage = function (oEvent) {
  saySomething(oEvent.data); // imported from external-script
};

function sendCount() {
  setTimeout(() => {
    counter++;
    postMessage({count: counter});
    sendCount();
  }, 1000);
}

sendCount();