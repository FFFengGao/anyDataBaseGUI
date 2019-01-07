import { ApiModelProperty } from '@nestjs/swagger';
import { dblist } from '../../common/db.common';
import { PageDTO } from '../../common/common';

export class DBlinks {
  @ApiModelProperty({ description: '別名'})
  readonly name: string;

  @ApiModelProperty({ description: '数据库类型', enum: ['oracledb']})
  readonly dbType: string;

  @ApiModelProperty({ description: '数据库地址' })
  readonly ip: string;

  @ApiModelProperty({ description: '连接端口' })
  readonly port: number;

  @ApiModelProperty({ description: '用户名' })
  readonly userName?: string;

  @ApiModelProperty({ description: '密码' })
  readonly passWord?: string;

  @ApiModelProperty({ description: '工作空间' })
  readonly workSpace: string;
}

export class BDlinkEditDTO {
  @ApiModelProperty({ description: '主键, 如果传入则修改该条' })
  readonly _id: string;

  @ApiModelProperty({ description: '別名', required: false })
  readonly name?: string;

  @ApiModelProperty({ description: '数据库类型', enum: ['oracledb'], required: false})
  readonly dbType?: string;

  @ApiModelProperty({ description: '数据库地址', required: false })
  readonly ip?: string;

  @ApiModelProperty({ description: '连接端口', required: false })
  readonly port?: number;

  @ApiModelProperty({ description: '用户名', required: false })
  readonly userName?: string;

  @ApiModelProperty({ description: '密码', required: false })
  readonly passWord?: string;

  @ApiModelProperty({ description: '工作空间', required: false})
  readonly workSpace?: string;
}

export class QueryDTO extends PageDTO{
  @ApiModelProperty({ description: '别名', required: false})
  readonly name?: string;

  @ApiModelProperty({ description: '数据库类型', enum: ['oracledb'], required: false})
  readonly dbType?: dblist;

  @ApiModelProperty({ description: '数据库地址', required: false})
  readonly ip?: string;

  @ApiModelProperty({ description: '连接端口', required: false})
  readonly port?: number;

  @ApiModelProperty({ description: '用户名', required: false})
  readonly userName?: string;
}

export class FindOneDTO {
  @ApiModelProperty({ description: '唯一id', required: true})
  readonly _id: string;
}

export class SQLQueryDTO {
  @ApiModelProperty({ description: '指定数据库连接信息的主键 _id' })
  readonly _id: string;

  @ApiModelProperty({ description: '将要查询的sql字符串' })
  readonly sqlStr: string;
}