import fs from 'fs/promises';
import path from 'path';

export const saveJson = async (data: any, fileName: string, directory: string): Promise<void> => {
    try {
        await fs.mkdir(directory, { recursive: true });
        console.log(`Pasta criada ou existente: ${directory}`);
    } catch (error) {
        console.error('Erro ao salvar o arquivo JSON:', error);
         ;
    }

    const dataJson = JSON.stringify(data, null, 2);
    const fullPath = path.join(directory, fileName);

    try {
        await fs.writeFile(fullPath, dataJson, 'utf-8');
        console.log(`Arquivo JSON salvo em: ${fullPath}`);
    } catch (error) {
        console.error('Erro ao salvar o arquivo JSON:', error);
    }
}