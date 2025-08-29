import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { StartView } from './views/start/StartView'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<StartView />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
