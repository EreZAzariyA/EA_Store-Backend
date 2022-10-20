import mysql, { MysqlError } from "mysql";

const connection = mysql.createPool({
      host: process.env.MYSQL_HOST || "ea-store.cusvv2nrgef1.us-east-1.rds.amazonaws.com",
      user: process.env.MYSQL_USER || "erezazariya",
      password: process.env.MYSQL_PASSWORD || "59713973",
      database: process.env.MYSQL_DATABASE || "eastore"
});

function execute(sql: string): Promise<any> {
      return new Promise((resolve, reject) => {
            connection.query(sql, (err: MysqlError, result: any) => {
                  if (err) {
                        reject(err)
                        return
                  }
                  resolve(result);
            });
      });
};


export default {
      execute
}