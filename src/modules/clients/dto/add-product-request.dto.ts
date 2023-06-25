import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AddProductDto {
  @ApiProperty()
  @IsUUID()
  productId: string;
}
