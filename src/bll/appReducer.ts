const initialState = {
  error: null as null | string,
  isLoading: false,
};

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'app/SET-ERROR':
      return { ...state, error: action.error };
    case  'app/SET-IS-LOADING':
      return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
};

export const setAppErrorAction = (error: null | string) =>
  ({ type: 'app/SET-ERROR', error } as const);
export const setAppIsLoadingAction = (isLoading: boolean) =>
  ({ type: 'app/SET-IS-LOADING', isLoading } as const);

type InitialStateType = typeof initialState
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAction>
export type SetAppIsLoadingActionType = ReturnType<typeof setAppIsLoadingAction>
export type ActionsType =
  | SetAppErrorActionType
  | SetAppIsLoadingActionType

