import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from './page-meta.dto';
import { PageMetaCursorDto } from './page-meta-cursor.dto';

export class PageDto<T> {
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty()
  readonly meta: PageMetaDto | PageMetaCursorDto;

  @ApiProperty()
  readonly extra?: Record<string, string | boolean | number>;

  constructor(
    data: T[],
    meta: PageMetaDto | PageMetaCursorDto,
    extra?: Record<string, string | boolean | number>,
  ) {
    this.data = data;
    this.meta = meta;
    this.extra = extra;
  }
}
