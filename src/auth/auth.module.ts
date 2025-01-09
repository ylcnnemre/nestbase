import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ModelsModule } from '../models/models.module';

@Module({
  imports: [ModelsModule],
  controllers: [AuthController]
})
export class AuthModule {}
