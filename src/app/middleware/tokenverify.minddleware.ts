import { gfCookieParser, verifyToken, ResFromat } from '../common/common';
import { AppConfig } from '../config/app.config';

export async function LoginVerify(req, res, next, callback){
  let tokenPath = req.query.token;
  // 先判断url中token是否有参数，如果没有则让其登录
  if (tokenPath) {
    if (tokenPath === 'true') {
      let cookieObj: any = gfCookieParser(req.headers.cookie);
      // 验证token
      let userData = await verifyToken(req, res, cookieObj.missionToken).catch(console.error);
      if (userData) {
        return callback();
      } else {
        return redirectPage(req, res);
      }

      // 如果为true则表明已经被截取过，从cookie中获取token并验证
    } else {
      // 验证token
      await verifyToken(req, res, tokenPath).catch(console.error);

      try {
        res.cookie('missionToken', tokenPath, { httpOnly: true });
        res.cookie('TokenKey', tokenPath, { httpOnly: false });
      } catch (error) {
        console.log(error);
      }

      res.redirect(AppConfig.localPath + '?token=true');
    }
  }else{
    // 如果没有则查看cookie中是否有token
    let cookieObj: any = gfCookieParser(req.headers.cookie);
    if (cookieObj.missionToken) {
      let userData = await verifyToken(req, res, cookieObj.missionToken).catch(console.error);
      if (userData) {
        res.redirect(AppConfig.localPath + '?token=true');
      } else {
        return redirectPage(req, res);
      }
    } else {
      return redirectPage(req, res);
    }
  }
}

/**
 * 对于本页面的重定向
 * @param {*} req
 * @param {*} res
 */
function redirectPage(req, res) {
  return res.redirect(AppConfig.loginUrl + '?returnUrl=' + AppConfig.localPath);
}

export async function TokenIntercept(req, res, next){
  let ifredirect = req.path.indexOf('/api');
  if (req.path !== '/login' && req.path !== '/' && ifredirect === -1) {
    let cookiesStr = req.headers.cookie || '';
    let token: any = gfCookieParser(cookiesStr);

    await verifyToken(req, res, token.missionToken).then((data) => {
      next();
    }).catch((err) => {
      if (err) {
        console.log(err);
      }
      res.status(307);
      res.json(ResFromat(0, '用户验证失败', [{redirect: AppConfig.loginUrl + '?returnUrl=' + AppConfig.localPath}]));
    });
  } else {
    next();
  }
}
