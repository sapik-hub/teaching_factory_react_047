import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProdukList from "./pages/ProdukList";
import ProdukAdd from "./pages/ProdukAdd";
import ProdukEdit from "./pages/ProdukEdit";
import ProdukDelete from "./pages/ProdukDelete";
import TransaksiList from "./pages/TransaksiList";
import TransaksiCreate from "./pages/TransaksiCreate";

export default function App() {
  return (
    <>
      <Header />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Navigate to="/produk-list" replace />} />
          <Route path="/produk-list" element={<ProdukList />} />
          <Route path="/produk-add" element={<ProdukAdd />} />
          <Route path="/produk-edit/:id" element={<ProdukEdit />} />
          <Route path="/produk-delete/:id" element={<ProdukDelete />} />
          <Route path="/transaksi-list" element={<TransaksiList />} />
          <Route path="/transaksi-create" element={<TransaksiCreate />} />
          <Route path="*" element={<h4>404 - Halaman tidak ditemukan</h4>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}