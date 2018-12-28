import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DBInfoInterface } from './dblinks.interface';
import { ResFromat, rowsFormat } from '../../common/common';
import { ConnectionPublic } from '../../common/db.common';
import { DBlinks } from './dblinks.dto';

@Injectable()
export class DBlinksService {
  constructor(
    @InjectModel('dbInfo')
    private readonly dbInfoModel: Model<DBInfoInterface>,
  ) { }

  async testConnection(dbInfo) {
    const testDB = ConnectionPublic(dbInfo);
    return testDB.getConnection().then((data) => {
      return ResFromat(1, '连接成功!');
    }).catch((err) => {
      return ResFromat(0, err || err.message);
    });
  }

  async create(dbInfo) {
    dbInfo.createTime = new Date();
    const DBInfo = new this.dbInfoModel(dbInfo);
    const Result = await DBInfo.save();
    return ResFromat(1, '请求成功!', [Result]);
  }

  async findAll(queryDTO) {
    const page = queryDTO.page;
    const pageSize = queryDTO.pageSize;
    const _id = queryDTO._id;

    delete queryDTO._id;
    delete queryDTO.page;
    delete queryDTO.pageSize;

    return this.dbInfoModel.find(queryDTO).skip(page * pageSize).limit(pageSize).sort(_id).then((data) => {
      return ResFromat(1, '查询成功!', data);
    }).catch((err) => {
      return ResFromat(0, err || err.message);
    });
  }

  async find(findOneDTO) {
    return this.dbInfoModel.findById(findOneDTO).exec().then((data) => {
      return ResFromat(1, '查询成功!', data);
    }).catch((err) => {
      return ResFromat(0, err || err.message);
    });
  }

  /**
   * 根据主键_id删除
   * @param findOneDTO
   */
  delete(findOneDTO){
    return this.dbInfoModel.findByIdAndRemove(findOneDTO._id).then((res) => {
      return ResFromat(1, '删除成功!');
    }).catch((err) => {
      return ResFromat(0, err.message || err);
    });
  }

  async SQLQuery(sqlQueryDTO){
    const thisDBInfo: DBlinks = await this.dbInfoModel.findById(sqlQueryDTO._id).exec();
    const db = ConnectionPublic(thisDBInfo);
    await db.getConnection();
    // 传入需要查询的sql
    return db.sqlExecute(sqlQueryDTO.sqlStr).then((value: any) => {
      const resData = rowsFormat(value.metaData, value.rows);
      return ResFromat(1, '获取表名成功!', resData);
    }).catch((err) => {
      return ResFromat(0, err || err.message);
    });
  }

  edit(editDTO) {
    const _id = editDTO._id;
    delete editDTO._id;
    return this.dbInfoModel.findByIdAndUpdate(_id, {
      $set: editDTO,
    }, { new: true }).then((res) => {
      return ResFromat(1, '更新成功!', res);
    }).catch((err) => {
      return ResFromat(0, '删除成功!');
    });
  }
}