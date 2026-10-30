import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand fw-bold">MyApp</span>
        <div className="navbar-nav">
          <NavLink className="nav-link" to="/produk-list">Produk</NavLink>
          <NavLink className="nav-link" to="/transaksi-list">Transaksi PO</NavLink>
        </div>
      </div>
    </nav>
  );
}