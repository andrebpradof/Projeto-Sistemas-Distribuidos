const {remote} = require('electron')

document.getElementById('btnClose').addEventListener('click', closeWindow);

function closeWindow(){
    var window = remote.getCurrentWindow()
    window.close()
}

$('#btnLogin').on('click',function(){
    const { ipcRenderer } = require('electron');
    ipcRenderer.send('createBrowserWindow', 'window_2');

    const remote = require('electron').remote;
    remote.getCurrentWindow().close();
});