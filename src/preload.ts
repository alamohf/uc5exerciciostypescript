import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  executarExercicio: (numero: number) => ipcRenderer.invoke('executar-exercicio', numero)
});