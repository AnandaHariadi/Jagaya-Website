<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import {
  CheckCircleIcon, ChevronRightIcon, PlayIcon,
  PhoneIcon, EnvelopeIcon, MapPinIcon, GlobeAltIcon,
  ArrowRightIcon, XMarkIcon, PlusIcon, MinusIcon,
  BuildingOffice2Icon, UserGroupIcon, GiftIcon, ClockIcon,
  ShieldCheckIcon, CpuChipIcon, SignalIcon, BoltIcon
} from '@heroicons/vue/24/outline'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LCircleMarker, LPopup } from '@vue-leaflet/vue-leaflet'

/* ── Images ──────────────────────────────────────────── */
import heroImg from '../assets/about_hero.png'
import missionImg from '../assets/about_mission.png'
import techImg from '../assets/about_technology.png'
import impactImg from '../assets/about_impact.png'
import partnersImg from '../assets/about_partners.png'
import communityImg from '../assets/about_community.png'
import fotoImg from '../assets/foto.png'
import logoImg from '../assets/logo-jagaya.png'

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

const awards = [
  { img: prabowoImg, title: 'Apresiasi Presiden RI', year: '2025' },
  { img: penghargaanKemanusiaanImg, title: 'Penghargaan Kemanusiaan', year: '2024' },
]



const faqs = [
  { q: 'Bagaimana cara JAGAYA memantau banjir?', a: 'Kami menggunakan jaringan sensor IoT dan data satelit real-time yang tersebar di titik-titik rawan, dipadukan dengan laporan warga yang terverifikasi.' },
  { q: 'Apakah sistem ini terintegrasi dengan BNPB?', a: 'Ya, sistem kami telah tersinkronisasi penuh dengan database pusat BNPB dan BPBD Jawa Tengah untuk koordinasi lintas lembaga.' },
  { q: 'Bagaimana penyaluran donasi dilakukan?', a: 'Setiap rupiah tercatat dalam live-ledger yang dapat diakses publik, sehingga Anda dapat melacak ke mana bantuan disalurkan secara transparan.' },
  { q: 'Siapa saja yang bisa menjadi relawan?', a: 'Seluruh warga Indonesia yang telah lolos verifikasi dasar kami dapat bergabung, baik untuk evakuasi, medis, maupun logistik.' }
]

/* ── FAQ ACCORDION ──────────────────────────────── */
const openFaq = ref(0)
const toggleFaq = (i) => { openFaq.value = openFaq.value === i ? null : i }

/* ── LIGHTBOX PENGHARGAAN ───────────────────────── */
const lightboxImg = ref(null)
const lightboxTitle = ref('')
const openLightbox = (img, title) => { lightboxImg.value = img; lightboxTitle.value = title }
const closeLightbox = () => { lightboxImg.value = null }

/* ── TAB LAYANAN INTERAKTIF ─────────────────────── */
const activeService = ref(0)

/* ── COUNTER STATISTIK ──────────────────────────── */
const stats = ref([
  { key: 'kecamatan', label: 'Kecamatan Tercakup', target: 14,   suffix: '',  icon: BuildingOffice2Icon, val: 0 },
  { key: 'relawan',   label: 'Relawan Aktif',       target: 1200, suffix: '+', icon: UserGroupIcon,       val: 0 },
  { key: 'bantuan',   label: 'Paket Bantuan',       target: 8452, suffix: '+', icon: GiftIcon,            val: 0 },
  { key: 'tahun',     label: 'Tahun Pengalaman',    target: 5,    suffix: '+', icon: ClockIcon,           val: 0 },
])
let countersStarted = false
const animateCounters = () => {
  if (countersStarted) return
  countersStarted = true
  stats.value.forEach(s => {
    let c = 0; const step = s.target / 80
    const timer = setInterval(() => {
      c = Math.min(c + step, s.target)
      s.val = Math.floor(c)
      if (c >= s.target) clearInterval(timer)
    }, 16)
  })
}

/* ── COMPANY PROFILE DATA ───────────────────────── */
const misi = [
  'Menyediakan data lapangan real-time untuk pengambilan keputusan darurat yang cepat dan akurat.',
  'Menjamin transparansi penuh atas setiap donasi dan distribusi bantuan kepada publik.',
  'Memberdayakan relawan dan masyarakat melalui koordinasi satu pintu yang efisien.',
]
const values = [
  { icon: BuildingOffice2Icon, title: 'Tanggap', desc: 'Respons cepat di setiap detik krisis, 24 jam tanpa henti.' },
  { icon: CheckCircleIcon, title: 'Transparan', desc: 'Setiap rupiah dan bantuan tercatat serta dapat diaudit publik.' },
  { icon: UserGroupIcon, title: 'Kolaboratif', desc: 'Menyatukan pemerintah, relawan, dan warga dalam satu ekosistem.' },
  { icon: GlobeAltIcon, title: 'Inklusif', desc: 'Mudah digunakan oleh semua kalangan dan segala usia.' },
]
const milestones = [
  { year: '2026', title: 'Peluncuran Platform', desc: 'Peluncuran resmi JAGAYA sebagai platform tanggap bencana digital terpadu untuk Kabupaten Demak.', icon: BoltIcon },
  { year: '2027', title: 'Integrasi Sensor IoT', desc: 'Pemasangan 50+ sensor ketinggian air real-time di titik rawan dan integrasi data satelit.', icon: SignalIcon },
  { year: '2028', title: 'AI Prediksi Bencana', desc: 'Implementasi model AI untuk prediksi banjir 72 jam sebelum kejadian dengan akurasi 95%.', icon: CpuChipIcon },
  { year: '2029', title: 'Ekspansi Nasional', desc: 'Perluasan layanan ke 10 kabupaten rawan bencana di Jawa Tengah dan Jawa Timur.', icon: GlobeAltIcon },
  { year: '2030', title: 'Ekosistem Penuh', desc: 'Ekosistem kebencanaan nasional: drone rescue, digital twin kota, dan pusat komando terpadu.', icon: ShieldCheckIcon },
]

