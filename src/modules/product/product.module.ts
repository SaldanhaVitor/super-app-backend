import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { HttpClientModule } from '../shared/http-client/http-client.module';
import { ProductController } from './product.controller';

@Module({
  providers: [ProductService],
  imports: [HttpClientModule],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
