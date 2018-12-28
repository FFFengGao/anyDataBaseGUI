import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/api/app.module';
import { LoginVerify, TokenIntercept } from './app/middleware/tokenverify.minddleware';
import proxy = require('express-http-proxy');
import { AppConfig } from './app/config/app.config';

async function bootstrap() {
  // 注册依赖
  const app = await NestFactory.create(AppModule);

  // 申明静态文件，MVC模式
  app.useStaticAssets(__dirname + '/public');
  app.setBaseViewsDir(__dirname + '/public');
  app.setViewEngine('html');

  app.use(TokenIntercept);

  app.use('/', (req, res, next) => {
    if (req.path === '/'){
      LoginVerify(req, res, next, () => {
        res.render('./index');
      });
    } else {
      next();
    }
  });

  // 添加类型代理
  app.use('/type/all', proxy(AppConfig.ClueDerivationWebServ, {
    proxyReqPathResolver(proxyReq) {
      return proxyReq.originalUrl;
    },
  }));

  // openAPI（swagger）配置
  const options = new DocumentBuilder()
    .setTitle('协同指引后台管理界面接口文档')
    .setDescription('协同指引后台管理界面接口文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();