import mysql, { MysqlError } from "mysql";

const connection = mysql.createPool({
      host: "ea-store.cusvv2nrgef1.us-east-1.rds.amazonaws.com",
      user: "erezazariya",
      password: "59713973",
      database: "eastore"
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