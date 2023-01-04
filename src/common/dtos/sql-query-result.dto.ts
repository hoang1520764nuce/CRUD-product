import { PartialType } from '@nestjs/swagger';
import { QueryResult } from 'typeorm';

export class SqlQueryResultDto extends PartialType(QueryResult) {
  affected?: number;
}
