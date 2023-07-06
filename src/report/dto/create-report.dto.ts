import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateReportDto {
  @ApiProperty()
  @IsString()
  reportName: string;

  @ApiProperty()
  @IsString()
  reportType: string;

  @ApiProperty()
  @IsString()
  description: string;
}
