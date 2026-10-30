import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PRODUK_URL, TRANSAKSI_URL } from "../config";
import { rupiah, today, toList } from "../utils";

export default function TransaksiCreate() {
  const navigate = useNavigate();
  const [produk, setProduk] = useState([]);
  const [form, setForm] = useState({
    id_produk: "",
    nama_perusahaan: "",
    tanggal_po: today(),
    tanggal_mulai: "",
    tanggal_selesai: "",
    jumlah: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${PRODUK_URL}/read.php`)
      .then((res) => setProduk(toList(res.data).filter((p) => Number(p.status) === 1)))
      .catch((err) => alert("Gagal memuat produk: " + err.message));
  }, []);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  // total harga otomatis = harga produk x jumlah
  const terpilih = produk.find((p) => String(p.id_produk) === String(form.id_produk));
  const total = terpilih ? Number(terpilih.harga_satuan) * Number(form.jumlah || 0) : 0;

  const submit = async (e) => {
    e.preventDefault();

    // Validasi tanggal: mulai harus lebih kecil dari selesai
    if (form.tanggal_mulai >= form.tanggal_selesai) {
      setError("Tanggal mulai harus lebih kecil dari tanggal selesai!");
      return;
    }

    try {
      const payload = {
        id_produk: Number(form.id_produk),
        nama_perusahaan: form.nama_perusahaan,
        tanggal_po: form.tanggal_po,
        tanggal_mulai: form.tanggal_mulai,
        tanggal_selesai: form.tanggal_selesai,
        jumlah: Number(form.jumlah),
        total_harga: total,
      };
      const res = await axios.post(`${TRANSAKSI_URL}/create.php`, payload);
      alert(res.data.message || "Transaksi PO berhasil dibuat");
      navigate("/transaksi-list");
    } catch (err) {
      alert("Gagal: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ maxWidth: 500 }}>
      <h3>Buat Transaksi PO</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label">Produk</label>
          <select className="form-select" name="id_produk" value={form.id_produk} onChange={onChange} required>
            <option value="">-- Pilih Produk --</option>
            {produk.map((p) => (
              <option key={p.id_produk} value={p.id_produk}>
                {p.nama_produk} ({rupiah(p.harga_satuan)})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Nama Perusahaan</label>
          <input className="form-control" name="nama_perusahaan" value={form.nama_perusahaan} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Tanggal PO</label>
          <input type="date" className="form-control" value={form.tanggal_po} disabled />
        </div>
        <div className="mb-3">
          <label className="form-label">Tanggal Mulai</label>
          <input type="date" className="form-control" name="tanggal_mulai" value={form.tanggal_mulai} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Tanggal Selesai</label>
          <input type="date" className="form-control" name="tanggal_selesai" value={form.tanggal_selesai} onChange={onChange} min={form.tanggal_mulai} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Jumlah</label>
          <input type="number" min="1" className="form-control" name="jumlah" value={form.jumlah} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Total Harga</label>
          <input className="form-control" value={rupiah(total)} disabled />
        </div>
        <button className="btn btn-primary me-2" type="submit">Simpan</button>
        <button className="btn btn-secondary" type="button" onClick={() => navigate("/transaksi-list")}>
          Batal
        </button>
      </form>
    </div>
  );
}