import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { mapaExercicios } from './exercicios';

function createWindow(): void {
  const win = new BrowserWindow({
    width: 950,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, '../index.html'));
}

ipcMain.handle('executar-exercicio', (_event, numero: number) => {
  const ex = mapaExercicios[numero];
  if (!ex) return { titulo: "Não encontrado", descricao: "", output: "Exercício inexistente." };

  return {
    titulo: ex.titulo,
    descricao: ex.descricao,
    output: ex.executar()
  };
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});