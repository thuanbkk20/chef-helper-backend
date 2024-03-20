import { type ValueOf } from '../interfaces';
export const RECIPE_LIST_SORT_FIELD = {
  CREATED_AT: 'created_at',
  TIME: 'time',
  CALORIE: 'calorie',
} as const;

export type RecipeListSortFieldType = ValueOf<typeof RECIPE_LIST_SORT_FIELD>;
