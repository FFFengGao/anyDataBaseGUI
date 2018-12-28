import { dblist } from './db.common';
import { OracleQueryBuilder } from './sql/oracle.sql';

export function ConnectionPublic(dbType: string) {
  if (dblist[dbType] === 'oracledb') {
    return new OracleQueryBuilder();
  }
}