import { DBlinks } from '../api/dblinks/dblinks.dto';
import { OracledbCommon } from './db/oracle.common';

export function ConnectionPublic(dblinks: DBlinks){
  if (dblist[dblinks.dbType] === 'oracledb') {
    return new OracledbCommon(dblinks);
  }
}

/**
 * 连接对象的枚举类型
 */
export enum dblist {
  oracledb = 'oracledb',
}