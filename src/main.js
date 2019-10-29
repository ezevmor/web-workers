let dedicatedWorker;
let sharedWorker;

const startDedicatedBtn = document.getElementById('startDedicated');
const sendToDedicatedBtn = document.getElementById('sendToDedicated');
const terminateDedicatedBtn = document.getElementById('terminateDedicated');
const dedicatedCount = document.getElementById('dedicatedCount');

const startSharedBtn = document.getElementById('startShared');
const sendTosharedBtn = document.getElementById('sendToShared');
const terminateSharedBtn = document.getElementById('terminateShared');
const sharedConnectedCount = document.getElementById('sharedConnectedCount');
const sharedUpCount = document.getElementById('sharedUpCount');

startDedicatedBtn.addEventListener('click', () => {
  if (!dedicatedWorker) {
    dedicatedCount.innerHTML = 0;
    dedicatedWorker = new Worker('./src/workers/dedicated.js');

    dedicatedWorker.addEventListener('message', (oEvent) => {
      oEvent.data.msg && alert("dedicated worker says: " + oEvent.data.msg);
      oEvent.data.count && (dedicatedCount.innerHTML = oEvent.data.count);
      console.log(oEvent.data);
    });
  }
});

sendToDedicatedBtn.addEventListener('click', () => {
  if (dedicatedWorker) {
    dedicatedWorker.postMessage('hi worker!');
  }
});

terminateDedicatedBtn.addEventListener('click', () => {
  if (dedicatedWorker) {
    dedicatedWorker.terminate();
    dedicatedWorker = null;
  }
});

startSharedBtn.addEventListener('click', () => {
  if (!sharedWorker) {
    sharedWorker = new SharedWorker('./src/workers/shared.js');

    sharedWorker.port.addEventListener('message', (oEvent) => {
      oEvent.data.msg && alert("shared worker says: " + oEvent.data.msg);
      oEvent.data.count && (sharedConnectedCount.innerHTML = oEvent.data.count);
      oEvent.data.sharedUp && (sharedUpCount.innerHTML = oEvent.data.sharedUp);
      console.log(oEvent.data);
    }, false);

    sharedWorker.port.start();
  }
});

sendTosharedBtn.addEventListener('click', () => {
  if (sharedWorker) {
    sharedWorker.port.postMessage("hi shared worker!");
  }
});

terminateSharedBtn.addEventListener('click', () => {
  if (sharedWorker) {
    sharedWorker.port.close();
    sharedWorker = null;
  }
});
