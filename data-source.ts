import { DataSource, DataSourceOptions } from 'typeorm';

export let dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: '123123',
  database: 'product',
  synchronize: false,
  migrationsRun: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js']
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
