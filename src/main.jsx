import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css'
import App from './App.jsx'
import store, { persistor } from './redux/store'

// Componente de carga mientras se recupera el estado persistido
const PersistLoading = () => (
  <div className='loading-fallback'>
    <div className='loading-spinner'>Cargando datos guardados...</div>
  </div>
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={<PersistLoading />}
        persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
)
