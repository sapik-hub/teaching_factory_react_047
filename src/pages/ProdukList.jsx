import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { PRODUK_URL } from "../config";
import { rupiah, toList } from "../utils";

export default function ProdukList() {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await axios.get(`${PRODUK_URL}/read.php`);
      setProduk(toList(res.data));
    } catch (err) {
      alert("Gagal memuat produk: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const hapus = async (id) => {
    if (!window.confirm("Nonaktifkan produk ini?")) return;
    try {
      const res = await axios.delete(`${PRODUK_URL}/delete.php`, { params: { id } });
      alert(res.data.message || "Berhasil");
      load();
    } catch (err) {
      alert("Gagal: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Product List</h3>
        <Link to="/produk-add" className="btn btn-primary">Create Produk</Link>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nama Produk</th>
            <th>Kategori</th>
            <th>Harga Satuan</th>
            <th>Deskripsi</th>
            <th>Tanggal Terdaftar</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr><td colSpan="8" className="text-center">Memuat...</td></tr>
          )}
          {!loading && produk.length === 0 && (
            <tr><td colSpan="8" className="text-center">Tidak ada data</td></tr>
          )}
          {produk.map((p) => (
            <tr key={p.id_produk}>
              <td>{p.id_produk}</td>
              <td>{p.nama_produk}</td>
              <td>{p.kategori}</td>
              <td>{rupiah(p.harga_satuan)}</td>
              <td>{p.deskripsi}</td>
              <td>{p.tanggal_terdaftar}</td>
              <td>
                {Number(p.status) === 1 ? (
                  <span className="badge bg-success">Aktif</span>
                ) : (
                  <span className="badge bg-secondary">Nonaktif</span>
                )}
              </td>
              <td>
                <Link to={`/produk-edit/${p.id_produk}`} className="btn btn-warning btn-sm me-2">
                  Edit
                </Link>
                <button className="btn btn-danger btn-sm" onClick={() => hapus(p.id_produk)}>
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}