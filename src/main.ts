import { app, BrowserWindow } from 'electron';
import * as path from 'node:path';

function createWindow(): void {
  const win = new BrowserWindow({
    width: 800,
    height: 480,
    useContentSize: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.menuBarVisible = false;
  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS, it's common to recreate a window if no windows are open
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // On macOS, the app stays open until explicitly quit
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
