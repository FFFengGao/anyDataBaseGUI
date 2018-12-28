import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TargetInterface } from './target.interface';
import { ResFromat } from '../../common/common';
import { DBInfoInterface } from '../dblinks/dblinks.interface';

@Injectable()
export class TargetService {
  constructor(
    @InjectModel('target')
    private readonly targetModule: Model<TargetInterface>,
    @InjectModel('dbInfo')
    private readonly dbInfoModel: Model<DBInfoInterface>,
  ){ }

  /**
   * 查询当前已经创建的我目标地址数据
   * @param pageDTO
   */
  async findAll(pageDTO){
    let targetList: any = await this.targetModule
    .find({})
    .skip(pageDTO.page * pageDTO.pageSize)
    .limit(pageDTO.pageSize)
    .sort({_id: pageDTO._id})
    .catch(console.error);
    for (let i = 0; i < targetList.length; i++) {
      targetList[i].dbInfo = await this.dbInfoModel.findById(targetList[i]._id).catch(console.error);
    }
    return ResFromat(1, '请求成功!', targetList);
  }

  /**
   * 查询当前已经存在的单条信息
   * @param findOneDTO
   */
  async findById(findOneDTO){
    let targetData: any = await this.targetModule.findById(findOneDTO._id).catch(console.error);
    targetData.dbInfo = await this.dbInfoModel.findById(targetData._id).catch(console.error);

    return ResFromat(1, '请求成功!', targetData);
  }

  /**
   * 保存当前已经存在的信息
   * @param targetParamsDTO
   */
  async save(targetParamsDTO){
    targetParamsDTO.createTime = new Date();
    const targetInfo = new this.targetModule(targetParamsDTO);
    const Result = await targetInfo.save();
    return ResFromat(1, '请求成功!', [Result]);
  }

  delete(findOneDTO){
    return this.targetModule.findByIdAndRemove(findOneDTO._id).then((res) => {
      return ResFromat(1, '删除成功!');
    }).catch((err) => {
      return ResFromat(0, err.message || err);
    });
  }

  edit(editDTO){
    const _id = editDTO._id;
    delete editDTO._id;
    return this.targetModule.findByIdAndUpdate(_id, {
      $set: editDTO,
    }, { new: true}).then((res) => {
      return ResFromat(1, '更新成功!', res);
    }).catch((err) => {
      return ResFromat(0, '删除成功!');
    });
  }
}