/* ── LIVE MAP · KONDISI TERKINI DEMAK ───────────── */
const mapZoom = ref(11)
const mapCenter = ref([-6.8953, 110.6386]) // pusat Kabupaten Demak
const mapOptions = { zoomControl: false, scrollWheelZoom: false, attributionControl: false }
const areaKondisi = ref([
  { id: 1, nama: 'Sayung',      lat: -6.9320, lng: 110.4760, status: 'Kritis',   tma: '120 cm', warga: 3200 },
  { id: 2, nama: 'Karanganyar', lat: -6.9180, lng: 110.6080, status: 'Kritis',   tma: '95 cm',  warga: 2800 },
  { id: 3, nama: 'Mijen',       lat: -6.8120, lng: 110.7350, status: 'Waspada',  tma: '60 cm',  warga: 1500 },
  { id: 4, nama: 'Gajah',       lat: -6.8900, lng: 110.7700, status: 'Waspada',  tma: '45 cm',  warga: 980  },
  { id: 5, nama: 'Demak Kota',  lat: -6.8907, lng: 110.6370, status: 'Aman',     tma: '15 cm',  warga: 600  },
  { id: 6, nama: 'Wonosalam',   lat: -6.9540, lng: 110.6720, status: 'Aman',     tma: '10 cm',  warga: 300  },
])
const statusColor = (s) => s === 'Kritis' ? '#ef4444' : s === 'Waspada' ? '#f59e0b' : '#22c55e'

/* ── LIVE CLOCK ─────────────────────────────────── */
const liveTime = ref('--:--:--')
let clockTimer = null
const tickClock = () => {
  liveTime.value = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

onMounted(() => {
  tickClock()
  clockTimer = setInterval(tickClock, 1000)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        if (e.target.id === 'dev-stats') animateCounters()
      }
    })
  }, { threshold: 0.1 })
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})
onUnmounted(() => { if (clockTimer) clearInterval(clockTimer) })

const showFounderModal = ref(false)
</script>

