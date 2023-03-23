import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';


export const selectLogin = (state: AppState) => state.login;

export const selectOcompany = createSelector(
  selectLogin,
  (login) => login.ocompany
);

export const selectOrole = createSelector(
  selectLogin,
  (login) => login.orole
);

export const selectPersonId = createSelector(
    selectLogin,
  (login) => login.personId
);