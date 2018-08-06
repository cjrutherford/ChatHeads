const electron = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const {app, BrowserWindow, ipcMain, Tray} = electron;
const iconPath = __dirname + '/assets/icons/win/messenger.png';
let mainWindow;
var tray = null;

function createWindow(){
    mainWindow = new BrowserWindow({
        width: 1500,
        height: 1000,
        title: 'Chat-Head',
        icon: iconPath,
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
    mainWindow.on('page-title-updated', (e)=>{
        e.preventDefault();
    })
    tray = new Tray(iconPath);
    tray.on('click', ()=>{
        mainWindow.show();
        let myWindows = BrowserWindow.getAllWindows();
        if(myWindows[1]!= null){
            myWindows[1].webContents.send('openClose');
        }
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


ipcMain.on('hideMain', ()=>{
    mainWindow.hide()
})

app.disableHardwareAcceleration();