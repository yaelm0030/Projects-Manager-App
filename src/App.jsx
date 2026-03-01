import './App.css'
import { Provider } from 'react-redux'
import AppRoutes from './components/AppRoutes.jsx'
import store from './redux/store.js'

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  )
}

export default App