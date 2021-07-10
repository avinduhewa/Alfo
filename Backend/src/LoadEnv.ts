import dotenv from 'dotenv';
import fs from 'fs';

const path = './env/development.env';

// Set the env file
const result = dotenv.config({
	path,
});

fs.copyFile(path, './prisma/.env', (err) => {
	if (err) throw err.message;
	console.log('Env copied to prisma');
});

if (result.error) {
	throw result.error;
}
