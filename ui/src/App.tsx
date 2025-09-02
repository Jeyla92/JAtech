import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { StartView } from './views/start/StartView'
import { ListCategories } from './views/admin/categories/ListCategories'
import { NewCategory } from './views/admin/categories/NewCategory'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<StartView />}/>
        <Route path={"/admin/categories/list-categories"} element={<ListCategories />}/>
        <Route path={"/admin/categories/new-category"} element={<NewCategory />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
