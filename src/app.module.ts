/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './Employee/employee.entity';
import { EmployeeModule } from './Employee/employee.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:'localhost',
      port : 5433 ,
      username : 'postgres',
      password : '123123' ,
      database : 'employeeDB',
      entities:[Employee],
      synchronize:true,
    
    }),
    EmployeeModule],

})
export class AppModule {



}
