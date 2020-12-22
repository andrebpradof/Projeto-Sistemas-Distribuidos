const { app, BrowserWindow, ipcMain} = require('electron')
const url = require('url')
const path = require('path')
let mainWindow;

/*1*/
var toQuit = true; //very important
var category = 'window_1'; //default category
var token_user = '';


/*2*/
app.on('ready', function () {
  "use strict";
  createWindow(); //call this function to create a BrowserWindow on its lunch
});

app.on('closed', function () {
  "use strict";
  mainWindow = null;
});

app.on('window-all-closed', function () {
  "use strict";
  if (process.platform !== 'darwin') {
      app.quit();
  }
});

/*3*/
function createWindow() {
  "use strict";
  var height;
  var width;
  var address;

  switch (category) {
      case 'window_1': 
          height = 800; //Initialize size of BrowserWindow
          width = 1100; //Initialize size of BrowserWindow
          address = './index.html'; //Initialize the address or the file location of your HTML
          break;
      case 'window_2':
          height = 800; //Initialize size of BrowserWindow
          width = 1000; //Initialize size of BrowserWindow
          address = './app.html'; //Initialize the address or the file location of your HTML
          break;
      default:
          break;
  }

  mainWindow = new BrowserWindow({ 
      height: height, //height and width of BrowserWindow
      width: width, //height and width of BrowserWindow
      center: true,
      webPreferences: {
        nodeIntegration: true, 
        enableRemoteModule: true,
        devTools: false
      },
      show: false,
      icon: "icon.png"
  });

  mainWindow.menuBarVisible = false
  mainWindow.resizable = false
  mainWindow.webContents.openDevTools()

  mainWindow.loadURL(url.format({ 
      pathname: path.join(__dirname, address), //file location of html
      protocol: 'file',
      slashes: true
  }));

  mainWindow.once('ready-to-show', () => {
      mainWindow.show(); //we only want to show it when its ready to avoid the FLASH WHITE during lunch of BrowserWindow
      mainWindow.focus(); //We make sure to focus on it after showing
  });

  /**The magic start here, **/
  mainWindow.on('closed', (e) => {
      e.preventDefault(); //We have to prevent the closed event from doing it.
      if(toQuit){ //if the value of toQuit is true, then we want to quit the entire application
          mainWindow = null;
          app.exit(); //quit or exit the entire application
      }else{
          mainWindow.hide(); //just hide the BrowserWindow and don't quit the entire application
          toQuit = true;  //reset the value of toQuit to true
      }
  });
}


ipcMain.on('createBrowserWindow', function (e, cat) {
  "use strict";
  category = cat;
  toQuit = false; 
  createWindow(); 
});