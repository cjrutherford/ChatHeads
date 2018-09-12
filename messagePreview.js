const electron = require('electron');
const {ipcRenderer: ipc} = electron;

document.addEventListener('DOMContentLoaded', ()=>{
    ipc.send('previewID',require('electron').remote.getCurrentWindow().id);
})
ipc.on('changeMsg',(e, msg)=>{
    document.getElementById('msg').innerText = msg;
})