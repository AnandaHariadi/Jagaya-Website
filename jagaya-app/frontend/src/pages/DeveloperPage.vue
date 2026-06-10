<script setup>
import { onMounted } from 'vue'
import {
  CheckCircleIcon, ChevronRightIcon, PlayIcon,
  PhoneIcon, EnvelopeIcon, MapPinIcon, GlobeAltIcon
} from '@heroicons/vue/24/outline'

/* ── Images ──────────────────────────────────────────── */
import heroImg from '../assets/about_hero.png'
import missionImg from '../assets/about_mission.png'
import techImg from '../assets/about_technology.png'
import impactImg from '../assets/about_impact.png'
import partnersImg from '../assets/about_partners.png'
import communityImg from '../assets/about_community.png'
import fotoImg from '../assets/foto.png'

/* Since AI Image Generation is currently hitting a strict global quota limit (Rate Limit 429),
   we use high-quality, highly relevant Unsplash placeholder images for the requested political/award scenarios. */
// Foto apresiasi presiden (diganti sesuai file lokal)
import penghargaanPresidenImg from '../assets/penghargaan-presiden.jpg'
import penghargaanKemanusiaanImg from '../assets/penghargaan-kemanusiaan.jpg'
import penghargaanInovasiAiImg from '../assets/penghargaan-inovasi-ai.jpg'

import penghargaanNasionalImg from '../assets/penghargaan-nasional.jpg'




const prabowoImg = penghargaanPresidenImg
const menteriImg = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80' // Award placeholder
const dprImg = 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80' // Parliament/Conference placeholder

const services = [
  { img: impactImg, title: 'Evakuasi Cepat', desc: 'Penanganan darurat 24/7 di seluruh wilayah terdampak.' },
  { img: techImg, title: 'Monitoring Satelit', desc: 'Pemantauan titik banjir secara real-time dari pusat komando.' },
  { img: missionImg, title: 'Distribusi Logistik', desc: 'Rantai pasok bantuan tepat sasaran dan transparan.' },
  { img: communityImg, title: 'Koordinasi Relawan', desc: 'Manajemen ribuan tenaga lapangan secara efisien.' },
  { img: partnersImg, title: 'Kemitraan Strategis', desc: 'Kolaborasi lintas lembaga untuk pemulihan optimal.' },
  { img: heroImg, title: 'Dukungan Medis', desc: 'Penanganan trauma dan kesehatan darurat.' }
]

const team = [
  { img: fotoImg, name: 'M. Ananda H.', role: 'Founder & Lead Developer' },
  { img: prabowoImg, name: 'Apresiasi Presiden', role: 'Penghargaan Inovasi Nasional' },
  { img: menteriImg, name: 'Dukungan Menteri', role: 'Kementerian Sosial RI' },
  { img: dprImg, name: 'Sidang Bersama DPR', role: 'Pemaparan RUU Kebencanaan' }
]

const awardsImg = {
  presiden: prabowoImg,
  kemanusiaan: penghargaanKemanusiaanImg,
  inovasiAi: penghargaanInovasiAiImg,
  nasional: penghargaanNasionalImg,
  // untuk item lain tetap memakai placeholder fotoImg
  default: fotoImg
}



const faqs = [
  { q: 'Bagaimana cara JAGAYA memantau banjir?', a: 'Kami menggunakan jaringan sensor IoT dan data satelit real-time.' },
  { q: 'Apakah sistem ini terintegrasi dengan BNPB?', a: 'Ya, sistem kami telah tersinkronisasi penuh dengan database pusat.' },
  { q: 'Bagaimana penyaluran donasi dilakukan?', a: 'Setiap rupiah tercatat dalam live-ledger yang dapat diakses publik.' },
  { q: 'Siapa saja yang bisa menjadi relawan?', a: 'Seluruh warga Indonesia yang telah lolos verifikasi dasar kami.' }
]

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
  }, { threshold: 0.1 })
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})
</script>

