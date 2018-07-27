'use strict';
const electron = require('electron');
const {ipcRenderer: ipc, screen} = electron;
const {BrowserWindow} = require('electron').remote;
const path = require('path');
const fs = require('fs')
let chatHead;

require('electron-context-menu')({
	prepend: (params, browserWindow) => [{
        label: 'Create Chat Head',
        click(){ 
            createChatHead();
            /*
            var selected = document.querySelector('.tooltipText').firstChild;
            var clickableEl = document.querySelector('[data-tooltip-content="' + selected.textContent + '"]').parentElement;
            clickableEl.click();
            var friendPP = clickableEl.getElementsByTagName("img")[0];
            ipc.send('create-chat-head', friendPP.src);
            */
        }
    }],
    window: BrowserWindow.getFocusedWindow()
});

function showList(){
    //$('._1t2u').remove();
    //document.getElementById('u_0_0').innerHTML = $('._1enh').html();

    //document.body.innerHTML = $('._1enh').html();
    ipc.send('show');
    //$('._1enh').unwrap().unwrap().unwrap();
    //$('#test').load("document $('._lenh')");

    //$('._1enh').appendTo('._li');
    //let list = document.getElementsByClassName('_1enh');
    //console.log(list[0]);
    //document.body.innerHTML= list[0].innerHTML;

    /*
    https://static.xx.fbcdn.net/rsrc.php/v3/yf/l/0,cross/e_BouxDVjuM.css
    9UhnrtxaBFm
     */
}

function createChatHead(){
    var selected = document.querySelector('.tooltipText').firstChild;
    var clickableEl = document.querySelector('[data-tooltip-content="' + selected.textContent + '"]').parentElement;
    clickableEl.click();
    chatHead = new BrowserWindow(
        {
            //width: 56,
            //height: 56,
            maxHeight:55,
            maxWidth:55,
            frame: false,
            //transparent: true,
            show: false,
            alwaysOnTop: true,
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
    
    chatHead.webContents.on('dom-ready', () => { 
        chatHead.webContents.insertCSS(fs.readFileSync(path.join(__dirname, 'chat-head.css'), 'utf8'));
        chatHead.setSize(55,55)
        chatHead.show(true);
        ipc.send('hideMain');
        chatHead.webContents.send('chatHeadLoaded')
    })

}
