import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { HttpClientModule } from '../shared/http-client/http-client.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [HttpClientModule],
})
export class ProductModule {}
