import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from './modules/clients/clients.module';
import { appConfig } from './configs/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig],
    }),
    ClientsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
