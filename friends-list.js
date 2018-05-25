'use strict';
const electron = require('electron');
const {ipcRenderer: ipc} = electron;
require('electron-context-menu')({
	prepend: (params, browserWindow) => [{
        label: 'Create Chat Head',
        click(){ 
            console.log('chat head created')
        }
	}]
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

ipc.on('delete', () => {
    window.$ = window.jQuery = require('jquery');
    showList()
})
document.addEventListener('DOMContentLoaded', ()=>{

})


