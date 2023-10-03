import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import fs from 'fs';
import os from 'os';

/** Handle creating/removing shortcuts on Windows when installing/uninstalling. */
if (require('electron-squirrel-startup')) {
  app.quit();
}

/**
 * Main window instance.
 */
let mainWindow: BrowserWindow | null;
declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

/**
 * This method will be called when Electron has finished
 * initialization and is ready to create browser windows.
 * Some APIs can only be used after this event occurs.
 */
app.on('ready', () => {
  // ipc handler functions
  ipcMain.handle('openFile', () => {
    return dialog.showOpenDialog({ properties: ['openFile'] });
  });

  ipcMain.handle('readFile', (event, filePath: string) => {
    let fileData: string | NodeJS.ErrnoException = '';
    try {
      fileData = fs.readFileSync(filePath, 'utf8');
    } catch (e) {
      fileData = e as string;
    }
    return fileData;
  });

  ipcMain.handle(
    'writeFile',
    (event, filePath: string, writeData: string): boolean | string => {
      let returnValue: boolean | string = true;
      fs.writeFile(filePath, writeData, (err) => {
        if (err) {
          returnValue = err.message;
        }
      });
      return returnValue;
    },
  );

  ipcMain.handle(
    'appendFile',
    (event, filePath: string, appendData: string): boolean | string => {
      let returnValue: boolean | string = true;
      fs.appendFile(filePath, appendData, (err) => {
        if (err) {
          returnValue = err.message;
        }
      });
      return returnValue;
    },
  );

  ipcMain.handle('setupConfig', async (): Promise<boolean> => {
    const homeDir = os.homedir();
    const folder = path.join(homeDir, '.codecompanion');
    let status: boolean = true;
    try {
      await fs.mkdir(folder, (err) => {
        if (err) status = false;
      });

      const file = path.join(folder, 'config');

      await fs.writeFile(file, '', (err) => {
        if (err) status = false;
      });
    } catch {
      status = false;
    }

    return status;
  });

  ipcMain.handle('getConfigFile', () => {
    return path.join(os.homedir(), '.codecompanion', 'config');
  });

  createMainWindow();
});

/**
 * Emitted when the application is activated. Various actions can
 * trigger this event, such as launching the application for the first time,
 * attempting to re-launch the application when it's already running,
 * or clicking on the application's dock or taskbar icon.
 */
app.on('activate', () => {
  /**
   * On OS X it's common to re-create a window in the app when the
   * dock icon is clicked and there are no other windows open.
   */
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

/**
 * Emitted when all windows have been closed.
 */
app.on('window-all-closed', () => {
  /**
   * On OS X it is common for applications and their menu bar
   * to stay active until the user quits explicitly with Cmd + Q
   */
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * Create main window
 * @returns {BrowserWindow} Main window instance
 */

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 860,
    height: 600,
    backgroundColor: '#202020',
    show: false,
    autoHideMenuBar: true,
    icon: path.resolve('assets/favicon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: path.join(__dirname, 'preload.js'),
      sandbox: false,
    },
  });

  // Load the index.html of the app window.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // Show window when its ready to
  mainWindow.on('ready-to-show', () => {
    if (mainWindow) mainWindow.show();
  });

  // Close all windows when main window is closed
  mainWindow.on('close', () => {
    mainWindow = null;
    app.quit();
  });

  return mainWindow;
}

/**
 * In this file you can include the rest of your app's specific main process code.
 * You can also put them in separate files and import them here.
 */
