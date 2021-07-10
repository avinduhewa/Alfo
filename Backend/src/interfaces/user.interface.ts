export interface User {
	id: number;
	username: string;
	email: string;
	password?: string;
	is_app_installed: boolean;
	enabled: boolean;
	verified: boolean;
	last_active: Date;
	created_at: Date;
	updated_at: Date;
}