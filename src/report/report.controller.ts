import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { ReportService } from './report.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateReportDto } from './dto/create-report.dto';

@Controller('report')
@ApiTags('Report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  // post report
  @Post(':userId')
  @ApiSecurity('JWT-auth')
  //@UseGuards(JwtAuthGuard)
  create(
    @Req() req,
    @Param('userId') userId: number,
    @Body() createReportDto: CreateReportDto,
  ) {
    return this.reportService.createReport(+userId, createReportDto);
  }
}
