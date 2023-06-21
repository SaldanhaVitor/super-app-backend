import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateClientDto {
  @ApiProperty()
  @IsString()
  name: string;
}
