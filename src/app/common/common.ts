import { ApiModelProperty } from '@nestjs/swagger';
import * as _ from 'lodash';
import { TokenVerify } from '../middleware/tokenverify';

class Resri {
  @ApiModelProperty({ description: '请求状态'})
  rc: number;

  @ApiModelProperty({ description: '返回消息' })
  msg: string;
}

export class ResFromatType {
  @ApiModelProperty({ description: '请求状态' })
  readonly ri: Resri;

  @ApiModelProperty({ description: '请求内容' })
  readonly d: any;
}

/**
 * 翻页对象定义
 */
export class PageDTO {
  @ApiModelProperty({ description: '排序方式 1为正序，-1为倒序', required: false })
  readonly _id?: number;

  @ApiModelProperty({ description: '当前页码', required: false })
  page?: number;

  @ApiModelProperty({ description: '当前页数', required: false })
  pageSize?: number;
}

export class HeadersDTO {
  @ApiModelProperty({ description: 'token信息' })
  readonly authorization: string;
}

export function ResFromat(rc: number, msg: string, data?: any) {
  return {
    ri: {
      rc,
      msg,
    },
    d: data || [],
  };
}

export function rowsFormat(headers: Array<any>, rows: Array<any>){
  let thisRows = [];
  _.map(rows, (value) => {
    let row = {};
    _.map(value, (feild, key) => {
      row[headers[key].name] = feild;
    });

    thisRows.push(row);
  });

  return {
    headers,
    rows: thisRows,
  };
}

// 截取cookie并转为对象
export function gfCookieParser(str) {
  let resObj = {};
  try {
    let strSplit = _.split(str, ';');
    _.map(strSplit, (obj) => {
      let cookieStr = _.split(obj, '=');
      let cookieKey = cookieStr[0].replace(/ /g, '');
      let cookieValue = cookieStr[1].replace(/ /g, '');

      resObj[cookieKey] = cookieValue;
    });
  } catch (error) {}

  return resObj;
}

export function verifyToken(req, res, token) {
  let tokenVerify = new TokenVerify(token);
  return new Promise((resolve, reject) => {
    tokenVerify.verifyMoudle((err, info) => {
      if (err) {
        return reject(err);
      }
      resolve(info);
    });
  });
}

/**
 * 将DTO对象进行模糊搜索的格式化
 * @param obj
 */
export function regexDTOFormat(obj){
  let newObj = [];

  _.forEach(obj, (value, key) => {
    if (key !== '_id'){
      let thisObj = {};
      thisObj[key] = { $regex: value, $options: '$i' };
      newObj.push(thisObj);
    }
  });
  if (newObj.length){
    return { $or: newObj };
  }else {
    return {};
  }

}