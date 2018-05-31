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
        {width: 300, 
        height: 300,
        frame: false,
        show: false,
        webPreferences: {
            nodeIntegration: false,
        }
        })
    var friendPP = clickableEl.getElementsByTagName("img")[0];
    chatHead.loadURL(friendPP.src);
    //chatHead.loadURL(path.join(__dirname, 'browser.html'))
    chatHead.on('closed', () => {
        chatHead = null;
    })
    chatHead.webContents.on('dom-ready', () => {
        chatHead.webContents.insertCSS(fs.readFileSync(path.join(__dirname, 'chat-head.css'), 'utf8'));
        chatHead.show();
    })
}

ipc.on('delete', () => {
    window.$ = window.jQuery = require('jquery');
    showList()
})
document.addEventListener('DOMContentLoaded', ()=>{

})


