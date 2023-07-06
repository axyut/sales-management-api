import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/order/entity/order.entity';
import { Product } from 'src/product/entity/product.entity';
import { Repository } from 'typeorm';
import { Report } from './entity/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private readonly reportRepo: Repository<Report>,
    private orderRepo: OrderService,
  ) {}

  // Create Report
  async createReport(
    userId: number,
    reportDto: CreateReportDto,
  ): Promise<Report> {
    let report: Report = new Report();
    report.reportName = reportDto.reportName;
    report.description = reportDto.description;
    report.reportType = reportDto.reportType;
    report.totalSales = await this.orderRepo.calculateTotalSales();
    report.topSellingProduct =
      await this.orderRepo.calculateTopSellingProducts();
    return this.reportRepo.save(report);
  }
}
