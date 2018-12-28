import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TableInfo } from './tableInfo.interface';
import { DBInfoInterface } from '../dblinks/dblinks.interface';
import { DBlinks } from '../dblinks/dblinks.dto';
import { ResFromat, rowsFormat } from '../../common/common';
import { ConnectionPublic } from '../../common/db.common';

@Injectable()
export class TableInfoService {
  constructor(
    @InjectModel('tableInfo')
    private readonly tableInfoModel: Model<TableInfo>,
    @InjectModel('dbInfo')
    private readonly dbInfoModel: Model<DBInfoInterface>,
  ) { }

  /**
   * 获取表详情方法
   * @param tableInfoParamsDTO
   */
  async tableInfo(tableInfoParamsDTO) {
    const thisDBInfo: DBlinks = await this.dbInfoModel.findById(tableInfoParamsDTO._id).exec();
    const db = ConnectionPublic(thisDBInfo);
    await db.getConnection();
    return db.getTableInfo(tableInfoParamsDTO.tableName).then((value: any) => {
      const resData = rowsFormat(value.metaData, value.rows);
      return ResFromat(1, '获取表名成功!', resData);
    }).catch((err) => {
      return ResFromat(0, err || err.message);
    });
  }

  /**
   * 获取表方法
   * @param findOneDTO
   */
  async table(findOneDTO) {
    const thisDBInfo: DBlinks = await this.dbInfoModel.findById(findOneDTO._id).exec();
    const db = ConnectionPublic(thisDBInfo);
    await db.getConnection();
    // 传入需要查询的sql
    return db.getTableName().then((value: any) => {
      const resData = _.flattenDeep(value.rows);
      return ResFromat(1, '获取表名成功!', resData);
    }).catch((err) => {
      return ResFromat(0, err || err.message);
    });
  }

  /**
   * 保存标准化后的信息
   * @param tableStandradParamsDTO
   */
  async save(tableStandradParamsDTO){
    tableStandradParamsDTO.createTime = new Date();
    const DBInfo = new this.tableInfoModel(tableStandradParamsDTO);
    const Result = await DBInfo.save();
    return ResFromat(1, '请求成功!', [Result]);
  }

  /**
   * 根据主键_id删除标准化信息
   * @param tableDelParams {
   *  _id: string //主键
   * }
   */
  delete(tableDelParams){
    return this.tableInfoModel.findByIdAndRemove(tableDelParams._id).then((res) => {
      return ResFromat(1, '删除成功!');
    }).catch((err) => {
      return ResFromat(0, err.message || err);
    });
  }

  queryStandradInfo(queryStandradParam){
    return this.tableInfoModel.findOne(queryStandradParam).then((res) => {
      return ResFromat(1, '查询成功!', [res]);
    }).catch((err) => {
      return ResFromat(0, err.message || err);
    });
  }

  edit(editDTO){
    const _id = editDTO._id;
    delete editDTO._id;
    return this.tableInfoModel.findByIdAndUpdate(_id, {
      $set: editDTO,
    }, { new: true }).then((res) => {
      return ResFromat(1, '更新成功!', res);
    }).catch((err) => {
      return ResFromat(0, '删除成功!');
    });
  }
}