'use strict';
const electron = require('electron');
const {ipcRenderer: ipc, screen} = electron;
const {BrowserWindow, Menu, MenuItem} = require('electron').remote;
const path = require('path');
const fs = require('fs')
let chatHead = null;
let unreadDot = null;
let msgPreview = null;

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
    if(chatHead!= null){
        chatHead.close()
    }
    if(unreadDot!=null){
        unreadDot.close()
    }
    chatHead = new BrowserWindow(
        {
            //width: 56,
            //height: 56,
            //maxHeight:55,
            //maxWidth:55,
            width:50,
            height:50,
            frame: false,
            transparent: true,
            show: false,
            alwaysOnTop: true,
            focusable: false,
            minimizable: false,
            maximizable: false,
            show: false,
            x: electron.screen.getPrimaryDisplay().bounds.width - 150,
            y: 100,
            webPreferences: {
                nodeIntegration: false,
                preload: path.join(__dirname, 'chat-head.js')
            }
        })
    unreadDot = new BrowserWindow({
        width: 40,
        height: 40,
        frame:false,
        parent: chatHead,
        alwaysOnTop: true,
        resizable: false,
        transparent: true,
        setIgnoreMouseEvents: true,
        x: chatHead.getBounds().x-7,
        y: chatHead.getBounds().y-7,
        show:false
    })
    msgPreview = new BrowserWindow({
        width: 220,
        height: 90,
        frame:false,
        parent: chatHead,
        alwaysOnTop: true,
        resizable: false,
        transparent: true,
        setIgnoreMouseEvents: true,
        x: chatHead.getBounds().x-205,
        y: chatHead.getBounds().y-5,
        show:true
    })
    chatHead.on('closed', () => {
        chatHead = null;
    })
    unreadDot.on('closed',()=>{
        unreadDot = null;
    })
    msgPreview.on('closed',()=>{
        msgPreview = null;
    })
    var friendPP = clickableEl.getElementsByTagName("img")[0];
    chatHead.loadURL(friendPP.src);
    unreadDot.loadFile('unreadDot.html');
    msgPreview.loadFile('msgPreview.html');
   
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
        chatHead.setSize(55,55)
        chatHead.setResizable(false)
        chatHead.show(true);
        ipc.send('hideMain');
        chatHead.webContents.send('chatHeadLoaded')
    })

    ipc.on('moveDot', ()=>{
        unreadDot.setBounds({
            x: chatHead.getBounds().x-7,
            y: chatHead.getBounds().y-7,
            width: 40,
            height: 40
        })
        msgPreview.setBounds({
            x: chatHead.getBounds().x-205,
            y: chatHead.getBounds().y-5,
            width: 220,
            height: 90
        })
    })

    ipc.on('showUnreadDot', (e, title)=>{
        if(title === 'Messenger'){
            unreadDot.hide();
            //msgPreview.hide();
        }
        else{
            unreadDot.show()
            //msgPreview.show()
        }
    })
}
