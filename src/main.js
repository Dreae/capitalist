const { app, BrowserWindow } = require('electron');

app.on('ready', () => {
    let win = new BrowserWindow({ width: 800, height: 600, frame: false });
    win.loadFile('build/index.html');

    win.on('closed', () => {
        win = null;
    });
});

app.on('window-all-closed', () => {
    app.quit();
});