import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PRODUK_URL } from "../config";
import { today } from "../utils";

export default function ProdukAdd() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama_produk: "",
    kategori: "",
    harga_satuan: "",
    deskripsi: "",
    tanggal_terdaftar: today(),
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        harga_satuan: Number(form.harga_satuan),
        status: 1, // otomatis aktif, tidak ditampilkan di form
      };
      const res = await axios.post(`${PRODUK_URL}/create.php`, payload);
      alert(res.data.message || "Produk berhasil ditambahkan");
      navigate("/produk-list");
    } catch (err) {
      alert("Gagal: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ maxWidth: 500 }}>
      <h3>Tambah Produk</h3>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label">Nama Produk</label>
          <input className="form-control" name="nama_produk" value={form.nama_produk} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Kategori</label>
          <input className="form-control" name="kategori" value={form.kategori} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Harga Satuan</label>
          <input type="number" min="0" className="form-control" name="harga_satuan" value={form.harga_satuan} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Deskripsi</label>
          <textarea className="form-control" name="deskripsi" value={form.deskripsi} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Tanggal Terdaftar</label>
          <input type="date" className="form-control" value={form.tanggal_terdaftar} disabled />
        </div>
        <button className="btn btn-primary me-2" type="submit">Simpan</button>
        <button className="btn btn-secondary" type="button" onClick={() => navigate("/produk-list")}>
          Batal
        </button>
      </form>
    </div>
  );
}