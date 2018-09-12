const electron = require('electron');
const {ipcRenderer: ipc} = electron;
const {BrowserWindow} = require('electron').remote;
let chatHead;
let isChatDisplayed = false;
const webFrame  = require('electron').webFrame;
webFrame.setVisualZoomLevelLimits(1,1);
webFrame.setLayoutZoomLevelLimits(0, 0);
ipc.on('chatHeadLoaded', () => {
    //manual dragging
    chatHead = document.querySelector('img');
    //chatHead = document.body;
    document.body.setAttribute('style', '-webkit-app-region: drag;'); //This was the only workaround that 
    document.body.setAttribute('style', '-webkit-app-region: no-drag;'); //I found to make window transparent
    var wX = 0;
    var wY = 0;
    var dragging = false;
    var posChanged = false;
    var ctxMenuOpen = false;
    chatHead.addEventListener('contextmenu', ()=>{
        ctxMenuOpen = true;
    })
    chatHead.addEventListener('mousedown', function(e){
        if(ctxMenuOpen){
            dragging = false;
        }
        else if(e.button == 0){
            dragging = true;
        }
        wX = e.clientX;
        wY = e.clientY;
    })
    window.addEventListener('mousemove', function(e){
        if(dragging && (e.screenX-wX != e.screenX || e.screenY-wY != e.screenY)){
            posChanged = true;
            //this.moveTo(e.screenX-wX, e.screenY-wY);
            require('electron').remote.getCurrentWindow().setBounds({
                x: e.screenX-wX,
                y:  e.screenY-wY,
                width: 55,
                height: 55
            })
            ipc.send('chatheadMoved')
        }
    })
    window.addEventListener('mouseup', function(e){
        dragging = false;
        if(ctxMenuOpen){
            ctxMenuOpen = false;
        }
        else if(!posChanged && e.button == 0){
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

ipc.on('openClose', ()=>{
    isChatDisplayed = true;
    dragging = false;
})
