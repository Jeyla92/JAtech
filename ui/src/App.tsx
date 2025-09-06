// ui/src/App.tsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import RootLayout from "./RootLayout";

// Publika sidor
import { StartView } from "./views/start/StartView";
import ProductPage from "./views/product/ProductPage";
import CategoryPage from "./views/category/CategoryPage";
import SearchResultsPage from "./views/search/SearchResultsPage";

// Admin-sidor
import ProductsList from "./views/admin/products/ProductsList";
import NewProduct from "./views/admin/products/NewProduct";
import { ListCategories } from "./views/admin/categories/ListCategories";
import { NewCategory } from "./views/admin/categories/NewCategory";

export default function App() {

  const isAdmin = window.location.pathname.startsWith('/admin')
  return (
    <BrowserRouter>
      <Routes>
        {/* Allt under RootLayout får gemensam Header */}
        <Route element={!isAdmin && <RootLayout />}>
          {/* Publika */}
          <Route path="/" element={<StartView />} />

          {/* Bas + med parameter */}
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product/:id" element={<ProductPage />} />

          <Route path="/category" element={<CategoryPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />

          <Route path="/search" element={<SearchResultsPage />} />

          {/* Admin */}
          <Route path="/admin/products" element={<ProductsList />} />
          <Route path="/admin/products/new" element={<NewProduct />} />
          <Route path="/admin/categories/list-categories" element={<ListCategories />} />
          <Route path="/admin/categories/new-category" element={<NewCategory />} />
          {/* <Route path="/admin/categories" element={<Navigate to="/admin/categories/list-categories" replace />} />
          <Route path="/admin/categories/new" element={<Navigate to="/admin/categories/new-category" replace />} /> */}

          {/* 404 */}
          <Route path="*" element={<div style={{ padding: 16 }}><h2>Sidan finns inte</h2></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
