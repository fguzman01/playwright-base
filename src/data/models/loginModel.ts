/**
 * Interfaz que modela los datos de usuarios para login
 * Incluye mensaje de error esperado para casos negativos
 */
export interface LoginModel {
	type: string; // tipo de usuario (valid, invalid, etc.)
	username: string;
	password: string;
	expectedError: string; // mensaje de error esperado (opcional)
}
