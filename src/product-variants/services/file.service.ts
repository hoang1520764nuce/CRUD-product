import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { ApiProperty } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { IsArray, IsEnum, IsNumber, IsString } from "class-validator";
import { Repository } from "typeorm";
import { createFileDto } from "../dto/file.dto";
import { File } from "../entities/file.entity";
import { FileEnum } from "../enums/file.enum";

@Injectable()
export class fileService {
    constructor(
        @InjectRepository(File)
        private readonly fileRepository: Repository<File>,
    ){}

    async createFile(dto: createFileDto){
        const file = this.fileRepository.create(dto);
        await this.fileRepository.save(file);

        return file;
    }

    async getAllFile(){
        return await this.fileRepository.find();
    }
}