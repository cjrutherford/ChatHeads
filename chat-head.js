const electron = require('electron');
const {ipcRenderer: ipc} = electron;
let chatHead;
let isChatDisplayed = false;

ipc.on('chatHeadLoaded', () => {
    chatHead = document.querySelector("img");
    //chatHead.setAttribute('sytle', '-webkit-app-region: drag')
    console.log(window.length)
    //manual dragging
    var wX = 0;
    var wY = 0;
    var dragging = false;
    var posChanged = false;
    chatHead.addEventListener('mousedown', function(e){
        dragging = true;
        wX = e.pageX;
        wY = e.pageY;
    })
    window.addEventListener('mousemove', function(e){
        if(dragging){
            if(e.screenX-wX != e.screenX || e.screenX-wX != e.screenX){
                posChanged = true;
            }
            this.moveTo(e.screenX-wX, e.screenY-wY);
            console.log(this.window.length)
        }
    })
    window.addEventListener('mouseup', function(e){
        dragging = false;
        if(!posChanged && e.button == 0){
            if(isChatDisplayed){
                ipc.send('hideMain');
                isChatDisplayed = false;
            }
            else{
                ipc.send('show');
                isChatDisplayed = true;
            }
        }
        posChanged = false;
    })
})
