import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { PRODUK_URL } from "../config";
import { toObject } from "../utils";

export default function ProdukEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama_produk: "",
    kategori: "",
    harga_satuan: "",
    deskripsi: "",
  });
  const [info, setInfo] = useState({ tanggal_terdaftar: "", status: "" });

  useEffect(() => {
    axios
      .get(`${PRODUK_URL}/detail.php`, { params: { id } })
      .then((res) => {
        const d = toObject(res.data);
        setForm({
          nama_produk: d.nama_produk || "",
          kategori: d.kategori || "",
          harga_satuan: d.harga_satuan || "",
          deskripsi: d.deskripsi || "",
        });
        setInfo({ tanggal_terdaftar: d.tanggal_terdaftar || "", status: d.status });
      })
      .catch((err) => alert("Gagal memuat detail: " + err.message));
  }, [id]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        id: Number(id),
        id_produk: Number(id),
        nama_produk: form.nama_produk,
        kategori: form.kategori,
        harga_satuan: Number(form.harga_satuan),
        deskripsi: form.deskripsi,
      };
      const res = await axios.post(`${PRODUK_URL}/update.php`, payload);
      alert(res.data.message || "Produk berhasil diubah");
      navigate("/produk-list");
    } catch (err) {
      alert("Gagal: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ maxWidth: 500 }}>
      <h3>Edit Produk</h3>
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
          <input className="form-control" value={info.tanggal_terdaftar} disabled />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <input className="form-control" value={Number(info.status) === 1 ? "Aktif" : "Nonaktif"} disabled />
        </div>
        <button className="btn btn-primary me-2" type="submit">Update</button>
        <button className="btn btn-secondary" type="button" onClick={() => navigate("/produk-list")}>
          Batal
        </button>
      </form>
    </div>
  );
}