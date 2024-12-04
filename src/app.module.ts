import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './url/url.module';
import { ControllerService } from './controller/controller.service';

@Module({
  imports: [UrlModule],
  controllers: [AppController],
  providers: [AppService, ControllerService],
})
export class AppModule {}