<template>
  <div class="transport-theme font-sans text-gray-800 bg-white overflow-x-hidden">
    
    <!-- 1. HERO SECTION — Light theme with animated mascot & gradients -->
    <section class="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
      <!-- layered backdrop (white + orange/red gradients) -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 opacity-[0.4]" style="background-image:radial-gradient(#f97316 1px,transparent 1px);background-size:40px 40px;-webkit-mask-image:radial-gradient(ellipse 100% 100% at 50% 50%,#000,transparent);mask-image:radial-gradient(ellipse 100% 100% at 50% 50%,#000,transparent)"></div>
        <div class="absolute -top-40 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-orange-400/30 to-red-500/20 blur-[100px] rounded-full animate-pulse" style="animation-duration: 4s;"></div>
        <div class="absolute -bottom-40 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-red-500/20 to-orange-400/20 blur-[100px] rounded-full animate-pulse" style="animation-duration: 5s; animation-delay: 2s;"></div>
      </div>

      <!-- Mascot Animation -->
      <div class="absolute right-0 top-1/2 z-20" style="animation: mascotPop 8s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;">
        <div class="relative w-40 h-56 md:w-64 md:h-[350px] drop-shadow-[0_20px_30px_rgba(249,115,22,0.3)]" style="animation: float 4s ease-in-out infinite;">
          <svg viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full drop-shadow-[0_20px_30px_rgba(249,115,22,0.2)]">
            <defs>
              <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#f97316" stop-opacity="0.25"/>
                <stop offset="100%" stop-color="#f97316" stop-opacity="0"/>
              </radialGradient>
            </defs>

            <!-- Background Glow -->
            <circle cx="150" cy="180" r="140" fill="url(#glow)" />

            <!-- Thruster Flames (Animated) -->
            <g class="thruster-flames">
              <path d="M125 320 Q 150 380 175 320 Z" fill="#ef4444" />
              <path d="M135 320 Q 150 360 165 320 Z" fill="#facc15" />
            </g>

            <!-- Left Arm -->
            <path d="M95 210 Q 40 220 55 270" stroke="#cbd5e1" stroke-width="14" stroke-linecap="round" fill="none" />
            <circle cx="55" cy="270" r="14" fill="white" stroke="#f97316" stroke-width="6"/>

            <!-- Right Arm (Waving) -->
            <g class="robot-arm-wave" style="transform-origin: 205px 210px;">
              <path d="M205 210 Q 260 190 260 140" stroke="#cbd5e1" stroke-width="14" stroke-linecap="round" fill="none" />
              <circle cx="260" cy="140" r="14" fill="white" stroke="#f97316" stroke-width="6"/>
            </g>

            <!-- Body -->
            <path d="M100 170 L200 170 Q210 170 210 180 L195 310 Q193 320 183 320 L117 320 Q107 320 105 310 L90 180 Q90 170 100 170 Z" fill="white" stroke="#f97316" stroke-width="8"/>
            
            <!-- Body Screen -->
            <rect x="120" y="195" width="60" height="45" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="4"/>
            <!-- Heart on screen -->
            <path d="M150 212 C150 212 145 208 140 208 C135 208 131 212 131 217 C131 224 150 233 150 233 C150 233 169 224 169 217 C169 212 165 208 160 208 C155 208 150 212 150 212 Z" fill="#ef4444" class="animate-pulse" />
            
            <!-- Core/Belt -->
            <rect x="125" y="260" width="50" height="15" rx="7.5" fill="#f97316"/>
            <circle cx="135" cy="267.5" r="4" fill="white"/>
            <circle cx="150" cy="267.5" r="4" fill="white"/>
            <circle cx="165" cy="267.5" r="4" fill="white"/>

            <!-- Neck -->
            <rect x="140" y="150" width="20" height="25" fill="#cbd5e1" />

            <!-- Head -->
            <rect x="85" y="60" width="130" height="95" rx="35" fill="white" stroke="#f97316" stroke-width="8"/>
            
            <!-- Face Screen -->
            <rect x="100" y="75" width="100" height="65" rx="20" fill="#0f172a" />
            
            <!-- Eyes (Happy Curve) -->
            <path d="M120 110 Q 130 95 140 110" stroke="#38bdf8" stroke-width="7" stroke-linecap="round" fill="none" />
            <path d="M160 110 Q 170 95 180 110" stroke="#38bdf8" stroke-width="7" stroke-linecap="round" fill="none" />
            
            <!-- Cheeks -->
            <circle cx="115" cy="120" r="6" fill="#ef4444" opacity="0.6"/>
            <circle cx="185" cy="120" r="6" fill="#ef4444" opacity="0.6"/>

            <!-- Ear/Side Nodes -->
            <rect x="75" y="90" width="10" height="35" rx="5" fill="#f97316"/>
            <rect x="215" y="90" width="10" height="35" rx="5" fill="#f97316"/>

            <!-- Antenna -->
            <line x1="150" y1="60" x2="150" y2="25" stroke="#f97316" stroke-width="8" stroke-linecap="round"/>
            <!-- Blinking Red Light -->
            <circle cx="150" cy="20" r="12" fill="#ef4444" class="animate-ping" style="transform-origin: 150px 20px; animation-duration: 2s;"/>
            <circle cx="150" cy="20" r="12" fill="#ef4444"/>
            <circle cx="153" cy="17" r="4" fill="white" opacity="0.7"/>

          </svg>
        </div>
      </div>

      <div class="container relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 text-center">
        <div class="reveal max-w-4xl mx-auto">
          <!-- badge -->
          <div class="inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 mb-8 rounded-full bg-white border border-orange-200 shadow-sm hover:scale-105 transition-transform cursor-default">
            <span class="px-2.5 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-black uppercase tracking-widest shadow-sm">v2026</span>
            <span class="text-[12px] font-bold tracking-wide text-orange-600">Platform Tanggap Bencana Cerdas</span>
          </div>
          <!-- headline -->
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.04] tracking-tight mb-7 drop-shadow-sm">
            Teknologi untuk<br>Kemanusiaan <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Demak</span>.
          </h1>
          <!-- subtitle -->
          <p class="text-slate-600 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto mb-10">
            Ekosistem digital tanggap bencana generasi 2026 — didukung AI, sensor IoT, dan data real-time yang menyatukan pemerintah, relawan, dan masyarakat dalam satu komando.
          </p>
          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#visi-misi" class="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 inline-flex items-center justify-center gap-2">
              Kenali Kami <ChevronRightIcon class="w-5 h-5"/>
            </a>
            <a href="#kondisi-demak" class="w-full sm:w-auto px-8 py-4 rounded-full bg-white border-2 border-orange-100 text-orange-600 font-bold transition-all hover:border-orange-500 hover:bg-orange-50 inline-flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
              Lihat Kondisi Demak
            </a>
          </div>
        </div>

        <!-- elegant stat module (light theme) -->
        <div class="reveal mt-16 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px rounded-3xl overflow-hidden bg-slate-200 border border-slate-200 shadow-xl shadow-orange-500/5 relative z-30" style="transition-delay:0.15s">
          <div v-for="(s, i) in [
            { v: '14', sub: 'Kecamatan' },
            { v: '24/7', sub: 'Pemantauan' },
            { v: '&lt;5 mnt', sub: 'Respons Darurat' },
            { v: '4.9', sub: 'Penilaian Pengguna' }
          ]" :key="i" class="bg-white px-6 py-8 hover:bg-orange-50 transition-colors group">
            <p class="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 tabular-nums transform group-hover:scale-110 transition-transform origin-bottom" v-html="s.v"></p>
            <p class="text-[11px] font-bold uppercase tracking-widest text-slate-500 mt-2">{{ s.sub }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. ABOUT US SECTION — Bento -->
    <section class="relative py-28 lg:py-32 overflow-hidden bg-slate-50">
      <!-- faint grid texture -->
      <div class="absolute inset-0 pointer-events-none" style="background-image:linear-gradient(#e2e8f0 1px,transparent 1px),linear-gradient(90deg,#e2e8f0 1px,transparent 1px);background-size:46px 46px;-webkit-mask-image:radial-gradient(ellipse 75% 55% at 50% 38%,#000,transparent);mask-image:radial-gradient(ellipse 75% 55% at 50% 38%,#000,transparent)"></div>

      <div class="container max-w-7xl mx-auto px-6 relative z-10">
        <!-- header -->
        <div class="max-w-3xl mx-auto mb-16 text-center reveal">
          <div class="flex items-center justify-center gap-3 text-orange-600 font-bold tracking-[0.25em] text-xs uppercase mb-5">
            Tentang Kami
          </div>
          <h2 class="text-4xl lg:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight">
            Lebih dekat dengan orang<br class="hidden sm:block"> di balik <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">JAGAYA</span>.
          </h2>
        </div>

        <!-- bento grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 reveal" style="transition-delay:0.1s">

          <!-- founder photo (tall) -->
          <div @click="showFounderModal = true" class="lg:col-span-5 lg:row-span-2 relative rounded-[28px] overflow-hidden min-h-[360px] group cursor-pointer shadow-xl hover:shadow-orange-500/20 transition-all">
            <img :src="fotoImg" class="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/15 to-transparent"></div>
            <span class="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur text-white text-[11px] font-bold uppercase tracking-widest border border-white/25">Founder</span>
            <div class="absolute bottom-0 left-0 p-7">
              <p class="text-2xl font-bold text-white">M. Ananda Hariadi</p>
              <p class="text-orange-400 font-semibold text-sm mt-1">Pendiri &amp; Lead Developer</p>
            </div>
          </div>

          <!-- quote / intro (white) -->
          <div class="lg:col-span-7 bg-white rounded-[28px] border border-slate-100 p-9 lg:p-11 flex flex-col justify-center shadow-[0_20px_50px_-30px_rgba(15,23,42,0.3)]">
            <p class="text-2xl lg:text-[1.7rem] font-medium text-slate-800 leading-snug tracking-tight">
              <span class="text-orange-500 font-serif text-4xl leading-none mr-1 align-[-0.15em]">“</span>Teknologi harus hadir paling cepat justru saat manusia paling membutuhkannya.”
            </p>
            <p class="text-gray-500 mt-6 leading-relaxed">
              JAGAYA lahir dari satu keyakinan sederhana: setiap detik berarti dalam bencana. Kami menyatukan data lapangan, sensor IoT, dan relawan ke dalam satu sistem yang transparan untuk Kabupaten Demak.
            </p>
            <a href="#visi-misi" class="mt-7 inline-flex items-center gap-2 text-slate-900 font-bold text-sm self-start border-b-2 border-orange-500 pb-1 hover:gap-3 transition-all">
              Baca kisah selengkapnya <ArrowRightIcon class="w-4 h-4 text-orange-500"/>
            </a>
          </div>

          <!-- dark mission card -->
          <div class="lg:col-span-4 relative rounded-[28px] bg-gradient-to-br from-orange-500 to-red-600 p-8 overflow-hidden text-white flex flex-col justify-between min-h-[210px]">
            <div class="absolute -bottom-12 -right-12 w-44 h-44 rounded-full bg-white/20 blur-2xl"></div>
            <ShieldCheckIcon class="w-9 h-9 text-white/80 relative"/>
            <div class="relative">
              <p class="text-[11px] font-black uppercase tracking-widest text-white/70 mb-2">Misi Kami</p>
              <p class="text-[15px] font-semibold leading-relaxed text-white">Menjadi tulang punggung digital penanggulangan bencana yang menyelamatkan lebih banyak nyawa.</p>
            </div>
          </div>

          <!-- stat card -->
          <div class="lg:col-span-3 bg-white rounded-[28px] border border-slate-100 p-8 flex flex-col justify-center shadow-[0_20px_50px_-30px_rgba(15,23,42,0.3)]">
            <p class="text-6xl font-black text-slate-900 leading-none tracking-tight">14</p>
            <p class="text-sm font-semibold text-gray-500 mt-3 leading-snug">Kecamatan se-Demak terpantau penuh</p>
            <div class="mt-4 h-1 w-12 rounded-full bg-orange-500"></div>
          </div>
        </div>

        <!-- feature row -->
        <div class="grid sm:grid-cols-3 gap-5 mt-5 reveal" style="transition-delay:0.2s">
          <div v-for="(f, i) in [
            { icon: GlobeAltIcon, t: 'Jangkauan Luas', d: 'Mencakup seluruh 14 kecamatan Kabupaten Demak.' },
            { icon: ClockIcon, t: 'Dukungan 24/7', d: 'Tim komando siaga penuh di setiap detik krisis.' },
            { icon: CheckCircleIcon, t: 'Transparan', d: 'Tersinkronisasi penuh dengan BNPB & BPBD Jateng.' }
          ]" :key="i" class="bg-white rounded-2xl border border-slate-100 p-6 flex items-start gap-4 hover:border-orange-200 transition-colors shadow-[0_20px_50px_-35px_rgba(15,23,42,0.35)]">
            <div class="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <component :is="f.icon" class="w-5 h-5"/>
            </div>
            <div>
              <h4 class="font-bold text-slate-900">{{ f.t }}</h4>
              <p class="text-sm text-gray-500 mt-1 leading-relaxed">{{ f.d }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- 2b. STATS COUNTER STRIP -->
    <section id="dev-stats" class="py-16 bg-white border-t border-gray-100 reveal">
      <div class="container max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="s in stats" :key="s.key" class="flex items-center gap-4 p-6 rounded-xl bg-slate-50 border border-gray-100 hover:border-orange-300 hover:shadow-lg transition-all">
            <div class="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
              <component :is="s.icon" class="w-7 h-7" />
            </div>
            <div>
              <p class="text-3xl font-black text-slate-900 leading-none tabular-nums">{{ s.val.toLocaleString('id') }}{{ s.suffix }}</p>
              <p class="text-sm text-gray-500 font-semibold mt-1">{{ s.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2c. VISI & MISI -->
    <section id="visi-misi" class="py-24 bg-white reveal">
      <div class="container max-w-7xl mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div class="relative">
            <div class="absolute -inset-4 bg-orange-100 rounded-2xl rotate-2"></div>
            <img :src="techImg" class="relative w-full h-[420px] object-cover rounded-2xl shadow-xl" />
            <div class="absolute -bottom-6 -right-6 bg-slate-900 text-white p-6 rounded-2xl shadow-2xl max-w-[200px]">
              <p class="text-3xl font-black text-orange-500">100%</p>
              <p class="text-xs font-bold uppercase tracking-wider mt-1">Komitmen untuk Demak</p>
            </div>
          </div>
          <div>
            <div class="flex items-center gap-3 text-orange-500 font-bold tracking-widest text-xs uppercase mb-4">
              Visi & Misi
            </div>
            <h2 class="text-4xl font-bold text-slate-900 mb-5">Arah & Tujuan Kami</h2>
            <div class="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl mb-8">
              <p class="text-[11px] font-black uppercase tracking-widest text-orange-600 mb-2">Visi</p>
              <p class="text-lg font-bold text-slate-800 leading-relaxed">Menjadi tulang punggung digital penanggulangan bencana yang menyelamatkan lebih banyak nyawa melalui kecepatan dan transparansi.</p>
            </div>
            <p class="text-[11px] font-black uppercase tracking-widest text-orange-600 mb-3">Misi</p>
            <ul class="space-y-3">
              <li v-for="(m, i) in misi" :key="i" class="flex items-start gap-3">
                <CheckCircleIcon class="w-6 h-6 text-orange-500 shrink-0 mt-0.5" />
                <span class="text-gray-600 leading-relaxed">{{ m }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 2d. NILAI PERUSAHAAN -->
    <section class="py-24 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 relative overflow-hidden reveal">
      <div class="absolute inset-0 opacity-[0.08]" style="background-image:radial-gradient(circle at 1px 1px, white 1px, transparent 0);background-size:26px 26px"></div>
      <div class="container max-w-7xl mx-auto px-6 relative">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <div class="inline-flex items-center justify-center gap-3 text-orange-500 font-bold tracking-widest text-xs uppercase mb-4">
            Nilai Perusahaan
          </div>
          <h2 class="text-4xl font-bold text-white">Prinsip yang Kami Pegang</h2>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(v, i) in values" :key="i" class="bg-white/15 border border-white/20 rounded-2xl p-7 hover:bg-white/25 hover:-translate-y-1 transition-all backdrop-blur-sm">
            <div class="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-5 shadow-lg shadow-black/10">
              <component :is="v.icon" class="w-7 h-7 text-white" />
            </div>
            <h3 class="text-xl font-bold text-white mb-2">{{ v.title }}</h3>
            <p class="text-white/80 text-sm leading-relaxed">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 2e. MILESTONE TIMELINE — Premium Roadmap (Light Theme) -->
    <section class="py-28 bg-gradient-to-b from-white via-orange-50/50 to-white relative overflow-hidden reveal">
      <!-- Ambient glow effects -->
      <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-red-500/10 rounded-full blur-[120px]"></div>
      <div class="absolute inset-0 opacity-[0.03]" style="background-image:radial-gradient(circle at 1px 1px, #f97316 1px, transparent 0);background-size:32px 32px"></div>

      <div class="container max-w-7xl mx-auto px-6 relative z-10">
        <!-- Header -->
        <div class="text-center max-w-2xl mx-auto mb-20">
          <div class="inline-flex items-center justify-center gap-3 text-orange-500 font-bold tracking-widest text-xs uppercase mb-4">
            Roadmap 2026 — 2030
          </div>
          <h2 class="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            Jejak Langkah <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">JAGAYA</span>
          </h2>
          <p class="text-gray-500 mt-4 text-sm leading-relaxed max-w-lg mx-auto">
            Lima tahun transformasi digital penanggulangan bencana — dari peluncuran platform hingga ekosistem nasional.
          </p>
        </div>

        <!-- Horizontal Timeline (Desktop) -->
        <div class="hidden lg:block relative">
          <!-- Animated gradient line -->
          <div class="absolute top-[72px] left-0 right-0 h-[3px]">
            <div class="w-full h-full bg-gradient-to-r from-transparent via-orange-200 to-transparent rounded-full"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-full timeline-glow-line"></div>
          </div>

          <div class="grid grid-cols-5 gap-6 relative">
            <div v-for="(ms, i) in milestones" :key="i"
              class="group relative flex flex-col items-center text-center"
              :style="{ animationDelay: i * 150 + 'ms' }">

              <!-- Glowing dot -->
              <div class="relative z-20 mb-8">
                <div class="absolute -inset-3 rounded-full bg-gradient-to-br from-orange-500 to-red-600 opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700"></div>
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/30 ring-4 ring-white group-hover:scale-125 transition-transform duration-500 relative">
                  <div class="w-3 h-3 rounded-full bg-white"></div>
                </div>
                <!-- Connecting pulse -->
                <div class="absolute inset-0 rounded-full bg-orange-500/40 animate-ping" style="animation-duration: 3s;" :style="{ animationDelay: i * 600 + 'ms' }"></div>
              </div>

              <!-- Year badge -->
              <div class="inline-flex px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-black shadow-lg shadow-orange-500/20 mb-5 group-hover:shadow-orange-500/40 group-hover:scale-110 transition-all duration-500">
                {{ ms.year }}
              </div>

              <!-- Card -->
              <div class="bg-white border border-gray-100 rounded-2xl p-6 hover:border-orange-500/30 hover:-translate-y-2 transition-all duration-500 w-full shadow-sm group-hover:shadow-2xl group-hover:shadow-orange-500/15">
                <div class="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4 mx-auto group-hover:bg-orange-100 transition-colors">
                  <component :is="ms.icon" class="w-6 h-6 text-orange-500" />
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2 leading-tight">{{ ms.title }}</h3>
                <p class="text-gray-500 text-xs leading-relaxed">{{ ms.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Vertical Timeline (Mobile) -->
        <div class="lg:hidden relative pl-8">
          <!-- Vertical gradient line -->
          <div class="absolute left-[15px] top-0 bottom-0 w-[3px] bg-gradient-to-b from-orange-500 via-red-500 to-orange-500/30 rounded-full"></div>

          <div class="space-y-10">
            <div v-for="(ms, i) in milestones" :key="i" class="relative group">
              <!-- Dot -->
              <div class="absolute -left-[17.5px] top-1 w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/30 ring-4 ring-white z-10">
                <div class="w-2.5 h-2.5 rounded-full bg-white"></div>
              </div>

              <!-- Card -->
              <div class="bg-white border border-gray-100 rounded-2xl p-6 hover:border-orange-500/30 transition-all duration-500 ml-6 shadow-sm hover:shadow-xl hover:shadow-orange-500/10">
                <div class="flex items-center gap-3 mb-3">
                  <span class="px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-black shadow-lg shadow-orange-500/20">{{ ms.year }}</span>
                  <div class="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
                    <component :is="ms.icon" class="w-5 h-5 text-orange-500" />
                  </div>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-1">{{ ms.title }}</h3>
                <p class="text-gray-500 text-xs leading-relaxed">{{ ms.desc }}</p>
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
          <div class="flex items-center justify-center gap-3 text-orange-500 font-bold tracking-widest text-xs uppercase mb-4">
            Layanan Kami
          </div>
          <h2 class="text-4xl font-bold text-slate-900">Layanan Tanggap Darurat Terpercaya</h2>
        </div>
        
        <div class="grid lg:grid-cols-12 gap-8 items-stretch reveal">
          <!-- Tab buttons -->
          <div class="lg:col-span-5 flex flex-col gap-3">
            <button
              v-for="(srv, i) in services" :key="i"
              @click="activeService = i"
              class="text-left px-5 py-4 rounded-xl flex items-center gap-4 border transition-all duration-300"
              :class="activeService === i
                ? 'bg-white border-orange-500 shadow-lg shadow-orange-500/10 scale-[1.02]'
                : 'bg-white/60 border-gray-100 hover:border-orange-200 hover:bg-white'"
            >
              <div class="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                <img :src="srv.img" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="font-bold text-slate-900 text-[15px] truncate">{{ srv.title }}</h4>
                <p class="text-xs text-gray-500 mt-0.5 line-clamp-1">{{ srv.desc }}</p>
              </div>
              <ChevronRightIcon v-if="activeService === i" class="w-5 h-5 text-orange-500 shrink-0" />
            </button>
          </div>

          <!-- Detail panel -->
          <div class="lg:col-span-7">
            <transition name="dev-fade" mode="out-in">
              <div :key="activeService" class="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xl h-full">
                <div class="h-72 relative overflow-hidden">
                  <img :src="services[activeService].img" class="w-full h-full object-cover" />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div class="absolute bottom-6 left-6 right-6 text-white">
                    <h3 class="text-2xl font-bold mb-2">{{ services[activeService].title }}</h3>
                    <p class="text-gray-200 text-sm">{{ services[activeService].desc }}</p>
                  </div>
                </div>
                <div class="p-8 flex items-center justify-between gap-4">
                  <p class="text-sm text-gray-500">Layanan {{ activeService + 1 }} dari {{ services.length }}</p>
                  <button class="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold transition-colors">
                    Selengkapnya <ArrowRightIcon class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. SKILLS / PROGRESS BAR -->
    <section class="py-24">
      <div class="container max-w-7xl mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div class="reveal">
            <div class="flex items-center gap-3 text-orange-500 font-bold tracking-widest text-xs uppercase mb-4">
              Keahlian Utama
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
                  <div class="bg-orange-500 h-full" style="width: 95%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm font-bold text-slate-900 mb-2">
                  <span>Akurasi Sistem Tracking Real-Time</span>
                  <span>98%</span>
                </div>
                <div class="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div class="bg-orange-500 h-full" style="width: 98%"></div>
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
            <button class="mt-10 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded font-bold transition-colors">
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
          <div class="flex items-center justify-center gap-3 text-orange-500 font-bold tracking-widest text-xs uppercase mb-4">
            Proses Kerja
          </div>
          <h2 class="text-4xl font-bold text-slate-900">Alur Manajemen Bencana Mulus</h2>
        </div>

        <div class="relative max-w-5xl mx-auto reveal">
          <!-- Connecting Line -->
          <div class="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-orange-100 border-t border-dashed border-orange-300"></div>
          
          <div class="grid md:grid-cols-4 gap-8">
            <div class="relative text-center">
              <div class="w-24 h-24 mx-auto bg-white border-4 border-orange-500 rounded-full flex items-center justify-center text-orange-500 relative z-10 mb-6 shadow-[0_0_0_8px_rgba(255,255,255,1)]">
                <PhoneIcon class="w-10 h-10" />
              </div>
              <h4 class="font-bold text-slate-900 mb-2">1. Laporan Masuk</h4>
              <p class="text-sm text-gray-500">Menerima informasi darurat via aplikasi atau call center.</p>
            </div>
            <div class="relative text-center">
              <div class="w-24 h-24 mx-auto bg-white border-4 border-orange-500 rounded-full flex items-center justify-center text-orange-500 relative z-10 mb-6 shadow-[0_0_0_8px_rgba(255,255,255,1)]">
                <MapPinIcon class="w-10 h-10" />
              </div>
              <h4 class="font-bold text-slate-900 mb-2">2. Verifikasi Lokasi</h4>
              <p class="text-sm text-gray-500">Pemetaan GIS untuk rute evakuasi teraman.</p>
            </div>
            <div class="relative text-center">
              <div class="w-24 h-24 mx-auto bg-white border-4 border-orange-500 rounded-full flex items-center justify-center text-orange-500 relative z-10 mb-6 shadow-[0_0_0_8px_rgba(255,255,255,1)]">
                <GlobeAltIcon class="w-10 h-10" />
              </div>
              <h4 class="font-bold text-slate-900 mb-2">3. Mobilisasi Tim</h4>
              <p class="text-sm text-gray-500">Pengiriman relawan dan armada logistik segera.</p>
            </div>
            <div class="relative text-center">
              <div class="w-24 h-24 mx-auto bg-orange-500 border-4 border-orange-500 rounded-full flex items-center justify-center text-white relative z-10 mb-6 shadow-[0_0_0_8px_rgba(255,255,255,1)]">
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
          <div class="flex items-center justify-center gap-3 text-orange-500 font-bold tracking-widest text-xs uppercase mb-4">
            Prestasi & Apresiasi
          </div>
          <h2 class="text-4xl font-bold text-slate-900">Jejak Langkah & Penghargaan</h2>
          <p class="mt-4 text-gray-500 text-sm">Dedikasi dan inovasi berkelanjutan dalam memimpin transformasi sistem tanggap darurat nasional bersama para pemimpin negeri.</p>
        </div>

        <div class="marquee-container relative overflow-hidden reveal">
          <!-- Gradient Mask for smooth fade at edges -->
          <div class="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
          <div class="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
          
          <div class="marquee-content flex gap-8 w-max">
            <!-- Primary items -->
            <div v-for="(award, i) in awards" :key="i"
              @click="openLightbox(award.img, award.title)"
              class="w-96 flex-shrink-0 bg-white p-6 border-2 border-slate-100 rounded-xl group hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden hover:border-orange-200">
              <div class="aspect-[4/3] overflow-hidden mb-6 relative rounded-xl bg-gray-50 shadow-inner">
                <img
                  :src="award.img"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style="transform: scale(1.12)"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span class="text-white text-xs font-bold bg-white/15 border border-white/30 backdrop-blur px-3 py-1.5 rounded-full">Klik untuk perbesar</span>
                </div>
              </div>
              <div class="text-center">
                <h4 class="font-black text-slate-900 text-lg leading-tight mb-2">{{ award.title }}</h4>
                <p class="text-orange-500 text-sm font-bold tracking-widest uppercase">Tahun {{ award.year }}</p>
              </div>
            </div>
            
            <!-- Duplicated items for seamless marquee looping -->
            <div v-for="(award, i) in awards" :key="'dup-'+i"
              @click="openLightbox(award.img, award.title)"
              class="w-96 flex-shrink-0 bg-white p-6 border-2 border-slate-100 rounded-xl group hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden hover:border-orange-200">
              <div class="aspect-[4/3] overflow-hidden mb-6 relative rounded-xl bg-gray-50 shadow-inner">
                <img :src="award.img" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style="transform: scale(1.12)" />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span class="text-white text-xs font-bold bg-white/15 border border-white/30 backdrop-blur px-3 py-1.5 rounded-full">Klik untuk perbesar</span>
                </div>
              </div>
              <div class="text-center">
                <h4 class="font-black text-slate-900 text-lg leading-tight mb-2">{{ award.title }}</h4>
                <p class="text-orange-500 text-sm font-bold tracking-widest uppercase">Tahun {{ award.year }}</p>
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
            <div class="flex items-center gap-3 text-orange-500 font-bold tracking-widest text-xs uppercase mb-4">
              FAQ
            </div>
            <h2 class="text-4xl font-bold text-slate-900 mb-8">Pertanyaan Umum</h2>
            
            <div class="space-y-4">
              <div v-for="(f, i) in faqs" :key="i"
                @click="toggleFaq(i)"
                class="border p-6 rounded-lg cursor-pointer transition-colors"
                :class="openFaq === i ? 'border-orange-500 bg-orange-50/40' : 'border-gray-200 hover:border-orange-300'">
                <div class="flex justify-between items-center gap-4">
                  <h4 class="font-bold text-slate-900">{{ f.q }}</h4>
                  <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors"
                    :class="openFaq === i ? 'bg-orange-500 text-white border-orange-500' : 'border border-gray-300 text-gray-500'">
                    <MinusIcon v-if="openFaq === i" class="w-4 h-4" />
                    <PlusIcon v-else class="w-4 h-4" />
                  </div>
                </div>
                <transition name="dev-acc">
                  <p v-if="openFaq === i" class="text-gray-500 text-sm leading-relaxed mt-4">{{ f.a }}</p>
                </transition>
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
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="footer-logo">
              <img :src="logoImg" alt="JAGAYA" style="height:48px; width:auto; object-fit:contain" />
              <span style="font-size: 24px;">JAGAYA</span>
            </div>
            <p class="footer-desc">Platform manajemen krisis bencana terpadu untuk Kabupaten Demak. Cepat, transparan, dan terkoordinasi.</p>
            <div class="footer-socials">
              <a href="#" class="footer-social"><PhoneIcon class="w-4 h-4 text-gray-400"/></a>
              <a href="#" class="footer-social"><EnvelopeIcon class="w-4 h-4 text-gray-400"/></a>
            </div>
          </div>
          <div>
            <p class="footer-heading">Menu</p>
            <ul class="footer-links">
              <li v-for="l in [{t:'Dashboard',p:'/dashboard'},{t:'Pengungsian',p:'/pengungsian'},{t:'Relawan',p:'/relawan'},{t:'Donasi',p:'/donasi'}]" :key="l.p">
                <router-link :to="l.p">{{ l.t }}</router-link>
              </li>
            </ul>
          </div>
          <div>
            <p class="footer-heading">Kontak</p>
            <ul class="footer-contact">
              <li>Jl. Pemuda No.1, Demak</li>
              <li>+999</li>
              <li>info@jagaya.id</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2026 JAGAYA System. All Rights Reserved.</p>
          <p>Didedikasikan untuk Penanggulangan Bencana Demak </p>
        </div>
      </div>
    </footer>

    <!-- LIGHTBOX PENGHARGAAN -->
    <transition name="dev-fade">
      <div v-if="lightboxImg" class="dev-lightbox" @click.self="closeLightbox">
        <button class="dev-lightbox__close" @click="closeLightbox"><XMarkIcon class="w-6 h-6" /></button>
        <div class="dev-lightbox__inner">
          <img :src="lightboxImg" :alt="lightboxTitle" />
          <p class="dev-lightbox__caption">{{ lightboxTitle }}</p>
        </div>
      </div>
    </transition>

    <!-- Founder Modal (Premium Clean Redesign) -->
    <transition name="dev-fade">
      <div v-if="showFounderModal" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" @click="showFounderModal = false"></div>
        
        <!-- Modal Content -->
        <div class="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col sm:flex-row transform transition-all">
          
          <!-- Close Button -->
          <button @click="showFounderModal = false" class="absolute top-4 right-4 z-50 w-10 h-10 bg-white/20 hover:bg-white/40 sm:bg-black/5 sm:hover:bg-black/10 backdrop-blur-md rounded-full flex items-center justify-center text-white sm:text-slate-500 hover:scale-105 transition-all">
            <XMarkIcon class="w-6 h-6" />
          </button>

          <!-- Left: Photo -->
          <div class="sm:w-5/12 relative h-64 sm:h-auto shrink-0">
            <img :src="fotoImg" class="absolute inset-0 w-full h-full object-cover" alt="M. Ananda Hariadi" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent sm:hidden"></div>
          </div>
          
          <!-- Right: Content -->
          <div class="sm:w-7/12 p-8 sm:p-12 flex flex-col justify-center bg-white relative">
            <div class="mb-5">
              <h3 class="text-3xl font-black text-slate-900 tracking-tight">M. Ananda Hariadi</h3>
              <p class="text-orange-600 font-bold tracking-widest uppercase text-xs mt-2">Founder & Lead Developer</p>
            </div>
            
            <div class="w-12 h-1.5 bg-orange-500 rounded-full mb-6"></div>
            
            <p class="text-slate-600 leading-relaxed text-[15px] mb-8">
              Mahasiswa Semester 4 Informatika di UPN "Veteran" Jawa Timur. Berdedikasi tinggi dalam merancang dan mengembangkan sistem teknologi cerdas yang dapat memberikan solusi nyata serta dampak positif bagi penanggulangan bencana di masyarakat luas.
            </p>
            
            <div class="flex items-center gap-4">
              <a href="https://www.instagram.com/anandahariadi_/" target="_blank" class="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-slate-100 text-slate-600 font-bold hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600 transition-all">
                Instagram
              </a>
              <a href="https://www.linkedin.com/in/anandahariadi/" target="_blank" class="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-slate-100 text-slate-600 font-bold hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600 transition-all">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>

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

/* Timeline Glow Line */
.timeline-glow-line {
  animation: timelineGlow 3s ease-in-out infinite;
  filter: drop-shadow(0 0 8px rgba(249, 115, 22, 0.5));
}
@keyframes timelineGlow {
  0%, 100% { opacity: 0.4; filter: drop-shadow(0 0 6px rgba(249, 115, 22, 0.3)); }
  50% { opacity: 1; filter: drop-shadow(0 0 16px rgba(249, 115, 22, 0.7)); }
}

/* Service tab fade */
.dev-fade-enter-active,.dev-fade-leave-active{transition:all .3s cubic-bezier(.16,1,.3,1)}
.dev-fade-enter-from{opacity:0;transform:translateY(12px)}
.dev-fade-leave-to{opacity:0;transform:translateY(-12px)}

/* FAQ accordion */
.dev-acc-enter-active,.dev-acc-leave-active{transition:all .3s ease;overflow:hidden}
.dev-acc-enter-from,.dev-acc-leave-to{opacity:0;max-height:0;margin-top:0}
.dev-acc-enter-to,.dev-acc-leave-from{opacity:1;max-height:200px}

/* Mascot Animations */
@keyframes mascotPop {
  0%, 10% { transform: translateX(150%) translateY(-65%); }
  25%, 75% { transform: translateX(-35%) translateY(-65%); }
  90%, 100% { transform: translateX(150%) translateY(-65%); }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

/* Robot Animations */
.robot-arm-wave {
  animation: robotWave 2s ease-in-out infinite;
}
@keyframes robotWave {
  0%, 100% { transform: rotate(0deg); }
  15% { transform: rotate(35deg); }
  30% { transform: rotate(-15deg); }
  45% { transform: rotate(25deg); }
  60% { transform: rotate(-10deg); }
  75% { transform: rotate(15deg); }
  90% { transform: rotate(0deg); }
}
.thruster-flames {
  animation: thrust 0.5s ease-in-out infinite alternate;
  transform-origin: 150px 320px;
}
@keyframes thrust {
  from { transform: scaleY(1); opacity: 0.8; }
  to { transform: scaleY(1.4); opacity: 1; filter: drop-shadow(0 10px 10px rgba(239,68,68,0.5)); }
}

/* Lightbox */
.dev-lightbox{
  position:fixed;inset:0;z-index:60;
  background:rgba(2,6,23,.85);backdrop-filter:blur(8px);
  display:flex;align-items:center;justify-content:center;padding:24px;
}
.dev-lightbox__inner{max-width:880px;width:100%;text-align:center}
.dev-lightbox__inner img{
  width:100%;max-height:78vh;object-fit:contain;
  border-radius:16px;box-shadow:0 32px 100px rgba(0,0,0,.5);
}
.dev-lightbox__caption{
  color:#fff;font-weight:800;font-size:16px;margin-top:16px;
}
.dev-lightbox__close{
  position:absolute;top:24px;right:24px;
  width:44px;height:44px;border-radius:999px;border:none;cursor:pointer;
  background:rgba(255,255,255,.12);color:#fff;
  display:flex;align-items:center;justify-content:center;transition:background .3s;
}
.dev-lightbox__close:hover{background:rgba(255,255,255,.25)}

/* Transitions */
.fade-enter-active,.fade-leave-active{transition:opacity .25s ease}
.animate-spin-slow {
  animation: spin 8s linear infinite;
}
@keyframes spin {
  100% { transform: translate(0, -50%) rotate(360deg); }
}

/* ══════════════════════════════════════════════════════
   FOOTER (identik dengan HomePage)
   ══════════════════════════════════════════════════════ */
.site-footer {
  background: #030712;
  padding: 64px 0 32px;
}
.site-footer .container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
}
@media (min-width:640px) { .site-footer .container { padding:0 24px; } }
@media (min-width:1024px) { .site-footer .container { padding:0 32px; } }
.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  margin-bottom: 48px;
}
@media (min-width:768px) {
  .footer-grid { grid-template-columns: 2fr 1fr 1fr; }
}
.footer-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.footer-logo-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #dc2626, #f97316);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
.footer-logo span {
  font-size: 20px;
  font-weight: 900;
  color: white;
}
.footer-desc {
  color: #6b7280;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.7;
  max-width: 320px;
}
.footer-socials {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}
.footer-social {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}
.footer-social:hover {
  background: linear-gradient(135deg, #dc2626, #f97316);
}
.footer-heading {
  color: white;
  font-weight: 900;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 16px;
}
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}
.footer-links li { margin-bottom: 12px; }
.footer-links a {
  color: #6b7280;
  font-size: 13px;
  font-weight: 500;
  transition: color 0.3s;
}
.footer-links a:hover { color: #f97316; }
.footer-contact {
  list-style: none;
  padding: 0;
  margin: 0;
}
.footer-contact li {
  color: #6b7280;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 12px;
}
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  font-size: 12px;
  color: #4b5563;
  font-weight: 500;
}
@media (min-width:768px) {
  .footer-bottom { flex-direction: row; justify-content: space-between; }
}
</style>
