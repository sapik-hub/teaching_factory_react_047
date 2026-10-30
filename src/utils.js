export const today = () => new Date().toLocaleDateString("en-CA");

export const rupiah = (n) => "Rp " + Number(n || 0).toLocaleString("id-ID");

export const toList = (d) => {
  if (Array.isArray(d)) return d;
  if (d && Array.isArray(d.data)) return d.data;
  if (d && Array.isArray(d.records)) return d.records;
  return [];
};

export const toObject = (d) => {
  if (Array.isArray(d)) return d[0] || {};
  if (d && d.data) return Array.isArray(d.data) ? d.data[0] || {} : d.data;
  return d || {};
};