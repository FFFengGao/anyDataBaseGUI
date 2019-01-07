import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SourceInterface } from './source.interface';
import { DBInfoInterface } from '../dblinks/dblinks.interface';
import { ResFromat, rowsFormat } from '../../common/common';
import { ConnectionPublic } from '../../common/db.common';

@Injectable()
export class SourceService {
  constructor(
    @InjectModel('source')
    private readonly sourceModel: Model<SourceInterface>,
    @InjectModel('dbInfo')
    private readonly dbInfoModel: Model<DBInfoInterface>,
  ){}

  async findAll(pageDTO){
    let sourceData: any = await this.sourceModel
    .find({})
    .skip(pageDTO.page * pageDTO.pageSize)
    .limit(pageDTO.pageSize)
    .sort({ _id: pageDTO._id})
    .catch(console.error);
    sourceData = JSON.parse(JSON.stringify(sourceData));

    for (let i = 0; i < sourceData.length; i++) {
      sourceData[i].dbInfo = await this.dbInfoModel.findById(sourceData[i].sourceId).catch(console.error);
    }

    return ResFromat(1, '请求成功!', sourceData);
  }

  async findById(findOneData){
    let sourceData: any = await this.sourceModel
      .findById(findOneData)
      .catch(console.error);
    sourceData = JSON.parse(JSON.stringify(sourceData));
    sourceData.dbInfo = await this.dbInfoModel.findById(sourceData.sourceId).catch(console.error);
    return ResFromat(1, '请求成功!', sourceData);
  }

  async save(sourceRes){
    sourceRes.createTime = new Date();
    const souceSaveData = new this.sourceModel(sourceRes);
    const Result = await souceSaveData.save();
    return ResFromat(1, '请求成功!', [Result]);
  }

  async delete(findOneDTO){
    return this.sourceModel.findByIdAndRemove(findOneDTO._id).then((res) => {
      return ResFromat(1, '删除成功!');
    }).catch((err) => {
      return ResFromat(0, err.message || err);
    });
  }

  edit(editDTO){
    const _id = editDTO._id;
    delete editDTO._id;
    return this.sourceModel.findByIdAndUpdate(_id, {
      $set: editDTO,
    }, { new: true }).then((res) => {
      return ResFromat(1, '更新成功!', res);
    }).catch((err) => {
      return ResFromat(0, '删除成功!');
    });
  }

  /**
   * 根据当前给出的sourceId信息返回标准化后的字段
   * @param pageDTO {
   *   _id: source字段的信息
   *   page: 页码
   *   pageSize: 页数
   * }
   */
  async getSourceData(pageDTO){
    let sourceData: any = await this.sourceModel.findById(pageDTO._id).catch(console.error);
    sourceData = JSON.parse(JSON.stringify(sourceData));
    sourceData.dbInfo = await this.dbInfoModel.findById(sourceData.sourceId).catch(console.error);
    const db = ConnectionPublic(sourceData.dbInfo);
    await db.getConnection();
    // 查询数据库总和
    let count = await this.getSourceCount(db, sourceData.queryFunc);
    // 传入需要查询的sql
    return db.sqlExecute(db.pageTo(sourceData.queryFunc, pageDTO.pageSize, pageDTO.page * pageDTO.pageSize)).then((value: any) => {
      const resData = rowsFormat(value.metaData, value.rows);
      db.dbConnection.close();
      return ResFromat(1, '获取数据成功!', {
        count,
        resData,
      });
    }).catch((err) => {
      return ResFromat(0, err || err.message);
    });
  }

  // 将查询语句进行计数统计
  getSourceCount(db, queryFunc){
    let sqlArr = queryFunc.split(' ');
    sqlArr[1] = 'count(*)';
    return db.sqlExecute(sqlArr.join(' '));
  }
}