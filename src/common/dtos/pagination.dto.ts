import { ApiExtraModels } from '@nestjs/swagger';
import { IsValidNumber } from '../decorators/custom-validator.decorator';

export class PaginationReqDto {
  @IsValidNumber({ required: false, min: 1 })
  page?: number = 1;

  @IsValidNumber({ required: false, min: 1, max: 100 })
  limit?: number = 20;
}

// https://aalonso.dev/blog/how-to-generate-generics-dtos-with-nestjsswagger-422g
export class PaginationResultDto {
  items: any[];

  meta: {
    itemCount: number;
    totalItems?: number;
    itemsPerPage: number;
    totalPages?: number;
    currentPage: number;
  };

  links?: {
    first?: string;
    previous?: string;
    next?: string;
    last?: string;
  };
}
