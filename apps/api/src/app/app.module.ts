import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import * as Path from 'path';
import * as Mongoose from 'mongoose';

const envFilePath = Path.resolve(process.cwd(),'.env.local');
console.log(envFilePath)

// If something goes wrong about mongoose queries
Mongoose.set("debug", true);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        MAPBOX_GL_ACCESS_TOKEN: Joi.string().required(),
        SERVER_PORT: Joi.number().default(4000)
      }),
      envFilePath,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGO_URI") ?? "",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject:[ConfigService]
    })

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
