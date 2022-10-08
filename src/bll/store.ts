import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootStateType } from './types';
import { appReducer } from './appReducer';
import { usersReducer } from './usersReducer';

export const rootReducer = combineReducers({
  app: appReducer,
  users: usersReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export const useAppDispatch = () => useDispatch<DispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;


