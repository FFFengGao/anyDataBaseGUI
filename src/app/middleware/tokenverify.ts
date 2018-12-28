
import * as request from 'request';
import * as jwt from 'jsonwebtoken';
import { AppConfig } from '../config/app.config';

export class TokenVerify {
  public decoded_token: any;
  public userListUrl = AppConfig.userListUrl;
  public registerUrl = AppConfig.registerUrl;
  constructor(public token: string) {
    try {
      this.decoded_token = jwt.decode(this.token);
    } catch (e) {
      this.decoded_token = null;
    }
  }

  verifyMoudle(callback){
    this.getUserInfo((err, info) => {
      if (err) {
        return callback(err);
      }
      return callback(null, info);
    });
  }

  getNewToken(callback) {
    request.post({
        url: this.registerUrl,
        headers: {
          Authorization: 'JWT ' + this.token,
        },
        json: true,
        body: {
          token: this.token,
        },
    }, (err, response, body) => {
      if (err) {
        console.log(err);
        return callback(err);
      }

      if (response.statusCode !== 200 || body.results !== 'ok' || !body.token) {
        console.log(new Error(body));
        return callback(response.statusCode);
      }

      callback(null, body.token);
    });
  }

  getAllUser(callback) {
    request({
      url: this.userListUrl,
      headers: {
        Authorization: ' JWT ' + this.token,
      },
    }, (err, response, body) => {
      if (err) {
        callback({
          message: '无法获取权限',
          stack: err.stack,
        });
        return;
      }

      if (response.statusCode !== 200) {
        callback({
          message: response.statusCode + ': 无效的权限',
          stack: body,
        });
        return;
      }

      try {
        body = JSON.parse(body);
      } catch (e) {
        callback({
          message: '无效的权限',
          stack: body,
        });
        return;
      }

      callback(null, body);
    });
  }

  getUserInfo(callback){
    let decoded = this.decoded_token;
    if (!decoded) {
      callback({
        message: '无效的token',
        stack: '无效的token:' + this.token,
      });
      return;
    }

    let token = this.token;
    request({
      url: this.userListUrl + decoded.user_id,
      headers: {
        Authorization: ' JWT ' + token,
      },
    }, (err, response, body) => {
      if (err) {
        callback({
          message: '无法获取权限',
          stack: err.stack,
        });
        return;
      }

      if (response.statusCode !== 200) {
        callback({
          message: response.statusCode + ': 无效的权限',
          stack: body,
        });
        return;
      }

      try {
        body = JSON.parse(body);
      } catch (e) {
        callback({
          message: '无效的权限',
          stack: body,
        });
        return;
      }

      callback(null, body);
    });
  }
}