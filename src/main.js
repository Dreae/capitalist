const { app, BrowserWindow } = require('electron');

app.on('ready', () => {
    let win = new BrowserWindow({ width: 1100, height: 600, frame: false, minHeight: 600, minWidth: 1100 });
    win.loadFile('build/index.html');

    win.on('closed', () => {
        win = null;
    });
});

app.on('window-all-closed', () => {
    app.quit();
});