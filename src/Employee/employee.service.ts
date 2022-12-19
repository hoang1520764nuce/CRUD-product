import { Injectable } from "@nestjs/common/decorators";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Employee } from "./employee.entity";

@Injectable()
export class employeeService {
        
        constructor(
            @InjectRepository(Employee)
            private employeeRepository : Repository<Employee>){}

            findAll():Promise<Employee[]>{
                return this.employeeRepository.find();
            }

            // return 

}