import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { employeeController } from "./employee.controller";
import { Employee } from "./employee.entity";
import { employeeService } from "./employee.service";
@Module({
    controllers:[employeeController],
    providers:[employeeService],
    imports:[TypeOrmModule.forFeature([Employee])],
    exports:[TypeOrmModule]
})
export class EmployeeModule {}