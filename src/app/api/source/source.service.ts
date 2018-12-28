import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SourceInterface } from './source.interface';
import { DBInfoInterface } from '../dblinks/dblinks.interface';
import { ResFromat } from '../../common/common';

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
}