import { FormDataType, GetUsersParamsType, PositionType, ThunkType, UserType } from './types';
import { setAppErrorAction, setAppIsLoadingAction } from './appReducer';
import { API } from '../api/mainAPI';
import axios from 'axios';

const initialState = {
  currentPage: 1,
  totalUsersCount: 0,
  users: [] as UserType[],
  positions: [] as PositionType[],
};

export const usersReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'users/SET-USERS':
      return { ...state, users: [...state.users, ...action.users], totalUsersCount: action.totalUsersCount };
    case 'users/RESET-USERS':
      return { ...state, users: [] };
    case 'users/SET-USERS-PAGE':
      return { ...state, currentPage: action.currentPage };
    case 'users/SET-POSITION':
      return { ...state, positions: [...action.positions] };
    default:
      return state;
  }
};

type InitialStateType = typeof initialState

export const setUsersAction = (users: UserType[], totalUsersCount: number) =>
  ({ type: 'users/SET-USERS', users, totalUsersCount } as const);
export const resetUsersAction = () => ({ type: 'users/RESET-USERS' } as const);
export const setUsersPageAction = (currentPage: number) =>
  ({ type: 'users/SET-USERS-PAGE', currentPage } as const);
export const setPositionAction = (positions: PositionType[]) =>
  ({ type: 'users/SET-POSITION', positions } as const);

export type ActionsType =
  | ReturnType<typeof setUsersAction>
  | ReturnType<typeof resetUsersAction>
  | ReturnType<typeof setUsersPageAction>
  | ReturnType<typeof setPositionAction>

export const setUsers = (params: GetUsersParamsType): ThunkType => async dispatch => {
  try {
    dispatch(setAppIsLoadingAction(true));
    const res = await API.getUsers(params);
    dispatch(setUsersAction(res.data.users, res.data.total_users));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(setAppErrorAction(error.message));
    } else {
      dispatch(setAppErrorAction('Some error'));
    }
  } finally {
    dispatch(setAppIsLoadingAction(false));
  }
};

export const setPosition = (): ThunkType => async dispatch => {
  try {
    dispatch(setAppIsLoadingAction(true));
    const res = await API.getPositions();
    dispatch(setPositionAction(res.data.positions));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(setAppErrorAction(error.message));
    } else {
      dispatch(setAppErrorAction('Some error'));
    }
  } finally {
    dispatch(setAppIsLoadingAction(false));
  }
};

export const createProfile = (data: FormDataType): ThunkType => async(dispatch, getState) => {
  try {
    dispatch(setAppIsLoadingAction(true));
    const token = await API.getToken();
    await API.createProfile(token.data.token, data);
    dispatch(resetUsersAction());
    const currentPage = getState().users.currentPage;
    if (currentPage !== 1) {
      dispatch(setUsersPageAction(1));
    } else {
      dispatch(setUsers({ page: 1, count: 6 }));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(setAppErrorAction(error.message));
    } else {
      dispatch(setAppErrorAction('Some error'));
    }
  } finally {
    dispatch(setAppIsLoadingAction(false));
  }
};
