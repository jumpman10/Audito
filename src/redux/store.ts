import rootReducer from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { api } from '../services/api/api'

const store = configureStore({
  reducer: {...rootReducer, 
    [api.reducerPath]: api.reducer
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false
    }).concat(api.middleware)
  }
})

setupListeners(store.dispatch)

export { store } 