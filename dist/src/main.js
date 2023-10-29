"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.enableCors({
        origin: '*',
        credentials: true,
    });
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Noor Ul Huda-hiring-test')
        .setDescription('This project is just an assessment of a recruitment process')
        .setVersion('0.0.1')
        .addServer('/api/v1')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    app.setGlobalPrefix('api/v1');
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    await app.listen(+configService.get('port') || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map