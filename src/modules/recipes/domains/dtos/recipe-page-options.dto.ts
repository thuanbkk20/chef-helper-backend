import { RecipeListSortFieldType } from './../../../../constants/recipe-list-sort-field';
import { ORDER, OrderType } from '../../../../constants';
import {
  EnumFieldOptional,
  NumberFieldOptional,
  StringFieldOptional,
} from '../../../../decorators';
import { RECIPE_LIST_SORT_FIELD } from '../../../../constants/recipe-list-sort-field';

export class RecipePageOptionsDto {
  @EnumFieldOptional(() => RECIPE_LIST_SORT_FIELD, {
    default: RECIPE_LIST_SORT_FIELD.CREATED_AT,
  })
  readonly sortField: RecipeListSortFieldType =
    RECIPE_LIST_SORT_FIELD.CREATED_AT;

  @EnumFieldOptional(() => ORDER, {
    default: ORDER.DESC,
  })
  readonly order: OrderType = ORDER.DESC;

  @NumberFieldOptional({
    minimum: 1,
    default: 1,
    int: true,
  })
  readonly page: number = 1;

  @NumberFieldOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
    int: true,
  })
  readonly take: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  @StringFieldOptional()
  readonly name?: string;

  @NumberFieldOptional()
  readonly categoryId?: number;

  @NumberFieldOptional()
  readonly uploaderId?: number;
}
