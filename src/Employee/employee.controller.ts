import { Controller, Get } from "@nestjs/common/decorators";
import { employeeService } from "./employee.service";

@Controller('employee')
export class employeeController{
   constructor(private employeeService:employeeService){

   } 
    @Get()
    getAll(){
        return this.employeeService.findAll();
    }
}