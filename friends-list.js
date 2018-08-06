'use strict';
const electron = require('electron');
const {ipcRenderer: ipc, screen} = electron;
const {BrowserWindow, Menu, MenuItem} = require('electron').remote;
const path = require('path');
const fs = require('fs')
let chatHead;

require('electron-context-menu')({
	prepend: (params, browserWindow) => [{
        label: 'Create Chat Head',
        click(){ 
            createChatHead();
        },
        visible: params.srcURL.includes('https://scontent-lga3-1.x')
    }],
    window: BrowserWindow.getFocusedWindow()
});

function createChatHead(){
    var selected = document.querySelector('.tooltipText').firstChild;
    var clickableEl = document.querySelector('[data-tooltip-content="' + selected.textContent + '"]').parentElement;
    clickableEl.click();
    chatHead = new BrowserWindow(
        {
            //width: 56,
            //height: 56,
            //maxHeight:55,
            //maxWidth:55,
            minHeight: 55,
            minWidth: 55,
            frame: false,
            transparent: true,
            show: false,
            alwaysOnTop: true,
            skipTaskbar: true,
            //focusable: false,
            minimizable: false,
            maximizable: false,
            webPreferences: {
                nodeIntegration: false,
                preload: path.join(__dirname, 'chat-head.js')
            }
        })
    var friendPP = clickableEl.getElementsByTagName("img")[0];
    chatHead.loadURL(friendPP.src);
    chatHead.on('closed', () => {
        chatHead = null;
    })
    const ctxMenu = new Menu();
    ctxMenu.append(new MenuItem({
        label: 'Close Chat Head',
        click: function(){
            chatHead.close();
        }
    }))
    chatHead.webContents.on('context-menu', function(e,params){
        ctxMenu.popup(chatHead, params.x, params.y)
    })
    chatHead.webContents.on('dom-ready', () => { 
        chatHead.webContents.insertCSS(fs.readFileSync(path.join(__dirname, 'chat-head.css'), 'utf8'));
        chatHead.setSize(72,72)
        chatHead.setResizable(false)
        chatHead.show(true);
        ipc.send('hideMain');
        chatHead.webContents.send('chatHeadLoaded')
    })
}