<template>
  <div class="transport-theme font-sans text-gray-800 bg-white overflow-x-hidden">
    
    <!-- 1. HERO SECTION -->
    <section class="hero-section relative h-[85vh] min-h-[600px] flex items-center">
      <div class="absolute inset-0 z-0">
        <img :src="heroImg" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-slate-900/80"></div>
      </div>
      
      <div class="container relative z-10 max-w-7xl mx-auto px-6 pt-24">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="text-white reveal">
            <div class="flex items-center gap-3 text-blue-600 font-bold tracking-widest text-xs uppercase mb-6">
              <span class="w-8 h-0.5 bg-blue-600"></span> Delivering Smarter Solutions
            </div>
            <h1 class="text-5xl lg:text-7xl font-bold leading-[1.1] mb-6">
              Manajemen Krisis Mudah,<br>Kapanpun Dibutuhkan!
            </h1>
            <p class="text-gray-300 text-lg mb-8 max-w-lg">
              Kami menangani evakuasi, distribusi logistik, dan koordinasi relawan dengan efisiensi tinggi, membuat pemulihan bencana menjadi lebih cepat dan terukur.
            </p>
            <div class="flex items-center gap-6">
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded font-bold transition-colors flex items-center gap-2">
                Selengkapnya <ChevronRightIcon class="w-5 h-5"/>
              </button>
              <div class="flex items-center gap-4">
                <div class="flex -space-x-4">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" class="w-12 h-12 rounded-full border-2 border-slate-900 object-cover"/>
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" class="w-12 h-12 rounded-full border-2 border-slate-900 object-cover"/>
                  <div class="w-12 h-12 rounded-full border-2 border-slate-900 bg-blue-600 flex items-center justify-center text-white font-bold text-xs">4.9★</div>
                </div>
                <div class="text-sm">
                  <p class="font-bold">Dipercaya Oleh</p>
                  <p class="text-gray-400">12k+ Pengguna</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="hidden lg:block relative reveal" style="transition-delay: 0.2s">
            <div class="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-lg max-w-sm ml-auto">
              <h3 class="text-xl font-bold text-white mb-4">Lacak Distribusi Bantuan</h3>
              <p class="text-gray-300 text-sm mb-6">Pantau pergerakan armada logistik secara real-time dari gudang ke titik pengungsian.</p>
              <div class="bg-white p-2 rounded flex">
                <input type="text" placeholder="Masukkan ID Resi..." class="flex-1 outline-none px-3 text-sm text-gray-800" />
                <button class="bg-blue-600 text-white px-6 py-3 rounded text-sm font-bold">Lacak</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. ABOUT US SECTION -->
    <section class="py-24">
      <div class="container max-w-7xl mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div class="reveal">
            <div class="flex items-center gap-3 text-blue-600 font-bold tracking-widest text-xs uppercase mb-4">
              <span class="w-8 h-0.5 bg-blue-600"></span> Tentang Kami
            </div>
            <h2 class="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
              Didorong oleh Kepercayaan,<br>Ditenagai oleh Inovasi.
            </h2>
            <p class="text-gray-500 mb-8 leading-relaxed">
              JAGAYA adalah ekosistem digital terpadu yang memadukan keahlian lapangan dan teknologi modern. Kami berdedikasi untuk memberikan ketenangan pikiran melalui sistem penanganan krisis yang transparan.
            </p>
            <div class="grid sm:grid-cols-2 gap-8 mb-8">
              <div class="flex gap-4">
                <div class="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0"><GlobeAltIcon class="w-6 h-6"/></div>
                <div>
                  <h4 class="font-bold text-slate-900">Jangkauan Luas</h4>
                  <p class="text-sm text-gray-500 mt-1">Mengcover seluruh 14 kecamatan Demak.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0"><PhoneIcon class="w-6 h-6"/></div>
                <div>
                  <h4 class="font-bold text-slate-900">Dukungan 24/7</h4>
                  <p class="text-sm text-gray-500 mt-1">Tim siaga penuh setiap saat.</p>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-6 pt-6 border-t border-gray-100">
              <button class="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded font-bold transition-colors">
                Baca Selengkapnya
              </button>
              <div class="flex items-center gap-4">
                <img :src="fotoImg" class="w-14 h-14 rounded-full object-cover border-2 border-blue-600"/>
                <div>
                  <p class="font-bold text-slate-900">M. Ananda Hariadi</p>
                  <p class="text-sm text-blue-600 font-bold">Founder JAGAYA</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="relative reveal" style="transition-delay: 0.2s">
            <div class="absolute -inset-4 bg-blue-100 rounded-lg transform rotate-3"></div>
            <img :src="fotoImg" class="relative w-full h-[600px] object-cover rounded-lg shadow-xl" />
            <div class="absolute top-1/2 -translate-y-1/2 -left-8 w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white animate-spin-slow">
              <div class="text-center">
                <p class="text-3xl font-black text-blue-600">5+</p>
                <p class="text-[10px] font-bold uppercase text-slate-900 tracking-wider">Tahun<br>Pengalaman</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. SERVICES GRID -->
    <section class="py-24 bg-slate-50">
      <div class="container max-w-7xl mx-auto px-6">
        <div class="text-center max-w-2xl mx-auto mb-16 reveal">
          <div class="flex items-center justify-center gap-3 text-blue-600 font-bold tracking-widest text-xs uppercase mb-4">
            <span class="w-8 h-0.5 bg-blue-600"></span> Layanan Kami <span class="w-8 h-0.5 bg-blue-600"></span>
          </div>
          <h2 class="text-4xl font-bold text-slate-900">Layanan Tanggap Darurat Terpercaya</h2>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 reveal">
          <div v-for="(srv, i) in services" :key="i" class="bg-white group cursor-pointer border border-gray-100 hover:border-blue-600 hover:shadow-xl transition-all duration-300">
            <div class="h-48 overflow-hidden relative">
              <img :src="srv.img" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div class="absolute bottom-0 right-0 bg-blue-600 w-12 h-12 flex items-center justify-center text-white">
                <ChevronRightIcon class="w-6 h-6" />
              </div>
            </div>
            <div class="p-8">
              <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{{ srv.title }}</h3>
              <p class="text-gray-500">{{ srv.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. SKILLS / PROGRESS BAR -->
    <section class="py-24">
      <div class="container max-w-7xl mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div class="reveal">
            <div class="flex items-center gap-3 text-blue-600 font-bold tracking-widest text-xs uppercase mb-4">
              <span class="w-8 h-0.5 bg-blue-600"></span> Keahlian Utama
            </div>
            <h2 class="text-4xl font-bold text-slate-900 mb-6">
              Sistem Yang Menjaga<br>Keselamatan Tetap Berjalan.
            </h2>
            <p class="text-gray-500 mb-10">
              JAGAYA memadukan keahlian teknis tingkat tinggi dengan pemahaman mendalam tentang logistik kebencanaan. Berikut adalah efisiensi metrik performa sistem kami:
            </p>
            
            <div class="space-y-8">
              <div>
                <div class="flex justify-between text-sm font-bold text-slate-900 mb-2">
                  <span>Kecepatan Perencanaan Logistik</span>
                  <span>95%</span>
                </div>
                <div class="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div class="bg-blue-600 h-full" style="width: 95%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm font-bold text-slate-900 mb-2">
                  <span>Akurasi Sistem Tracking Real-Time</span>
                  <span>98%</span>
                </div>
                <div class="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div class="bg-blue-600 h-full" style="width: 98%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm font-bold text-slate-900 mb-2">
                  <span>Keamanan Database & Transparansi</span>
                  <span>100%</span>
                </div>
                <div class="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div class="bg-slate-900 h-full" style="width: 100%"></div>
                </div>
              </div>
            </div>
            <button class="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded font-bold transition-colors">
              Pesan Layanan Sekarang
            </button>
          </div>
          
          <div class="relative reveal" style="transition-delay: 0.2s">
            <img :src="techImg" class="w-full rounded-lg shadow-xl" />
            <div class="absolute -bottom-8 -left-8 bg-white p-4 shadow-xl rounded-lg border border-gray-100">
              <img :src="impactImg" class="w-48 h-32 object-cover rounded" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. TIMELINE / PROCESS -->
    <section class="py-24 bg-white border-t border-gray-100">
      <div class="container max-w-7xl mx-auto px-6">
        <div class="text-center max-w-2xl mx-auto mb-20 reveal">
          <div class="flex items-center justify-center gap-3 text-blue-600 font-bold tracking-widest text-xs uppercase mb-4">
            <span class="w-8 h-0.5 bg-blue-600"></span> Proses Kerja <span class="w-8 h-0.5 bg-blue-600"></span>
          </div>
          <h2 class="text-4xl font-bold text-slate-900">Alur Manajemen Bencana Mulus</h2>
        </div>

        <div class="relative max-w-5xl mx-auto reveal">
          <!-- Connecting Line -->
          <div class="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-blue-100 border-t border-dashed border-blue-300"></div>
          
          <div class="grid md:grid-cols-4 gap-8">
            <div class="relative text-center">
              <div class="w-24 h-24 mx-auto bg-white border-4 border-blue-600 rounded-full flex items-center justify-center text-blue-600 relative z-10 mb-6 shadow-[0_0_0_8px_rgba(255,255,255,1)]">
                <PhoneIcon class="w-10 h-10" />
              </div>
              <h4 class="font-bold text-slate-900 mb-2">1. Laporan Masuk</h4>
              <p class="text-sm text-gray-500">Menerima informasi darurat via aplikasi atau call center.</p>
            </div>
            <div class="relative text-center">
              <div class="w-24 h-24 mx-auto bg-white border-4 border-blue-600 rounded-full flex items-center justify-center text-blue-600 relative z-10 mb-6 shadow-[0_0_0_8px_rgba(255,255,255,1)]">
                <MapPinIcon class="w-10 h-10" />
              </div>
              <h4 class="font-bold text-slate-900 mb-2">2. Verifikasi Lokasi</h4>
              <p class="text-sm text-gray-500">Pemetaan GIS untuk rute evakuasi teraman.</p>
            </div>
            <div class="relative text-center">
              <div class="w-24 h-24 mx-auto bg-white border-4 border-blue-600 rounded-full flex items-center justify-center text-blue-600 relative z-10 mb-6 shadow-[0_0_0_8px_rgba(255,255,255,1)]">
                <GlobeAltIcon class="w-10 h-10" />
              </div>
              <h4 class="font-bold text-slate-900 mb-2">3. Mobilisasi Tim</h4>
              <p class="text-sm text-gray-500">Pengiriman relawan dan armada logistik segera.</p>
            </div>
            <div class="relative text-center">
              <div class="w-24 h-24 mx-auto bg-blue-600 border-4 border-blue-600 rounded-full flex items-center justify-center text-white relative z-10 mb-6 shadow-[0_0_0_8px_rgba(255,255,255,1)]">
                <CheckCircleIcon class="w-10 h-10" />
              </div>
              <h4 class="font-bold text-slate-900 mb-2">4. Distribusi Selesai</h4>
              <p class="text-sm text-gray-500">Bantuan diterima dan diverifikasi di sistem.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. EXPERTS / AWARDS SECTION (The requested photos) -->
    <section class="py-24 bg-slate-50 border-t border-gray-100">
      <div class="container max-w-7xl mx-auto px-6">
        <div class="text-center max-w-2xl mx-auto mb-16 reveal">
          <div class="flex items-center justify-center gap-3 text-blue-600 font-bold tracking-widest text-xs uppercase mb-4">
            <span class="w-8 h-0.5 bg-blue-600"></span> Prestasi & Apresiasi <span class="w-8 h-0.5 bg-blue-600"></span>
          </div>
          <h2 class="text-4xl font-bold text-slate-900">Jejak Langkah & Penghargaan</h2>
          <p class="mt-4 text-gray-500 text-sm">Dedikasi dan inovasi berkelanjutan dalam memimpin transformasi sistem tanggap darurat nasional bersama para pemimpin negeri.</p>
        </div>

        <div class="marquee-container relative overflow-hidden reveal">
          <!-- Gradient Mask for smooth fade at edges -->
          <div class="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
          <div class="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
          
          <div class="marquee-content flex gap-8 w-max">
            <!-- 7 Items Clean Elegant Style -->
<div v-for="n in 7" :key="n" class="w-96 flex-shrink-0 bg-white p-6 border-2 border-slate-100 rounded-xl group hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden hover:border-blue-200">
              <div class="aspect-[4/3] overflow-hidden mb-6 relative rounded-xl bg-gray-50 shadow-inner">
<!-- Item ke-2 = Apresiasi Presiden RI -->
                <!-- Item ke-7 = Penghargaan Kemanusiaan -->
                <!-- Item ke-4 = Audiensi Internasional (biar tidak ada bintang terlihat) -->
                <img
                  :src="n === 2 ? awardsImg.presiden : n === 3 ? awardsImg.nasional : n === 4 ? awardsImg.inovasiAi : n === 7 ? awardsImg.kemanusiaan : awardsImg.default"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style="transform: scale(1.12)"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div class="text-center">
                <h4 class="font-black text-slate-900 text-lg leading-tight mb-2">
                  {{ ['Penghargaan Inovasi Nasional', 'Apresiasi Presiden RI', 'Audiensi Menteri Sosial', 'Pemaparan RUU DPR', 'Delegasi Internasional', 'Award Teknologi AI', 'Penghargaan Kemanusiaan'][n - 1] }}
                </h4>
                <p class="text-blue-600 text-sm font-bold tracking-widest uppercase">Tahun {{ 2026 - (n % 3) }}</p>
              </div>
            </div>
            
            <!-- Duplicated 7 Items for seamless looping -->
            <div v-for="n in 7" :key="'dup-'+n" class="w-96 flex-shrink-0 bg-white p-6 border-2 border-slate-100 rounded-xl group hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden hover:border-blue-200">
              <div class="aspect-[4/3] overflow-hidden mb-6 relative rounded-xl bg-gray-50 shadow-inner">
                <img :src="fotoImg" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div class="text-center">
                <h4 class="font-black text-slate-900 text-lg leading-tight mb-2">
                  {{ ['Penghargaan Inovasi Nasional', 'Apresiasi Presiden RI', 'Audiensi Menteri Sosial', 'Pemaparan RUU DPR', 'Delegasi Internasional', 'Award Teknologi AI', 'Penghargaan Kemanusiaan'][n - 1] }}
                </h4>
                <p class="text-blue-600 text-sm font-bold tracking-widest uppercase">Tahun {{ 2026 - (n % 3) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. FAQ -->
    <section class="py-24">
      <div class="container max-w-7xl mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-16 items-start">
          <div class="reveal">
            <div class="flex items-center gap-3 text-blue-600 font-bold tracking-widest text-xs uppercase mb-4">
              <span class="w-8 h-0.5 bg-blue-600"></span> FAQ
            </div>
            <h2 class="text-4xl font-bold text-slate-900 mb-8">Pertanyaan Umum</h2>
            
            <div class="space-y-4">
              <div v-for="(f, i) in faqs" :key="i" class="border border-gray-200 p-6 rounded cursor-pointer hover:border-blue-600 transition-colors">
                <div class="flex justify-between items-center">
                  <h4 class="font-bold text-slate-900">{{ f.q }}</h4>
                  <div class="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500">+</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="reveal" style="transition-delay: 0.2s">
            <img :src="missionImg" class="w-full rounded shadow-xl object-cover h-[500px]" />
          </div>
        </div>
      </div>
    </section>

    <!-- ████ FOOTER ████ -->
    <footer class="bg-gray-950 pt-16 pb-8 font-sans">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div class="md:col-span-1">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <span class="text-white font-bold text-xl">J</span>
              </div>
              <span class="text-xl font-black text-white">JAGAYA</span>
            </div>
            <p class="text-gray-500 text-[13px] font-medium leading-relaxed mb-6">
              Platform manajemen bencana terpadu untuk Kabupaten Demak. Menghubungkan pemerintah, relawan, dan masyarakat.
            </p>
            <div class="flex gap-3">
              <a href="#" class="w-9 h-9 rounded-xl bg-white/10 hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600 flex items-center justify-center transition-all"><PhoneIcon class="w-4 h-4 text-gray-400"/></a>
              <a href="#" class="w-9 h-9 rounded-xl bg-white/10 hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600 flex items-center justify-center transition-all"><EnvelopeIcon class="w-4 h-4 text-gray-400"/></a>
            </div>
          </div>
          <div>
            <p class="text-white font-black text-[13px] uppercase tracking-wider mb-4">Layanan</p>
            <ul class="space-y-3">
              <li v-for="l in ['Pemetaan Banjir','Distribusi Logistik','Koordinasi Relawan','Peringatan Dini']" :key="l">
                <a href="#" class="text-gray-500 hover:text-blue-400 text-[13px] font-medium transition-colors">{{ l }}</a>
              </li>
            </ul>
          </div>
          <div>
            <p class="text-white font-black text-[13px] uppercase tracking-wider mb-4">Menu Utama</p>
            <ul class="space-y-3">
              <li v-for="l in [{t:'Beranda',p:'/landing'},{t:'Dashboard',p:'/dashboard'},{t:'Donasi',p:'/donasi'},{t:'Relawan',p:'/relawan'}]" :key="l.p">
                <router-link :to="l.p" class="text-gray-500 hover:text-blue-400 text-[13px] font-medium transition-colors">{{ l.t }}</router-link>
              </li>
            </ul>
          </div>
          <div>
            <p class="text-white font-black text-[13px] uppercase tracking-wider mb-4">Newsletter</p>
            <p class="text-gray-500 text-[13px] mb-4">Dapatkan update terkini tentang kondisi bencana.</p>
            <div class="flex gap-2">
              <input type="email" placeholder="Email Address" class="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-600">
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-3 rounded flex items-center justify-center">
                <ArrowRightIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div class="border-t border-white/10 pt-8 text-center text-[12px] text-gray-600 font-medium">
          <p>© 2026 JAGAYA System. All Rights Reserved.</p>
        </div>
      </div>
    </footer>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700;800;900&display=swap');
.transport-theme { font-family: 'Jost', sans-serif; }
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
.animate-float-slow { animation: floatSlow 7s ease-in-out infinite; animation-delay:1.5s; }

/* Marquee Animation */
.marquee-content {
  animation: scroll-left 30s linear infinite;
}
.marquee-content:hover {
  animation-play-state: paused;
}
@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-50% - 12px)); } /* 50% width + half gap */
}

/* Transitions */
.fade-enter-active,.fade-leave-active{transition:opacity .25s ease}
.animate-spin-slow {
  animation: spin 8s linear infinite;
}
@keyframes spin {
  100% { transform: translate(0, -50%) rotate(360deg); }
}
</style>
