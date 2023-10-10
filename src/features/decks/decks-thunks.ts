import { Dispatch } from 'redux'
import { decksAPI, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'
import { setAppErrorAC, setAppStatusAC } from '../../app/app-reducer'
import { isAxiosError } from 'axios'
import { getErrorMessage} from '../../common/utils/handle-error'

export const fetchDecksTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await decksAPI.fetchDecks()
    dispatch(setDecksAC(res.data.items))
    dispatch(setAppStatusAC('succeeded'))
  } catch (error) {
    dispatch(setAppStatusAC('failed'))
  }
  // dispatch(setAppStatusAC('loading'))
  // decksAPI.fetchDecks().then((res) => {
  //   dispatch(setDecksAC(res.data.items))
  //   dispatch(setAppStatusAC('succeeded'))
  //  }).catch(e) {
  //     dispatch(setAppStatusAC('failed'))
  //     }
}

export const addDeckTC = (name: string) => async (dispatch: Dispatch) => {
  return decksAPI.addDeck(name).then((res) => {
    dispatch(addDeckAC(res.data))
  })
}

export const deleteDeckTC = (id: string) => (dispatch: Dispatch) => {
  return decksAPI.deleteDeck(id).then((res) => {
    dispatch(deleteDeckAC(res.data.id))
  })
}

export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
  try {
    const res = await decksAPI.updateDeck(params)
    dispatch(updateDeckAC(res.data))
  } catch (e) {
    dispatch(setAppErrorAC(getErrorMessage(e)))
  }
  // return decksAPI.updateDeck(params).then((res) => {
  //   dispatch(updateDeckAC(res.data))
  // })
}



// кейсы при обработке ошибок
// первые 2 ошибки связаны с axious
// case_1: ошибка запроса (приходят с бэка) - axios создает объект ошибки, в response.data помещает ответ сервера

// case_2: network error (на стороне клиента) - axios создает объект ошибки, текст ошибки берем из поля message
// поля response нет в case_2

// case_3 ошибка вне зарпоса - генерируется нативными методами js имеет поле message
// обычные нативные ошибки в try ошибка связана с логикой запроса (синхронным кодом)
// throw new Error('Boom!')