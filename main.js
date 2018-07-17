const electron = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const {app, BrowserWindow, ipcMain, remote} = electron;

let mainWindow;

function createWindow(){
    mainWindow = new BrowserWindow({
        width: 1500,
        height: 1000,
        //show: false,
        webPreferences: {
            nodeIntegration: false,
            preload: path.join(__dirname, 'friends-list.js')
        }
    });
    mainWindow.loadURL('https://www.messenger.com/login');
    //mainWindow.loadFile(__dirname + '/browser.html');

    //console.log(document.bgColor)
    mainWindow.webContents.openDevTools();
    //did-finish-load
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.send('delete');
    })
    mainWindow.on('close', ()=>{
        app.quit()
    })
}

app.on('ready', createWindow);

app.on('closed', function(){
    mainWindow = null;
})


app.on('window-all-closed', function(){
    if(process.platform !== "darwin"){
        app.quit();
    }
})

app.on('activate', function(){
    if(mainWindow == null){
        createWindow();
    }
})


ipcMain.on('show', ()=>{
    mainWindow.show();
})

ipcMain.on('create-chat-head', function(event, picURL){
    chatHead = new BrowserWindow(
        {
            width: 1000,
            height: 1000,
            webPreferences: {
                nodeIntegration: false,
                preload: path.join(__dirname, 'chat-head.js')
            }
        })
        chatHead.loadURL(picURL)
    chatHead.on('closed', () => {
        chatHead = null;
    })
    chatHead.webContents.on('dom-ready', () => {
        chatHead.webContents.insertCSS(fs.readFileSync(path.join(__dirname, 'chat-head.css'), 'utf8'));
        chatHead.webContents.send('chatHeadLoaded')
    })
    chatHead.webContents.openDevTools();
})

ipcMain.on('test', ()=>{
})