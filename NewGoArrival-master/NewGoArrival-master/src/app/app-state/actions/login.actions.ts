import { createAction, props } from '@ngrx/store';

export const createLogin = createAction(
  '[Login] Create Login',
  props<{ ocompany: any; orole: any; personId: any }>()
);

export const updateLogin = createAction(
  '[Login] Update Login',
  props<{ ocompany: any; orole: any; personId: any }>()
);