const electron = require('electron');
const path = require('path');
const url = require('url');
const {app, BrowserWindow} = electron;

let mainWindow;

function createWindow(){
    mainWindow = new BrowserWindow({
        width: 1500,
        height: 1000,
        webPreferences: {nodeIntegration: false}
    });
    mainWindow.loadURL('https://www.messenger.com/login');
    //mainWindow.webContents.openDevTools();
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