import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { rootReducer } from './store';

export type ThunkType<ReturnType = Promise<any> | void> = ThunkAction<ReturnType, RootStateType, unknown, AnyAction>
export type RootStateType = ReturnType<typeof rootReducer>
export type DispatchType = ThunkDispatch<RootStateType, unknown, AnyAction>

export type UserType = {
  id: number
  name: string
  email: string
  phone: string
  position: string
  position_id: number
  registration_timestamp: number
  photo: string
}

export type GetUsersParamsType = {
  page: number
  count: number
}

export type PositionType = {
  id: number
  name: string
}

export type FormDataType = {
  name: string
  email: string
  phone: string
  position: string
  photo: File | null
}
