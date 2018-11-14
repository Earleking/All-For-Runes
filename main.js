const {app, BrowserWindow, Tray, Menu} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
function createWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600})

    // and load the index.html of the app.
    mainWindow.loadFile('web/html/index.html')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
    mainWindow.setMenu(null);

    // Emitted when the window is closed.
    mainWindow.on('close', function (event) {
        // Jk don't quit. Go to tray
        // event.preventDefault();
        // mainWindow.hide();
        
        mainWindow = null
    });
    createTray();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();

  }
});

function createTray() {
    let trayIcon = new Tray("./static/images/Pose 1.png")

    const trayMenuTemplate = [
    {
        label: 'All For Runes',
        enabled: false
    },
    
    {
        label: 'Open',
        click: function () {
            mainWindow.show();
        }
    },
    
    {
        label: 'Quit',
        click: function () {
            mainWindow == null;
            app.quit();
            process.exit(0);
        }
    }
    ]
    
    let trayMenu = Menu.buildFromTemplate(trayMenuTemplate)
    trayIcon.setContextMenu(trayMenu)
}