import * as oracledb from 'oracledb';
import { DBlinks } from '../../api/dblinks/dblinks.dto';

export class OracledbCommon {
  public dbConnection: any;

  constructor(public dblinks: DBlinks){
    this.getConnection();
  }

  /**
   * 获取指定的连接对象接口
   */
  async getConnection(){
    const self = this;
    return new Promise((resolve, reject) => {
      // 拼接连接信息
      const linkStr = self.dblinks.ip + ':' + self.dblinks.port + '/' + self.dblinks.workSpace;
      oracledb.getConnection({ user: self.dblinks.userName, password: self.dblinks.passWord, connectString: linkStr }, ((err, connection) => {
        if (err) {
          console.error(err.message);
          reject(err.message);
          return;
        }
        console.log('连接成功!');
        this.dbConnection = connection;
        // 返回连接对象
        resolve(connection);
      }));
    });
  }

  /**
   * 传入连接对象和sql获取执行结果
   * @param sqlStr sql字符串
   */
  sqlExecute(sqlStr: string){
    return this.dbConnection.execute(sqlStr);
  }

  getTableName(){
    return this.sqlExecute('select table_name from user_tables');
  }

  async getTableInfo(tableName: string) {
    return this.sqlExecute('SELECT * FROM ' + tableName + ' t where ROWNUM < 50');
  }

  pageTo(sql: string, offset: number, pageSize: number){
    return `select * from (select row_.*, ROWNUM rownum_ from (${sql}) row_ where rownum <= ${offset + pageSize}) where rownum_ > ${offset}`;
  }
}
