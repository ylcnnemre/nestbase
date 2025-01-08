import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-db')
  async testDatabase() {
    try {
      const isConnected = this.dataSource.isInitialized;
      await this.dataSource.query('SELECT 1');
      return {
        status: 'success',
        isConnected,
        message: 'Database connection is working!'
      };
    } catch (error) {
      return {
        status: 'error',
        isConnected: false,
        message: 'Database connection failed!',
        error: error.message
      };
    }
  }
}
