import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { HttpClientModule } from '../shared/http-client/http-client.module';

@Module({
  providers: [ProductService],
  imports: [HttpClientModule],
})
export class ProductModule {}
