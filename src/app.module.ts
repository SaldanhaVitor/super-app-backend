import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from './modules/clients/clients.module';
import { appConfig } from './configs/app.config';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { ProductModule } from './modules/product/product.module';
import { HttpClientModule } from './modules/shared/http-client/http-client.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig],
    }),
    ClientsModule,
    WishlistModule,
    ProductModule,
    HttpClientModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
