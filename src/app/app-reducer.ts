export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
}

type AppStateType = typeof initialState

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
  switch (action.type) {
    case 'APP/SET_APP_STATUS':
      return {...state, status: action.status}
    case 'APP/SET_APP_ERROR':
      return {...state, error: action.error}
    default:
      return state
  }
}

type ActionsType = ReturnType<typeof setAppStatusAC>
| ReturnType<typeof setAppErrorAC>

export const setAppStatusAC = (status: RequestStatusType) => ({
    type: 'APP/SET_APP_STATUS' as const,
    status
})

export const setAppErrorAC = (error: string | null) => ({
  type: 'APP/SET_APP_ERROR' as const,
  error
})

