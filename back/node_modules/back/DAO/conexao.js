//O banco de dados que será utilizado será o MYSQL
import mysql from 'mysql2/promise';
export default async function conectar(){

    if (global.poolConexoes){
        return await global.poolConexoes.getConnection();
    }
    else{
        const pool = mysql.createPool({
            host: 'localhost',
            user: 'root', 
            port: 3306,
            password: 'root',
            database: 'db_sistema_politico',
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10, 
            idleTimeout: 60000,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
          });

          global.poolConexoes = pool;

          return await global.poolConexoes.getConnection();
    }
}