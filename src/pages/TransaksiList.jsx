import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { TRANSAKSI_URL } from "../config";
import { rupiah, toList } from "../utils";

export default function TransaksiList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${TRANSAKSI_URL}/read.php`)
      .then((res) => setData(toList(res.data)))
      .catch((err) => alert("Gagal memuat transaksi: " + err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Transaksi PO List</h3>
        <Link to="/transaksi-create" className="btn btn-primary">Tambah PO</Link>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID PO</th>
            <th>Nama Produk</th>
            <th>Nama Perusahaan</th>
            <th>Tanggal PO</th>
            <th>Tanggal Mulai</th>
            <th>Tanggal Selesai</th>
            <th>Jumlah</th>
            <th>Total Harga</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr><td colSpan="8" className="text-center">Memuat...</td></tr>
          )}
          {!loading && data.length === 0 && (
            <tr><td colSpan="8" className="text-center">Tidak ada data</td></tr>
          )}
          {data.map((t) => (
            <tr key={t.id_po}>
              <td>{t.id_po}</td>
              <td>{t.nama_produk}</td>
              <td>{t.nama_perusahaan}</td>
              <td>{t.tanggal_po}</td>
              <td>{t.tanggal_mulai}</td>
              <td>{t.tanggal_selesai}</td>
              <td>{t.jumlah}</td>
              <td>{rupiah(t.total_harga)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}