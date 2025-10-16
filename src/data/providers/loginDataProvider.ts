import * as fs from 'fs';
import * as path from 'path';
import { LoginModel } from '../models/loginModel';

/**
 * Provider para obtener datos de login desde un archivo JSON
 */
export class LoginDataProvider {
	/**
	 * Lee y retorna todos los usuarios de login desde el JSON
	 */
	static getLoginData(): LoginModel[] {
		try {
			// Construye la ruta absoluta al archivo JSON
			const filePath = path.resolve(__dirname, '../json/loginData.json');
			// Lee el archivo y lo parsea a objeto
			const rawData = fs.readFileSync(filePath, 'utf-8');
			const data: LoginModel[] = JSON.parse(rawData);
			return data;
		} catch (error) {
			throw new Error(`[LOGIN DATA ❌] Error al leer datos de login: ${error}`);
		}
	}

	/**
	 * Busca y retorna el primer usuario con el tipo indicado
	 * @param type Tipo de usuario a buscar (valid, invalid, etc.)
	 */
	static getUserByType(type: 'valid' | 'invalid' | 'empty'): LoginModel {
		try {
			const users = this.getLoginData();
			const user = users.find(u => u.type === type);
			if (!user) {
				throw new Error(`[LOGIN DATA ❌] No se encontró usuario con tipo '${type}'`);
			}
			return user;
		} catch (error) {
			throw new Error(`[LOGIN DATA ❌] Error al buscar usuario por tipo '${type}': ${error}`);
		}
	}
}
