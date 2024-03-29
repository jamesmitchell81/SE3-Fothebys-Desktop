var app = require('app');
var BrowserWindow = require('browser-window');
var fs = require('fs');
var path = require('path');
var ipc = require("electron").ipcMain;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

ipc.on('change-page', function(event, args) {
  if ( !mainWindow ) return;
  var page = path.join("/src", "html", args);
  mainWindow.loadURL('file://' + __dirname + page);

});

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  var display = require('screen');
  var size = display.getPrimaryDisplay().workAreaSize;
  var page;

  mainWindow = new BrowserWindow({
    title: "Fothebys Auction House",
    show: false,
    width: (size.width - 100),
    height: (size.height - 40), //0.99),
    minWidth: 800,
    minHeight: 600,
    titleBarStyle: 'hidden-inset'
  });

  mainWindow.loadURL('file://' + __dirname + '/app/html/index.html');
  // mainWindow.openDevTools();

  var page = mainWindow.webContents;

  page.on('dom-ready', function() {
    page.insertCSS(fs.readFileSync(path.join(__dirname, 'app', 'css', 'main.css'), 'utf-8'));
    mainWindow.show();
    mainWindow.setPosition(20, 40);
  });

  mainWindow.on('closed', function() {
    // Clean up
    mainWindow = null;
  });
});