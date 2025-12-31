import { ENV } from "./src/config/env.js";
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: 'postgresql',        
    schema: './src/database/schema.js',  
    out: './src/database/migrations',             
    dbCredentials: {              
        url: ENV.DATABASE_URL,
    },
});