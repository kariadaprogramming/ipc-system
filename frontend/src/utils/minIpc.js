import { useState, useEffect } from 'react';
import api from './api';

// Batas minimum Total IPC (konfigurasi IPC, kategori 'pengaturan').
// 0 = fitur nonaktif (tidak ada total yang ditandai merah).
// Gagal mengambil juga dianggap 0 supaya tampilan tetap jalan tanpa error.
export async function fetchMinIpc() {
  try {
    const res = await api.get('/ipc-config/min-ipc');
    const value = Number(res.data?.min_ipc);
    return Number.isFinite(value) && value > 0 ? value : 0;
  } catch (e) {
    return 0;
  }
}

// True jika total IPC kurang dari batas minimum (hanya saat batas aktif > 0).
// Total tanpa nilai (null/undefined) tidak ditandai.
export function isBelowMinIpc(total, minIpc) {
  const min = Number(minIpc);
  if (!Number.isFinite(min) || min <= 0) return false;
  if (total === null || total === undefined || total === '') return false;
  const value = Number(total);
  return Number.isFinite(value) && value < min;
}

// Hook: ambil batas minimum sekali saat komponen mount.
export function useMinIpc() {
  const [minIpc, setMinIpc] = useState(0);
  useEffect(() => {
    let alive = true;
    fetchMinIpc().then((value) => {
      if (alive) setMinIpc(value);
    });
    return () => { alive = false; };
  }, []);
  return minIpc;
}
