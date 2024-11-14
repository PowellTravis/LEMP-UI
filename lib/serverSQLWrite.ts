import mysql from "mysql2/promise";
import { isatty } from "tty";

const connectionConfig = {
    host: process.env.DB_Host,
    user: process.env.DB_User,
    password: process.env.DB_Password,
    database: process.env.DB_Database,
};

export async function serverSQLWrite({system, key, value}: {system: String, key: String}) {
    const connection = await mysql.createConnection(connectionConfig);
    try {
        const [results, fields] = await connection.query(
            `UPDATE Server SET ${key}= ${value} WHERE name='${system}'`
        );
        connection.end()
        return results
    } catch (err) {
        console.log(err);
        connection.end()
    }
}