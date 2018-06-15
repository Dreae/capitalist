const { app, BrowserWindow } = require('electron');

app.on('ready', () => {
    let win = new BrowserWindow();
    win.loadFile('build/index.html');

    win.on('closed', () => {
        win = null;
    });
});

app.on('window-all-closed', () => {
    app.quit();
});