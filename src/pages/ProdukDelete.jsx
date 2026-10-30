import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { PRODUK_URL } from "../config";

export default function ProdukDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const sudahJalan = useRef(false);

  useEffect(() => {
    if (sudahJalan.current) return; // cegah dobel panggil di StrictMode
    sudahJalan.current = true;

    axios
      .delete(`${PRODUK_URL}/delete.php`, { params: { id } })
      .then((res) => alert(res.data.message || "Produk dinonaktifkan"))
      .catch((err) => alert("Gagal: " + (err.response?.data?.message || err.message)))
      .finally(() => navigate("/produk-list"));
  }, [id, navigate]);

  return <p>Memproses...</p>;
}