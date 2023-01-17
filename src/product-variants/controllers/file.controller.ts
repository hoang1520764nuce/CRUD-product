import { Get } from "@nestjs/common";
import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body } from "@nestjs/common/decorators/http/route-params.decorator";
import { ApiTags } from "@nestjs/swagger";
import { createFileDto } from "../dto/file.dto";
import { fileService } from "../services/file.service";

@Injectable()
@Controller('file')
@ApiTags('File')
export class fileController {
        constructor(
            private readonly fileService: fileService 
        ){}

        @Post()
        async createFile(@Body() body : createFileDto){ 
            return await this.fileService.createFile(body);
        }

        @Get()
        async getAllFile(){
            return await this.fileService.getAllFile();
        }
}