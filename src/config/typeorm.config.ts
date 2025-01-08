import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';

const getEnvPath = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return '.env.prod';
    case 'development':
      return '.env.dev';
    case 'local':
      return '.env.local';
    default:
      return '.env.dev';
  }
};

// Load environment variables
dotenv.config({ path: getEnvPath() });

// NestJS için TypeORM konfigürasyonu
export const getTypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  logging: process.env.NODE_ENV === 'local',
});

// Migration'lar için TypeORM konfigürasyonu
const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, '..', 'models', '**', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '..', 'migrations', '**', '*.{ts,js}')],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: process.env.NODE_ENV === 'local',
};

export default new DataSource(config); 