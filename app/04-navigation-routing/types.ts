// Type definitions untuk modul Navigation & Routing
export interface Buku {
  id: string;
  judul: string;
  penulis: string;
}

// Navigation params types (optional karena routing params bisa undefined)
export interface DetailBukuParams {
  judul?: string;
  penulis?: string;
}

export interface Mahasiswa {
  id: string;
  nama: string;
  nim: string;
}

export interface DetailMahasiswaParams {
  nama?: string;
  nim?: string;
}
