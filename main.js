const electron = require('electron');
const path = require('path');
const url = require('url');
const {app, BrowserWindow, ipcMain} = electron;

let mainWindow;

function createWindow(){
    mainWindow = new BrowserWindow({
        width: 1500,
        height: 1000,
        //show: false,
        webPreferences: {
            nodeIntegration: false,
            preload: path.join(__dirname, 'friends.js')
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