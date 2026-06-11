<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import {
  UsersIcon, HomeIcon, GiftIcon, CurrencyDollarIcon,
  MapPinIcon, ShieldCheckIcon, BellAlertIcon, ArrowRightIcon,
  HeartIcon, FireIcon, ExclamationTriangleIcon, InformationCircleIcon,
  ChevronRightIcon, ClockIcon, CheckCircleIcon, ArrowTrendingUpIcon,
  PhoneIcon, EnvelopeIcon, PlayIcon, BuildingOffice2Icon,
  SignalIcon, TruckIcon, UserGroupIcon, MegaphoneIcon,
  HomeModernIcon, ChartBarIcon, GlobeAltIcon, CpuChipIcon,
  CommandLineIcon, WifiIcon, ServerIcon
} from '@heroicons/vue/24/outline'
import { HeartIcon as HeartSolid, StarIcon as StarSolid } from '@heroicons/vue/24/solid'
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, Title, Tooltip, Legend, ArcElement, Filler
} from 'chart.js'
import { Line, Doughnut } from 'vue-chartjs'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LCircleMarker, LPopup } from '@vue-leaflet/vue-leaflet'

// Asset images
import heroImg from '../assets/flood_hero.png'
import rescueImg from '../assets/flood_rescue.png'
import volunteersImg from '../assets/flood_volunteers.png'
import logisticsImg from '../assets/flood_logistics.png'
import evacuationImg from '../assets/flood_evacuation.png'
import communityImg from '../assets/flood_community.png'
import bridgeImg from '../assets/flood_bridge.png'
import techImg from '../assets/about_technology.png'
import logoImg from '../assets/logo-jagaya.png'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler)

/* ── LIVE CLOCK ─────────────────────────────────────────── */
const now = ref(new Date())
let ticker = null
onMounted(() => { ticker = setInterval(() => now.value = new Date(), 1000) })
onUnmounted(() => clearInterval(ticker))
const timeStr = computed(() => now.value.toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false }))

/* ── COUNTERS ────────────────────────────────────────────── */
const counts = ref([0, 0, 0, 0])
const targets = [12450, 45, 8452, 245]
onMounted(() => {
  targets.forEach((t, i) => {
    let c = 0; const s = t / 80
    const tm = setInterval(() => {
      c = Math.min(c + s, t)
      counts.value[i] = Math.floor(c)
      if (c >= t) clearInterval(tm)
    }, 16)
  })
  // Init scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
  }, { threshold: 0.1 })
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})

/* ── CHART DATA ──────────────────────────────────────────── */
const lineData = {
  labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
  datasets: [{
    data: [120, 158, 185, 215, 192, 168, 143],
    borderColor: '#f97316',
    backgroundColor: ctx => {
      const g = ctx.chart.ctx.createLinearGradient(0,0,0,160)
      g.addColorStop(0,'rgba(249,115,22,.3)'); g.addColorStop(1,'rgba(249,115,22,0)')
      return g
    },
    tension: 0.45, fill: true,
    pointBackgroundColor: '#f97316', pointBorderColor:'#fff', pointBorderWidth:2, pointRadius:4, pointHoverRadius:6
  }]
}
const lineOpts = {
  responsive:true, maintainAspectRatio:false,
  plugins:{ legend:{display:false}, tooltip:{ backgroundColor:'#111827', titleColor:'#f9fafb', bodyColor:'#d1d5db', padding:10, cornerRadius:10 }},
  scales:{
    y:{ grid:{color:'rgba(0,0,0,0.04)'}, ticks:{color:'#9ca3af',font:{size:10}} },
    x:{ grid:{display:false}, ticks:{color:'#9ca3af',font:{size:10}} }
  }
}
const donutData = {
  labels: ['Makanan','Obat-obatan','Pakaian','Air Bersih'],
  datasets:[{ data:[40,20,15,25], backgroundColor:['#dc2626','#f97316','#fbbf24','#fb923c'], borderWidth:0, hoverOffset:6 }]
}
const donutOpts = {
  responsive:true, maintainAspectRatio:false, cutout:'72%',
  plugins:{ legend:{ position:'bottom', labels:{color:'#374151',padding:12,font:{size:11,weight:'bold'}} }, tooltip:{ backgroundColor:'#111827', titleColor:'#f9fafb', bodyColor:'#d1d5db', padding:10, cornerRadius:10 } }
}

/* ── ALERTS ──────────────────────────────────────────────── */
const alerts = ref([
  { time:'10:45', area:'Kec. Karanganyar', status:'Kritis', msg:'Tanggul jebol di 2 titik', read:false },
  { time:'09:30', area:'Kec. Sayung',      status:'Siaga',  msg:'Evakuasi warga RT 01/RW 03', read:false },
  { time:'08:15', area:'Posko Induk',      status:'Info',   msg:'Bantuan BNPB tiba 3 truk',   read:true  },
  { time:'07:00', area:'Kec. Demak Kota',  status:'Siaga',  msg:'Ketinggian air naik 15cm',   read:true  },
])
const unread = computed(() => alerts.value.filter(a => !a.read).length)
const markRead = i => alerts.value[i].read = true

/* ── INFRASTRUKTUR FEATURES ──────────────────────────────── */
const infraFeatures = [
  {
    icon: MapPinIcon,
    title: 'Pemetaan Real-time',
    desc: 'Pantau pergerakan air, titik evakuasi, dan status keamanan wilayah terdampak secara langsung dari peta interaktif dengan update data setiap 5 menit.',
    badges: ['Update 5 menit', 'Multi-layer', 'GPS Tracking'],
    color: 'from-red-600 to-orange-500',
    link: '/pengungsian',
    img: heroImg,
  },
  {
    icon: TruckIcon,
    title: 'Distribusi Logistik',
    desc: 'Sistem manajemen gudang cerdas untuk memastikan bantuan donasi tepat sasaran ke posko yang paling membutuhkan.',
    badges: ['Smart Routing', 'Stok Realtime', 'Tepat Sasaran'],
    color: 'from-orange-500 to-amber-400',
    link: '/donasi',
    img: logisticsImg,
  },
  {
    icon: UserGroupIcon,
    title: 'Koordinasi Relawan',
    desc: 'Database terpusat untuk memobilisasi personel evakuasi dan medis ke titik krisis dengan komunikasi satu pintu.',
    badges: ['1,200+ Relawan', 'Dispatch Otomatis', 'Chat Terpadu'],
    color: 'from-red-500 to-rose-500',
    link: '/relawan',
    img: volunteersImg,
  },
  {
    icon: BellAlertIcon,
    title: 'Sistem Peringatan Dini',
    desc: 'Notifikasi otomatis ke seluruh warga dan relawan ketika level air mencapai ambang batas bahaya.',
    badges: ['Auto Alert', 'SMS Broadcast', 'Push Notification'],
    color: 'from-amber-500 to-yellow-400',
    link: '/dashboard',
    img: bridgeImg,
  },
  {
    icon: HomeModernIcon,
    title: 'Manajemen Pengungsian',
    desc: 'Kelola data pengungsi, kapasitas posko, dan kebutuhan logistik di setiap titik pengungsian.',
    badges: ['Data Pengungsi', 'Kapasitas Posko', 'Kebutuhan Logistik'],
    color: 'from-rose-500 to-red-600',
    link: '/pengungsian',
    img: evacuationImg,
  },
]

/* ── PROCESS STEPS ───────────────────────────────────────── */
const processSteps = [
  { num: '01', icon: SignalIcon, title: 'Deteksi Dini', desc: 'Sensor IoT dan data cuaca mendeteksi potensi banjir secara otomatis.' },
  { num: '02', icon: MegaphoneIcon, title: 'Peringatan Massal', desc: 'Sistem broadcast SMS, WhatsApp, dan sirene ke seluruh warga terdampak.' },
  { num: '03', icon: UserGroupIcon, title: 'Mobilisasi Tim', desc: 'Relawan dan tim SAR dimobilisasi otomatis ke titik-titik kritis.' },
  { num: '04', icon: TruckIcon, title: 'Distribusi Bantuan', desc: 'Logistik dikirim dengan smart routing ke posko prioritas tinggi.' },
  { num: '05', icon: ChartBarIcon, title: 'Monitoring & Evaluasi', desc: 'Dashboard real-time memantau seluruh operasi dan efektivitas penanganan.' },
]

/* ── GALLERY ─────────────────────────────────────────────── */
const gallery = [
  { src: rescueImg,    tag: 'Evakuasi',  title: 'Tim SAR Karanganyar',     span: 'col-span-1 row-span-1' },
  { src: logisticsImg, tag: 'Logistik',  title: 'Distribusi Bantuan BNPB', span: 'col-span-2 row-span-1' },
  { src: bridgeImg,    tag: 'Dampak',    title: 'Jalur Utama Terputus',    span: 'col-span-2 row-span-1' },
  { src: communityImg, tag: 'Komunitas', title: 'Gotong Royong Warga',     span: 'col-span-1 row-span-1' },
]

/* ── PETA PEMANTAUAN WILAYAH DEMAK ───────────────────────── */
const petaZoom = ref(11)
const petaCenter = ref([-6.8953, 110.6386])
const petaOptions = { zoomControl: false, scrollWheelZoom: false, attributionControl: false }
const wilayahKondisi = ref([
  { id: 1, nama: 'Sayung',      lat: -6.9320, lng: 110.4760, status: 'Kritis',  tma: '120 cm', warga: 3200 },
  { id: 2, nama: 'Karanganyar', lat: -6.9180, lng: 110.6080, status: 'Kritis',  tma: '95 cm',  warga: 2800 },
  { id: 3, nama: 'Mijen',       lat: -6.8120, lng: 110.7350, status: 'Waspada', tma: '60 cm',  warga: 1500 },
  { id: 4, nama: 'Gajah',       lat: -6.8900, lng: 110.7700, status: 'Waspada', tma: '45 cm',  warga: 980  },
  { id: 5, nama: 'Demak Kota',  lat: -6.8907, lng: 110.6370, status: 'Aman',    tma: '15 cm',  warga: 600  },
  { id: 6, nama: 'Wonosalam',   lat: -6.9540, lng: 110.6720, status: 'Aman',    tma: '10 cm',  warga: 300  },
])
const petaColor = (s) => s === 'Kritis' ? '#ef4444' : s === 'Waspada' ? '#f59e0b' : '#22c55e'

/* ── TESTIMONIALS ────────────────────────────────────────── */
const testimonials = [
  { name:'Budi Santoso', role:'Relawan PMI Demak',    text:'Platform ini sangat membantu koordinasi kami di lapangan. Informasi selalu akurat dan cepat.', rating: 5 },
  { name:'Siti Rahayu',  role:'Donatur dari Jakarta', text:'Saya bisa memantau langsung ke mana donasi saya tersalur. Transparansinya luar biasa.', rating: 5 },
  { name:'Ahmad Fauzi',  role:'Kepala Posko Sayung',  text:'Fitur peta real-time membuat kami bisa mengambil keputusan evakuasi jauh lebih cepat.', rating: 5 },
]
const activeTesti = ref(0)
let testiTimer = null
onMounted(() => { testiTimer = setInterval(() => { activeTesti.value = (activeTesti.value + 1) % testimonials.length }, 4000) })
onUnmounted(() => clearInterval(testiTimer))

/* ── ACTIVE INFRA CARD ──────────────────────────────────── */
const activeInfra = ref(0)

/* ── VIDEO MODAL ─────────────────────────────────────────── */
const showVideo = ref(false)

/* ── CCTV 24 JAM KOTA DEMAK ───────────────────────────────
   Embed YouTube live (mute+autoplay agar bisa berjalan otomatis).
   Ganti `src` dengan URL stream CCTV asli bila tersedia. */
const cctvFeeds = [
  { label: 'Alun-Alun Simpang Enam',  lokasi: 'Pusat Kota Demak',      src: 'https://www.youtube.com/embed/Cn3yyH-KTOE?rel=0&modestbranding=1&autoplay=1&mute=1' },
  { label: 'Masjid Agung Demak',      lokasi: 'Kauman, Demak Kota',    src: 'https://www.youtube.com/embed/GHuRrOnW2MQ?rel=0&modestbranding=1&autoplay=1&mute=1' },
  { label: 'Jl. Sultan Fatah',        lokasi: 'Jalur Utama Demak',     src: 'https://www.youtube.com/embed/A2Lgrc0B4Rw?rel=0&modestbranding=1&autoplay=1&mute=1' },
  { label: 'Kawasan Sayung',          lokasi: 'Kec. Sayung',           src: 'https://www.youtube.com/embed/dY070ndSob0?rel=0&modestbranding=1&autoplay=1&mute=1' },
  { label: 'Karanganyar',             lokasi: 'Titik Rawan Banjir',    src: 'https://www.youtube.com/embed/Cn3yyH-KTOE?rel=0&modestbranding=1&autoplay=1&mute=1' },
  { label: 'Jalur Pantura',           lokasi: 'Gerbang Demak',         src: 'https://www.youtube.com/embed/A2Lgrc0B4Rw?rel=0&modestbranding=1&autoplay=1&mute=1' },
]
</script>

<template>
  <div class="homepage-root" style="font-family:'Inter',system-ui,sans-serif">

    <!-- ████ 1. HERO SECTION ████ -->
    <section class="hero-section">
      <!-- Background image overlay -->
      <div class="hero-bg">
        <img :src="heroImg" alt="Banjir Demak" />
        <div class="hero-overlay"></div>
        <div class="hero-mesh"></div>
      </div>

      <div class="hero-content">
        <div class="hero-inner">
          <!-- LEFT: text -->
          <div class="hero-text reveal opacity-0">
            <!-- Badge -->
            <div class="hero-badge">
              <span class="badge-dot">
                <span class="badge-ping"></span>
                <span class="badge-core"></span>
              </span>
              Live · {{ timeStr }} WIB
            </div>

            <h1 class="hero-title">
              Sistem Tanggap<br>
              Darurat Bencana<br>
              <span class="hero-title-sub">Kabupaten Demak</span>
            </h1>
            <p class="hero-desc">
              Platform terpadu untuk pemantauan titik banjir, distribusi logistik, dan koordinasi relawan secara real-time dari satu dasbor.
            </p>

            <div class="hero-actions">
              <router-link to="/donasi" class="btn-primary-hero">
                <HeartSolid class="w-4 h-4" /> Donasi Sekarang
              </router-link>
              <button @click="showVideo = true" class="btn-ghost-hero">
                <PlayIcon class="w-4 h-4" /> Lihat Video
              </button>
            </div>

            <!-- Mini stats row -->
            <div class="hero-stats">
              <div class="hero-stat">
                <p class="hero-stat-num">{{ counts[0].toLocaleString('id') }}+</p>
                <p class="hero-stat-label">Pengungsi</p>
              </div>
              <div class="hero-stat-divider"></div>
              <div class="hero-stat">
                <p class="hero-stat-num">{{ counts[1] }}+</p>
                <p class="hero-stat-label">Posko Aktif</p>
              </div>
              <div class="hero-stat-divider"></div>
              <div class="hero-stat">
                <p class="hero-stat-num">1.2K+</p>
                <p class="hero-stat-label">Relawan</p>
              </div>
            </div>
          </div>

          <!-- RIGHT: floating composition -->
          <div class="hero-visual reveal opacity-0" style="transition-delay:.15s">
            <!-- Floating card: status -->
            <div class="float-card float-card-status animate-float">
              <div class="float-card-icon icon-red">
                <MapPinIcon class="w-5 h-5 text-white" />
              </div>
              <div>
                <p class="float-card-label">Status Area</p>
                <p class="float-card-value">Karanganyar: <span class="text-red-500">Kritis</span></p>
              </div>
            </div>

            <!-- Floating card: relawan -->
            <div class="float-card float-card-relawan animate-float-slow">
              <div class="avatar-stack">
                <img class="avatar" src="https://ui-avatars.com/api/?name=User+1&background=f97316&color=fff" alt=""/>
                <img class="avatar" src="https://ui-avatars.com/api/?name=User+2&background=dc2626&color=fff" alt=""/>
                <div class="avatar avatar-more">+1K</div>
              </div>
              <div>
                <p class="float-card-value">1,200+ Relawan</p>
                <p class="float-card-sub">Aktif di lapangan</p>
              </div>
            </div>

            <!-- Floating card: donasi -->
            <div class="float-card float-card-donasi">
              <p class="float-card-label">Progress Donasi</p>
              <p class="float-card-value" style="margin-bottom:6px">Rp 245M <span class="float-card-sub">/ 500M</span></p>
              <div class="progress-bar">
                <div class="progress-fill" style="width:49%"></div>
              </div>
              <p class="progress-text">49% tercapai</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Wave -->
      <div class="hero-wave">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L80 68C160 56 320 32 480 22C640 12 800 18 960 28C1120 38 1280 52 1360 59L1440 66V80H0Z" fill="white"/>
        </svg>
      </div>
    </section>

    <!-- ████ 2. PARTNER STRIP ████ -->
    <section class="partners-section">
      <div class="container">
        <p class="partners-label">Didukung Oleh</p>
        <div class="partners-row">
          <span class="partner-item"><ShieldCheckIcon class="w-6 h-6 text-red-500"/>BNPB</span>
          <span class="partner-item"><HomeIcon class="w-6 h-6 text-orange-500"/>Pemkab Demak</span>
          <span class="partner-item"><UsersIcon class="w-6 h-6 text-red-400"/>Relawan Indonesia</span>
          <span class="partner-item"><HeartIcon class="w-6 h-6 text-orange-400"/>PMI</span>
          <span class="partner-item"><MapPinIcon class="w-6 h-6 text-red-500"/>BPBD Jateng</span>
        </div>
      </div>
    </section>

    <!-- ████ 3. THREE FEATURE STRIP ████ -->
    <section class="features-strip">
      <div class="container">
        <div class="features-grid reveal opacity-0">
          <div v-for="f in [
            { icon:ShieldCheckIcon, title:'Tim Ahli Terlatih',    desc:'Koordinator berpengalaman siap 24 jam di setiap titik kritis wilayah terdampak.', color:'text-red-600' },
            { icon:BellAlertIcon,   title:'Respons Cepat 24/7',   desc:'Sistem notifikasi otomatis memastikan tidak ada kejadian darurat yang terlewat.',  color:'text-orange-500' },
            { icon:CurrencyDollarIcon, title:'Donasi Transparan', desc:'Setiap rupiah tercatat dan dapat dilacak penyalurannya secara real-time.',          color:'text-amber-500' },
          ]" :key="f.title"
          class="feature-strip-card group">
            <div class="feature-strip-icon">
              <component :is="f.icon" :class="['w-6 h-6', f.color]" />
            </div>
            <div>
              <h3 class="feature-strip-title">{{ f.title }}</h3>
              <p class="feature-strip-desc">{{ f.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ████ 4. INFRASTRUKTUR DIGITAL (NEW PREMIUM SECTION) ████ -->
    <section class="infra-section">
      <div class="container">
        <!-- Header row: text left, image right -->
        <div class="infra-header reveal opacity-0">
          <div class="infra-header-text">
            <div class="section-tag">
              <CpuChipIcon class="w-4 h-4" />
              Infrastruktur Digital
            </div>
            <h2 class="section-title-xl">
              Pusat Kendali<br>
              Untuk <span class="text-gradient">Kemanusiaan.</span>
            </h2>
            <p class="section-desc">
              Platform komprehensif untuk menyatukan data lapangan, komunikasi darurat, dan aksi cepat tanggap. Satu pintu pengawasan terpadu—lebih cepat, lebih jelas, lebih terkoordinasi.
            </p>
            <div class="infra-header-badges">
              <span class="inline-badge"><WifiIcon class="w-3.5 h-3.5" /> Real-time Monitoring</span>
              <span class="inline-badge"><ServerIcon class="w-3.5 h-3.5" /> Cloud Infrastructure</span>
              <span class="inline-badge"><GlobeAltIcon class="w-3.5 h-3.5" /> Multi-region</span>
            </div>
          </div>
          <div class="infra-header-img">
            <img :src="techImg" alt="Command Center" />
            <div class="infra-img-overlay"></div>
            <!-- Live badge on image -->
            <div class="infra-live-badge">
              <span class="badge-dot"><span class="badge-ping"></span><span class="badge-core" style="background:#22c55e"></span></span>
              SISTEM AKTIF
            </div>
          </div>
        </div>

        <!-- Feature tabs: sidebar left + content right -->
        <div class="infra-tabs reveal opacity-0" style="transition-delay:.1s">
          <!-- Sidebar -->
          <div class="infra-sidebar">
            <button v-for="(f, i) in infraFeatures" :key="f.title"
              @click="activeInfra = i"
              :class="['infra-tab-btn', { active: activeInfra === i }]"
            >
              <div :class="['infra-tab-icon', `bg-gradient-to-br ${f.color}`]">
                <component :is="f.icon" class="w-5 h-5 text-white" />
              </div>
              <div class="infra-tab-text">
                <h4>{{ f.title }}</h4>
                <p v-if="activeInfra === i">{{ f.desc }}</p>
              </div>
              <ChevronRightIcon v-if="activeInfra === i" class="w-4 h-4 text-orange-500 flex-shrink-0" />
            </button>
          </div>

          <!-- Content panel -->
          <div class="infra-panel">
            <transition name="infra-fade" mode="out-in">
              <div :key="activeInfra" class="infra-panel-inner">
                <!-- Image -->
                <div class="infra-panel-img">
                  <img :src="infraFeatures[activeInfra].img" :alt="infraFeatures[activeInfra].title" />
                  <div class="infra-panel-img-overlay"></div>
                  <div class="infra-panel-img-tag">
                    <span class="badge-dot"><span class="badge-ping"></span><span class="badge-core"></span></span>
                    {{ infraFeatures[activeInfra].title }}
                  </div>
                </div>
                <!-- Info -->
                <div class="infra-panel-info">
                  <div :class="['infra-panel-icon', `bg-gradient-to-br ${infraFeatures[activeInfra].color}`]">
                    <component :is="infraFeatures[activeInfra].icon" class="w-8 h-8 text-white" />
                  </div>
                  <h3>{{ infraFeatures[activeInfra].title }}</h3>
                  <p>{{ infraFeatures[activeInfra].desc }}</p>
                  <div class="infra-panel-badges">
                    <span v-for="b in infraFeatures[activeInfra].badges" :key="b" class="infra-badge">
                      <CheckCircleIcon class="w-3.5 h-3.5 text-green-500" /> {{ b }}
                    </span>
                  </div>
                  <router-link :to="infraFeatures[activeInfra].link" class="btn-infra">
                    Lihat Detail <ArrowRightIcon class="w-4 h-4" />
                  </router-link>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>

    <!-- ████ 5. STATS ROW ████ -->
    <section class="stats-section">
      <div class="container reveal opacity-0">
        <div class="stats-grid">
          <div v-for="(s, i) in [
            { val: counts[0], suffix:'+', label:'Pengungsi Terdata',   sub:'Di 8 kecamatan',         icon: UsersIcon },
            { val: counts[1], suffix:'+', label:'Posko Aktif',         sub:'Tersebar di Demak',      icon: HomeModernIcon },
            { val: counts[2], suffix:'+', label:'Paket Bantuan',       sub:'Sudah tersalurkan',      icon: GiftIcon },
            { val: counts[3], suffix:'M', label:'Total Donasi (Rp)',   sub:'Dari seluruh Indonesia', icon: CurrencyDollarIcon },
          ]" :key="i" class="stat-card">
            <div class="stat-icon-wrap">
              <component :is="s.icon" class="w-6 h-6 text-orange-500" />
            </div>
            <p class="stat-num">
              {{ s.val.toLocaleString('id') }}<span class="stat-suffix">{{ s.suffix }}</span>
            </p>
            <p class="stat-label">{{ s.label }}</p>
            <p class="stat-sub">{{ s.sub }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ████ 6. PROCESS FLOW ████ -->
    <section class="process-section">
      <div class="container">
        <div class="section-header reveal opacity-0">
          <div class="section-tag">
            <CommandLineIcon class="w-4 h-4" />
            Alur Kerja
          </div>
          <h2 class="section-title">
            Proses Respons<br>yang <span class="text-gradient">Terkoordinasi</span>
          </h2>
          <p class="section-desc" style="max-width:600px">
            Dari deteksi awal hingga evaluasi akhir, setiap tahap penanganan bencana terdigitalisasi dan terotomasi.
          </p>
        </div>

        <div class="process-grid reveal opacity-0" style="transition-delay:.1s">
          <div v-for="(step, i) in processSteps" :key="step.num" class="process-card group">
            <!-- Number -->
            <div class="process-num">{{ step.num }}</div>
            <!-- Icon -->
            <div class="process-icon-wrap">
              <component :is="step.icon" class="w-7 h-7 text-white" />
            </div>
            <!-- Connector line -->
            <div v-if="i < processSteps.length - 1" class="process-connector"></div>
            <h4 class="process-title">{{ step.title }}</h4>
            <p class="process-desc">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ████ 7. LIVE DASHBOARD PREVIEW (Bento Grid) ████ -->
    <section class="dashboard-section">
      <div class="container reveal opacity-0">
        <div class="dashboard-header">
          <div>
            <div class="section-tag">
              <ChartBarIcon class="w-4 h-4" />
              Data Real-time
            </div>
            <h2 class="section-title">
              Pantau Kondisi<br>Terkini Sekarang
            </h2>
          </div>
          <router-link to="/dashboard" class="btn-outline">
            Buka Dashboard Penuh <ArrowRightIcon class="w-4 h-4"/>
          </router-link>
        </div>

        <!-- CCTV 24 JAM — 6 feed Kota Demak -->
        <div class="cctv-block">
          <div class="cctv-block-header">
            <h3 class="cctv-block-title">
              <SignalIcon class="w-5 h-5 text-red-500" /> CCTV Pantau 24 Jam · Kota Demak
            </h3>
            <span class="live-tag">{{ cctvFeeds.length }} Titik Live</span>
          </div>
          <div class="cctv-grid">
            <div v-for="(c, i) in cctvFeeds" :key="i" class="cctv-card">
              <div class="cctv-frame">
                <iframe
                  :src="c.src"
                  :title="`CCTV ${c.label}`"
                  loading="lazy"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
                <span class="cctv-live">
                  <span class="badge-dot"><span class="badge-ping"></span><span class="badge-core" style="background:#ef4444"></span></span>
                  LIVE
                </span>
                <span class="cctv-24">24 JAM</span>
              </div>
              <div class="cctv-meta">
                <p class="cctv-meta-label"><MapPinIcon class="w-3.5 h-3.5 text-orange-500" /> {{ c.label }}</p>
                <p class="cctv-meta-sub">{{ c.lokasi }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Bento grid (grafik) -->
        <div class="bento-grid">
          <!-- Chart card — 2col -->
          <div class="bento-card bento-chart">
            <div class="bento-card-header">
              <h3><ArrowTrendingUpIcon class="w-5 h-5 text-orange-500"/> Tren Debit Air 7 Hari</h3>
              <span class="live-tag">Live</span>
            </div>
            <div class="bento-chart-body">
              <Line :data="lineData" :options="lineOpts" />
            </div>
          </div>

          <!-- Alert list -->
          <div class="bento-card bento-alerts">
            <div class="bento-card-header">
              <h3><BellAlertIcon class="w-5 h-5 text-red-500"/> Log Kejadian</h3>
              <span v-if="unread" class="unread-tag">{{unread}} baru</span>
            </div>
            <div class="bento-alerts-list">
              <div v-for="(a,i) in alerts" :key="i" @click="markRead(i)"
                :class="['alert-item', {'alert-unread':!a.read}]">
                <div v-if="!a.read" class="alert-bar"></div>
                <component :is="a.status==='Kritis'?FireIcon:a.status==='Siaga'?ExclamationTriangleIcon:InformationCircleIcon"
                  :class="['w-4 h-4 flex-shrink-0 mt-0.5', a.status==='Kritis'?'text-red-600':a.status==='Siaga'?'text-orange-500':'text-blue-400']"/>
                <div class="alert-content">
                  <div class="alert-top">
                    <span :class="['alert-status', a.status==='Kritis'?'status-kritis':a.status==='Siaga'?'status-siaga':'status-info']">{{a.status}}</span>
                    <span class="alert-time">{{a.time}}</span>
                  </div>
                  <p class="alert-area">{{a.area}}</p>
                  <p class="alert-msg">{{a.msg}}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Doughnut -->
          <div class="bento-card bento-donut">
            <h3 class="bento-donut-title"><GiftIcon class="w-5 h-5 text-orange-500"/> Distribusi Kebutuhan</h3>
            <div class="bento-donut-body">
              <Doughnut :data="donutData" :options="donutOpts"/>
            </div>
          </div>

          <!-- Dark stat card -->
          <div class="bento-card bento-dark">
            <p class="bento-dark-label">Efektivitas Respons</p>
            <p class="bento-dark-num">94<span>%</span></p>
            <p class="bento-dark-desc">Tingkat penanganan darurat berhasil tepat waktu</p>
            <div class="bento-dark-bar-wrap">
              <div class="bento-dark-bar">
                <div class="bento-dark-bar-fill" style="width:94%"></div>
              </div>
              <p class="bento-dark-bar-text">Target: 95% · Selisih 1%</p>
            </div>
          </div>

          <!-- CTA card -->
          <div class="bento-card bento-cta">
            <div class="bento-cta-mesh"></div>
            <div class="bento-cta-blob"></div>
            <div class="bento-cta-content">
              <HeartSolid class="w-8 h-8 text-white mb-3"/>
              <h3>Bantu<br>Mereka!</h3>
              <p>12 titik kritis butuh bantuan segera.</p>
            </div>
            <div class="bento-cta-actions">
              <router-link to="/donasi" class="bento-cta-btn-primary"> Donasi</router-link>
              <router-link to="/relawan" class="bento-cta-btn-ghost"> Relawan</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ████ 8. GALLERY ████ -->
    <section class="gallery-section">
      <div class="container reveal opacity-0">
        <div class="gallery-header">
          <div>
            <div class="section-tag">
              <GlobeAltIcon class="w-4 h-4" />
              Galeri Lapangan
            </div>
            <h2 class="section-title">Kondisi Terkini di Demak</h2>
          </div>
          <router-link to="/donasi" class="btn-outline">
            Lihat Semua
          </router-link>
        </div>

        <div class="gallery-grid">
          <div v-for="(g, i) in gallery" :key="i"
            :class="['gallery-item', g.span]">
            <img :src="g.src" :alt="g.title" />
            <div class="gallery-overlay"></div>
            <div class="gallery-info">
              <span class="gallery-tag">{{ g.tag }}</span>
              <h3 class="gallery-title">{{ g.title }}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ████ 8b. PETA PEMANTAUAN WILAYAH ████ -->
    <section class="py-20" style="background:#f8fafc">
      <div class="container">
        <div class="section-header reveal opacity-0">
          <div class="section-tag" style="justify-content:center">
            <MapPinIcon class="w-4 h-4" /> Peta Pemantauan
          </div>
          <h2 class="section-title">Pantau Setiap Wilayah Demak</h2>
          <p class="section-desc">Peta interaktif yang menampilkan status dan ketinggian muka air di tiap kecamatan Kabupaten Demak — diperbarui langsung dari pusat komando, 24 jam sehari.</p>
        </div>

        <div class="grid lg:grid-cols-3 gap-6">
          <!-- MAP -->
          <div class="lg:col-span-2 relative rounded-3xl overflow-hidden border border-gray-200 shadow-lg bg-white">
            <div class="absolute top-4 left-4 z-[1000] flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-gray-200 shadow-sm">
              <span class="relative flex h-2.5 w-2.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span class="text-[11px] font-black uppercase tracking-widest text-gray-700">Live · 24/7</span>
            </div>
            <div class="absolute top-4 right-4 z-[1000] flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-gray-200 shadow-sm">
              <ClockIcon class="w-4 h-4 text-orange-500" />
              <span class="text-[12px] font-bold text-gray-700 tabular-nums">{{ timeStr }} WIB</span>
            </div>
            <div class="h-[460px] sm:h-[520px] w-full">
              <l-map ref="petaMap" v-model:zoom="petaZoom" :center="petaCenter" :options="petaOptions">
                <l-tile-layer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"></l-tile-layer>
                <l-circle-marker
                  v-for="a in wilayahKondisi" :key="a.id"
                  :lat-lng="[a.lat, a.lng]"
                  :radius="15"
                  :color="petaColor(a.status)"
                  :fill-color="petaColor(a.status)"
                  :fill-opacity="0.4"
                  :weight="2.5"
                >
                  <l-popup>
                    <div style="font-family:'Inter',sans-serif;min-width:170px">
                      <p style="font-weight:900;font-size:14px;color:#0f172a">Kec. {{ a.nama }}</p>
                      <p style="font-size:12px;color:#475569;margin-top:4px">Tinggi Muka Air: <b>{{ a.tma }}</b></p>
                      <p style="font-size:12px;color:#475569">Warga terdampak: <b>{{ a.warga.toLocaleString('id') }}</b></p>
                      <span :style="{ display:'inline-block', marginTop:'8px', fontSize:'11px', fontWeight:700, padding:'2px 8px', borderRadius:'999px', background: petaColor(a.status)+'22', color: petaColor(a.status) }">{{ a.status }}</span>
                    </div>
                  </l-popup>
                </l-circle-marker>
              </l-map>
            </div>
            <div class="absolute bottom-4 left-4 z-[1000] flex gap-4 px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur border border-gray-200 shadow-sm text-xs font-semibold text-gray-600">
              <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-red-500"></span> Kritis</span>
              <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Waspada</span>
              <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-green-500"></span> Aman</span>
            </div>
          </div>

          <!-- LIST -->
          <div class="flex flex-col gap-3">
            <p class="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-1">Status per Wilayah</p>
            <div v-for="a in wilayahKondisi" :key="a.id" class="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-orange-300 hover:shadow-md transition-all">
              <span class="relative flex h-3 w-3 shrink-0">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" :style="{ background: petaColor(a.status) }"></span>
                <span class="relative inline-flex rounded-full h-3 w-3" :style="{ background: petaColor(a.status) }"></span>
              </span>
              <div class="flex-1 min-w-0">
                <p class="font-bold text-gray-900 text-sm">Kec. {{ a.nama }}</p>
                <p class="text-xs text-gray-500">TMA {{ a.tma }} · {{ a.warga.toLocaleString('id') }} warga</p>
              </div>
              <span class="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0" :style="{ background: petaColor(a.status)+'22', color: petaColor(a.status) }">{{ a.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ████ 9. TESTIMONIALS ████ -->
    <section class="testi-section">
      <div class="container reveal opacity-0">
        <div class="section-header">
          <div class="section-tag">
            <HeartIcon class="w-4 h-4" />
            Kata Mereka
          </div>
          <h2 class="section-title">Dipercaya Banyak Pihak</h2>
        </div>
        <div class="testi-wrapper">
          <transition name="testi" mode="out-in">
            <div :key="activeTesti" class="testi-card">
              <div class="testi-icon">
                <HeartSolid class="w-7 h-7 text-white"/>
              </div>
              <!-- Stars -->
              <div class="testi-stars">
                <StarSolid v-for="s in testimonials[activeTesti].rating" :key="s" class="w-4 h-4 text-amber-400" />
              </div>
              <p class="testi-text">
                "{{ testimonials[activeTesti].text }}"
              </p>
              <p class="testi-name">{{ testimonials[activeTesti].name }}</p>
              <p class="testi-role">{{ testimonials[activeTesti].role }}</p>
            </div>
          </transition>
          <div class="testi-dots">
            <button v-for="(_, i) in testimonials" :key="i" @click="activeTesti=i"
              :class="['testi-dot', { active: i===activeTesti }]"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <!-- ████ 10. FINAL CTA ████ -->
    <section class="cta-section">
      <div class="cta-mesh"></div>
      <div class="cta-blob-1"></div>
      <div class="cta-blob-2"></div>

      <div class="cta-content reveal opacity-0">
        <h2 class="cta-title">
          Satu Tindakan Kecil,<br>
          <span>Dampak yang Besar.</span>
        </h2>
        <p class="cta-desc">
          Setiap detik berharga. Salurkan bantuan Anda sekarang untuk meringankan beban saudara kita di posko pengungsian Demak.
        </p>
        <div class="cta-actions">
          <router-link to="/donasi" class="btn-cta-primary">
             Mulai Donasi Online
          </router-link>
          <router-link to="/relawan" class="btn-cta-ghost">
             Daftar Jadi Relawan
          </router-link>
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

    <!-- VIDEO MODAL -->
    <transition name="fade">
      <div v-if="showVideo" class="video-modal-backdrop" @click.self="showVideo=false">
        <div class="video-modal">
          <div class="video-modal-header">
            <span>Video Profil JAGAYA</span>
            <button @click="showVideo=false" class="video-modal-close">&times;</button>
          </div>
          <div class="video-modal-body">
            <p>Video akan tersedia segera</p>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

/* ── TOKENS ─────────────────────────────────────────────── */
:root {
  --red-600: #dc2626;
  --orange-500: #f97316;
  --amber-400: #fbbf24;
}

.homepage-root {
  background: #fff;
  color: #111827;
  overflow-x: hidden;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
}
@media (min-width:640px) { .container { padding:0 24px; } }
@media (min-width:1024px) { .container { padding:0 32px; } }

/* ── GRADIENT TEXT ─────────────────────────────────── */
.text-gradient {
  background: linear-gradient(135deg, #dc2626, #f97316);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── SECTION TAG ──────────────────────────────────── */
.section-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #f97316;
  margin-bottom: 12px;
}

.section-title {
  font-size: 2.2rem;
  font-weight: 900;
  color: #111827;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
}
.section-title-xl {
  font-size: 2.4rem;
  font-weight: 900;
  color: #111827;
  line-height: 1.08;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
}
@media (min-width:1024px) {
  .section-title { font-size: 2.8rem; }
  .section-title-xl { font-size: 3.2rem; }
}

.section-desc {
  font-size: 15px;
  font-weight: 500;
  color: #6b7280;
  line-height: 1.7;
}

.section-header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 48px;
}

/* ── BUTTONS ──────────────────────────────────────── */
.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 999px;
  border: 2px solid #e5e7eb;
  color: #374151;
  font-weight: 800;
  font-size: 14px;
  transition: all 0.3s;
  flex-shrink: 0;
}
.btn-outline:hover {
  border-color: #f97316;
  color: #ea580c;
}

/* ══════════════════════════════════════════════════════
   1. HERO
   ══════════════════════════════════════════════════════ */
.hero-section {
  position: relative;
  padding-top: 112px;
  padding-bottom: 0;
  overflow: hidden;
  min-height: 100vh;
}
.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.hero-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(153, 27, 27, 0.92) 0%, rgba(180, 52, 23, 0.88) 40%, rgba(194, 65, 12, 0.82) 100%);
}
.hero-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.07;
  background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0);
  background-size: 28px 28px;
}
.hero-content {
  position: relative;
  z-index: 10;
}
.hero-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
}
@media (min-width:640px) { .hero-inner { padding: 0 24px; } }
@media (min-width:1024px) {
  .hero-inner { flex-direction: row; gap: 64px; padding: 0 32px; }
}

.hero-text {
  flex: 0 0 52%;
  color: white;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 999px;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.25);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 28px;
}
.badge-dot {
  position: relative;
  display: flex;
  width: 8px;
  height: 8px;
}
.badge-ping {
  position: absolute;
  display: inline-flex;
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: white;
  opacity: 0.8;
  animation: ping 1.5s cubic-bezier(0,0,0.2,1) infinite;
}
.badge-core {
  position: relative;
  display: inline-flex;
  border-radius: 999px;
  width: 8px;
  height: 8px;
  background: white;
}
@keyframes ping { 75%,100% { transform:scale(2);opacity:0 } }

.hero-title {
  font-size: 2.8rem;
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin-bottom: 20px;
}
@media (min-width:1024px) { .hero-title { font-size: 3.8rem; } }
.hero-title-sub { color: rgba(255,255,255,0.8); }

.hero-desc {
  color: rgba(255,255,255,0.75);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.7;
  margin-bottom: 36px;
  max-width: 480px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 48px;
}
.btn-primary-hero {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 999px;
  background: white;
  color: #ea580c;
  font-weight: 900;
  font-size: 14px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  transition: all 0.3s;
}
.btn-primary-hero:hover {
  background: #fff7ed;
  transform: translateY(-2px);
  box-shadow: 0 24px 64px rgba(0,0,0,0.25);
}
.btn-ghost-hero {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 999px;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.3);
  color: white;
  font-weight: 700;
  font-size: 14px;
  transition: all 0.3s;
  cursor: pointer;
}
.btn-ghost-hero:hover {
  background: rgba(255,255,255,0.25);
  transform: translateY(-2px);
}

.hero-stats {
  display: flex;
  gap: 32px;
  padding-bottom: 40px;
}
.hero-stat-num {
  font-size: 1.875rem;
  font-weight: 900;
  color: white;
  font-variant-numeric: tabular-nums;
}
.hero-stat-label {
  color: rgba(255,255,255,0.6);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 4px;
}
.hero-stat-divider {
  width: 1px;
  background: rgba(255,255,255,0.2);
}

/* Hero visual */
.hero-visual {
  flex: 0 0 48%;
  position: relative;
  height: 480px;
  width: 100%;
}

.float-card {
  position: absolute;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.12);
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #f3f4f6;
  z-index: 20;
}
.float-card-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.icon-red {
  background: linear-gradient(135deg, #dc2626, #f97316);
}
.float-card-label {
  font-size: 10px;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.float-card-value {
  font-size: 13px;
  font-weight: 900;
  color: #111827;
}
.float-card-sub {
  font-size: 11px;
  font-weight: 500;
  color: #6b7280;
}

.float-card-status { top: 48px; left: -16px; min-width: 200px; }
.float-card-relawan { bottom: 56px; left: -16px; }
.float-card-donasi {
  bottom: 8px;
  right: 16px;
  width: 208px;
  flex-direction: column;
  align-items: flex-start;
}

.avatar-stack { display: flex; }
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: 2px solid white;
  object-fit: cover;
}
.avatar + .avatar { margin-left: -10px; }
.avatar-more {
  background: linear-gradient(135deg, #ef4444, #f97316);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 900;
  color: white;
  margin-left: -10px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #f3f4f6;
  border-radius: 999px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #dc2626, #f97316);
  transition: width 1s;
}
.progress-text {
  font-size: 10px;
  color: #f97316;
  font-weight: 700;
  margin-top: 4px;
}

.hero-wave {
  position: relative;
  z-index: 10;
  margin-bottom: -1px;
}
.hero-wave svg { display: block; width: 100%; }

/* ══════════════════════════════════════════════════════
   2. PARTNERS
   ══════════════════════════════════════════════════════ */
.partners-section {
  padding: 40px 0;
  border-bottom: 1px solid #f3f4f6;
}
.partners-label {
  text-align: center;
  font-size: 11px;
  font-weight: 900;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 24px;
}
.partners-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 40px;
  opacity: 0.4;
  transition: opacity 0.5s;
}
.partners-row:hover { opacity: 0.7; }
.partner-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 900;
  font-size: 18px;
  color: #374151;
}
@media (min-width:1024px) { .partners-row { gap: 64px; } }

/* ══════════════════════════════════════════════════════
   3. THREE FEATURES STRIP
   ══════════════════════════════════════════════════════ */
.features-strip {
  padding: 56px 0;
}
.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
@media (min-width:768px) { .features-grid { grid-template-columns: repeat(3,1fr); gap: 32px; } }

.feature-strip-card {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #f3f4f6;
  transition: all 0.3s;
}
.feature-strip-card:hover {
  border-color: #fed7aa;
  box-shadow: 0 12px 40px rgba(0,0,0,0.06);
}
.feature-strip-icon {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: linear-gradient(135deg, #fef2f2, #fff7ed);
  border: 1px solid #fed7aa;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.3s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.feature-strip-card:hover .feature-strip-icon {
  transform: scale(1.1);
}
.feature-strip-title {
  font-weight: 900;
  color: #111827;
  font-size: 15px;
  margin-bottom: 6px;
}
.feature-strip-desc {
  color: #6b7280;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.6;
}

/* ══════════════════════════════════════════════════════
   4. INFRASTRUKTUR DIGITAL
   ══════════════════════════════════════════════════════ */
.infra-section {
  padding: 80px 0;
  background: #fafafa;
}

.infra-header {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 56px;
}
@media (min-width:1024px) {
  .infra-header { flex-direction: row; align-items: center; gap: 48px; }
}

.infra-header-text {
  flex: 1;
}
.infra-header-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}
.inline-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid #e5e7eb;
  font-size: 11px;
  font-weight: 700;
  color: #374151;
}

.infra-header-img {
  flex: 0 0 45%;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 24px 80px rgba(0,0,0,0.12);
  border: 1px solid rgba(0,0,0,0.06);
}
.infra-header-img img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  transition: transform 0.8s;
}
.infra-header-img:hover img { transform: scale(1.03); }
.infra-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(0,0,0,0.4) 0%, transparent 50%);
}
.infra-live-badge {
  position: absolute;
  bottom: 16px;
  left: 16px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 999px;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(12px);
  color: white;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* Tabs layout */
.infra-tabs {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
@media (min-width:1024px) {
  .infra-tabs { flex-direction: row; gap: 24px; }
}

.infra-sidebar {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 0 0 340px;
}
@media (max-width:1023px) {
  .infra-sidebar {
    flex-direction: row;
    overflow-x: auto;
    gap: 8px;
    padding-bottom: 8px;
    -webkit-overflow-scrolling: touch;
  }
  .infra-sidebar::-webkit-scrollbar { display: none; }
}

.infra-tab-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 16px;
  background: white;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;
  width: 100%;
}
@media (max-width:1023px) {
  .infra-tab-btn { min-width: 200px; flex-shrink: 0; }
}
.infra-tab-btn:hover { border-color: #fdba74; }
.infra-tab-btn.active {
  background: #fff;
  border-color: #f97316;
  box-shadow: 0 4px 20px rgba(249,115,22,0.1);
}

.infra-tab-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
}

.infra-tab-text h4 {
  font-size: 14px;
  font-weight: 800;
  color: #111827;
  margin: 0;
}
.infra-tab-text p {
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
  margin-top: 4px;
  line-height: 1.5;
}

/* Panel */
.infra-panel {
  flex: 1;
  min-width: 0;
}
.infra-panel-inner {
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  box-shadow: 0 8px 40px rgba(0,0,0,0.06);
}
@media (min-width:768px) {
  .infra-panel-inner { flex-direction: row; }
}

.infra-panel-img {
  position: relative;
  flex: 0 0 50%;
  min-height: 280px;
  overflow: hidden;
}
.infra-panel-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s;
}
.infra-panel-inner:hover .infra-panel-img img {
  transform: scale(1.05);
}
.infra-panel-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(0,0,0,0.5) 0%, transparent 60%);
}
.infra-panel-img-tag {
  position: absolute;
  bottom: 16px;
  left: 16px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 999px;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(12px);
  color: white;
  font-size: 12px;
  font-weight: 700;
}

.infra-panel-info {
  flex: 1;
  padding: 32px;
  display: flex;
  flex-direction: column;
}
.infra-panel-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  margin-bottom: 16px;
}
.infra-panel-info h3 {
  font-size: 22px;
  font-weight: 900;
  color: #111827;
  margin-bottom: 12px;
}
.infra-panel-info p {
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  line-height: 1.7;
  margin-bottom: 16px;
}
.infra-panel-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}
.infra-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 999px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  font-size: 11px;
  font-weight: 700;
  color: #166534;
}

.btn-infra {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 999px;
  background: linear-gradient(135deg, #dc2626, #f97316);
  color: white;
  font-weight: 800;
  font-size: 14px;
  box-shadow: 0 8px 24px rgba(249,115,22,0.25);
  transition: all 0.3s;
  margin-top: auto;
  align-self: flex-start;
}
.btn-infra:hover {
  box-shadow: 0 12px 32px rgba(249,115,22,0.35);
  transform: translateY(-2px);
}

/* ══════════════════════════════════════════════════════
   5. STATS
   ══════════════════════════════════════════════════════ */
.stats-section {
  padding: 64px 0;
  background: white;
  border-top: 1px solid #f3f4f6;
  border-bottom: 1px solid #f3f4f6;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 24px;
}
@media (min-width:768px) { .stats-grid { grid-template-columns: repeat(4,1fr); gap: 32px; } }

.stat-card {
  transition: all 0.3s ease;
}
.stat-card:hover {
  transform: scale(1.02) translateY(-2px);
  box-shadow: 0 15px 30px -5px rgba(249,115,22,0.1);
}
.stat-card:hover {
  border-color: #fed7aa;
  box-shadow: 0 8px 32px rgba(0,0,0,0.04);
}
.stat-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #fef2f2, #fff7ed);
  border: 1px solid #fed7aa;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
}
.stat-num {
  font-size: 2.8rem;
  font-weight: 900;
  color: #111827;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
@media (min-width:1024px) { .stat-num { font-size: 3.2rem; } }
.stat-suffix {
  background: linear-gradient(135deg, #dc2626, #f97316);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.stat-label {
  font-weight: 900;
  color: #374151;
  font-size: 14px;
  margin-top: 8px;
}
.stat-sub {
  color: #9ca3af;
  font-size: 12px;
  font-weight: 500;
  margin-top: 2px;
}

/* ══════════════════════════════════════════════════════
   6. PROCESS FLOW
   ══════════════════════════════════════════════════════ */
.process-section {
  padding: 80px 0;
  background: white;
}
.process-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}
@media (min-width:640px) { .process-grid { grid-template-columns: repeat(2,1fr); } }
@media (min-width:1024px) { .process-grid { grid-template-columns: repeat(5,1fr); gap: 16px; } }

.process-card {
  position: relative;
  text-align: center;
  padding: 28px 16px;
  border-radius: 12px;
  background: #fafafa;
  border: 1px solid #f3f4f6;
  transition: all 0.3s;
}
.process-card:hover {
  border-color: #fdba74;
  box-shadow: 0 12px 40px rgba(0,0,0,0.06);
  transform: translateY(-4px);
}

.process-num {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 32px;
  font-weight: 900;
  color: #f3f4f6;
  line-height: 1;
}
.process-card:hover .process-num {
  color: #fdba74;
}

.process-icon-wrap {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, #dc2626, #f97316);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  box-shadow: 0 8px 24px rgba(249,115,22,0.25);
  transition: transform 0.3s;
}
.process-card:hover .process-icon-wrap {
  transform: scale(1.1);
}

.process-connector {
  display: none;
}
@media (min-width:1024px) {
  .process-connector {
    display: block;
    position: absolute;
    top: 50%;
    right: -10px;
    width: 20px;
    height: 2px;
    background: linear-gradient(90deg, #fdba74, #f3f4f6);
    z-index: 10;
  }
}

.process-title {
  font-size: 15px;
  font-weight: 800;
  color: #111827;
  margin-bottom: 8px;
}
.process-desc {
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
  line-height: 1.6;
}

/* ══════════════════════════════════════════════════════
   7. LIVE DASHBOARD
   ══════════════════════════════════════════════════════ */
.dashboard-section {
  padding: 80px 0;
  background: #fafafa;
}
.dashboard-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
}
@media (min-width:1024px) {
  .dashboard-header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

/* ── CCTV 24 JAM ──────────────────────────────── */
.cctv-block {
  margin-bottom: 32px;
}
.cctv-block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}
.cctv-block-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 900;
  color: #111827;
}
.cctv-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
@media (min-width:640px) { .cctv-grid { grid-template-columns: repeat(2,1fr); } }
@media (min-width:1024px) { .cctv-grid { grid-template-columns: repeat(3,1fr); } }

.cctv-card {
  background: #fff;
  border: 1px solid #f3f4f6;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.04);
  transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
}
.cctv-card:hover {
  transform: translateY(-4px);
  border-color: #fed7aa;
  box-shadow: 0 20px 40px -10px rgba(249,115,22,0.18);
}
.cctv-frame {
  position: relative;
  aspect-ratio: 16/9;
  background: #0b0f1a;
}
.cctv-frame iframe {
  width: 100%;
  height: 100%;
  display: block;
}
.cctv-live {
  position: absolute;
  top: 10px;
  left: 10px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(8px);
  color: #fff;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.1em;
}
.cctv-24 {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(249,115,22,0.92);
  color: #fff;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.08em;
}
.cctv-meta {
  padding: 12px 16px;
}
.cctv-meta-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 900;
  color: #111827;
}
.cctv-meta-sub {
  font-size: 11px;
  font-weight: 600;
  color: #9ca3af;
  margin-top: 2px;
  padding-left: 20px;
}

.bento-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
@media (min-width:1024px) {
  .bento-grid { grid-template-columns: repeat(3,1fr); }
}

.bento-card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.bento-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px -10px rgba(249,115,22,0.15);
  border-color: #fed7aa;
}

.bento-chart { grid-column: span 1; }
@media (min-width:1024px) { .bento-chart { grid-column: span 2; } }

.bento-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #fafafa;
}
.bento-card-header h3 {
  font-weight: 900;
  color: #111827;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.live-tag {
  font-size: 10px;
  font-weight: 800;
  color: #22c55e;
  background: #f0fdf4;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid #bbf7d0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.unread-tag {
  font-size: 10px;
  font-weight: 800;
  color: white;
  background: linear-gradient(135deg, #dc2626, #f97316);
  padding: 2px 8px;
  border-radius: 999px;
}

.bento-chart-body {
  padding: 20px;
  height: 220px;
}

/* Alerts */
.bento-alerts { display: flex; flex-direction: column; }
.bento-alerts-list {
  flex: 1;
  overflow-y: auto;
}
.alert-item {
  display: flex;
  gap: 12px;
  padding: 16px;
  cursor: pointer;
  transition: background 0.2s;
  position: relative;
  border-bottom: 1px solid #fafafa;
}
.alert-item:hover { background: rgba(249,115,22,0.04); }
.alert-unread { background: rgba(249,115,22,0.03); }
.alert-bar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #dc2626, #f97316);
  border-radius: 0 8px 8px 0;
}
.alert-content { flex: 1; min-width: 0; }
.alert-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}
.alert-status {
  font-size: 10px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 6px;
}
.status-kritis { background: #fef2f2; color: #b91c1c; }
.status-siaga { background: #fff7ed; color: #c2410c; }
.status-info { background: #fff7ed; color: #f97316; }
.alert-time {
  font-size: 10px;
  color: #9ca3af;
  font-weight: 700;
  margin-left: auto;
}
.alert-area {
  font-size: 12px;
  font-weight: 900;
  color: #111827;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.alert-msg {
  font-size: 11px;
  color: #6b7280;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Doughnut */
.bento-donut { padding: 20px; display: flex; flex-direction: column; }
.bento-donut-title {
  font-weight: 900;
  color: #111827;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}
.bento-donut-body { flex: 1; height: 200px; }

/* Dark card */
.bento-dark {
  background: linear-gradient(135deg, #030712, #1f2937);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.bento-dark-label {
  font-size: 10px;
  font-weight: 800;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.bento-dark-num {
  font-size: 3.5rem;
  font-weight: 900;
  color: white;
  line-height: 1;
}
.bento-dark-num span { color: #f97316; }
.bento-dark-desc {
  font-size: 12px;
  font-weight: 500;
  color: #9ca3af;
}
.bento-dark-bar-wrap { margin-top: auto; }
.bento-dark-bar {
  width: 100%;
  height: 8px;
  background: #374151;
  border-radius: 999px;
  overflow: hidden;
}
.bento-dark-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #ef4444, #f97316);
  border-radius: 999px;
}
.bento-dark-bar-text {
  font-size: 10px;
  color: #6b7280;
  font-weight: 700;
  margin-top: 6px;
}

/* CTA card */
.bento-cta {
  position: relative;
  background: linear-gradient(135deg, #b91c1c, #dc2626, #ea580c);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
}
.bento-cta-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.07;
  background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0);
  background-size: 20px 20px;
}
.bento-cta-blob {
  position: absolute;
  top: -32px;
  right: -32px;
  width: 160px;
  height: 160px;
  background: rgba(255,255,255,0.1);
  border-radius: 999px;
  filter: blur(24px);
}
.bento-cta-content {
  position: relative;
  z-index: 10;
}
.bento-cta-content h3 {
  font-size: 1.4rem;
  font-weight: 900;
  color: white;
  line-height: 1.2;
}
.bento-cta-content p {
  color: rgba(255,255,255,0.7);
  font-size: 12px;
  font-weight: 500;
  margin-top: 8px;
}
.bento-cta-actions {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
}
.bento-cta-btn-primary {
  text-align: center;
  background: white;
  color: #ea580c;
  padding: 10px;
  border-radius: 12px;
  font-weight: 900;
  font-size: 13px;
  transition: background 0.3s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.bento-cta-btn-primary:hover { background: #fff7ed; }
.bento-cta-btn-ghost {
  text-align: center;
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.3);
  color: white;
  padding: 10px;
  border-radius: 12px;
  font-weight: 900;
  font-size: 13px;
  transition: background 0.3s;
}
.bento-cta-btn-ghost:hover { background: rgba(255,255,255,0.3); }

/* ══════════════════════════════════════════════════════
   8. GALLERY
   ══════════════════════════════════════════════════════ */
.gallery-section {
  padding: 80px 0;
  background: white;
}
.gallery-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
}
@media (min-width:1024px) {
  .gallery-header { flex-direction: row; align-items: flex-end; justify-content: space-between; }
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  grid-auto-rows: 200px;
}
.gallery-item {
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}
.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s;
}
.gallery-item:hover img { transform: scale(1.05); }
.gallery-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s;
}
.gallery-item:hover .gallery-overlay { opacity: 1; }
.gallery-info {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 20px;
  transform: translateY(12px);
  opacity: 0;
  transition: all 0.3s;
}
.gallery-item:hover .gallery-info {
  transform: translateY(0);
  opacity: 1;
}
.gallery-tag {
  display: inline-block;
  padding: 4px 12px;
  background: linear-gradient(135deg, #dc2626, #f97316);
  border-radius: 999px;
  color: white;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 8px;
}
.gallery-title {
  font-size: 15px;
  font-weight: 900;
  color: white;
}

/* ══════════════════════════════════════════════════════
   9. TESTIMONIALS
   ══════════════════════════════════════════════════════ */
.testi-section {
  padding: 80px 0;
  background: #fafafa;
}
.testi-wrapper {
  max-width: 700px;
  margin: 0 auto;
  position: relative;
}
.testi-card {
  background: white;
  border-radius: 16px;
  padding: 40px;
  border: 1px solid #f3f4f6;
  text-align: center;
  box-shadow: 0 10px 30px rgba(249,115,22,0.06);
}
.testi-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, #dc2626, #f97316);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  box-shadow: 0 8px 24px rgba(249,115,22,0.2);
}
.testi-stars {
  display: flex;
  justify-content: center;
  gap: 2px;
  margin-bottom: 20px;
}
.testi-text {
  color: #374151;
  font-size: 17px;
  font-weight: 500;
  line-height: 1.7;
  font-style: italic;
  margin-bottom: 28px;
}
.testi-name {
  font-weight: 900;
  color: #111827;
  font-size: 14px;
}
.testi-role {
  color: #9ca3af;
  font-size: 12px;
  font-weight: 700;
  margin-top: 4px;
}
.testi-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
}
.testi-dot {
  height: 8px;
  border-radius: 999px;
  transition: all 0.3s;
  border: none;
  cursor: pointer;
}
.testi-dot.active {
  width: 32px;
  background: linear-gradient(90deg, #dc2626, #f97316);
}
.testi-dot:not(.active) {
  width: 8px;
  background: #e5e7eb;
}
.testi-dot:not(.active):hover { background: #d1d5db; }

/* ══════════════════════════════════════════════════════
   10. CTA
   ══════════════════════════════════════════════════════ */
.cta-section {
  padding: 96px 16px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #991b1b, #dc2626, #ea580c);
}
.cta-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.07;
  background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0);
  background-size: 28px 28px;
}
.cta-blob-1 {
  position: absolute;
  top: -128px;
  right: -128px;
  width: 500px;
  height: 500px;
  background: rgba(251,191,36,0.2);
  border-radius: 999px;
  filter: blur(60px);
}
.cta-blob-2 {
  position: absolute;
  bottom: -96px;
  left: -96px;
  width: 320px;
  height: 320px;
  background: rgba(127,29,29,0.3);
  border-radius: 999px;
  filter: blur(60px);
}
.cta-content {
  position: relative;
  z-index: 10;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}
.cta-title {
  font-size: 2.8rem;
  font-weight: 900;
  color: white;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
}
.cta-title span { color: rgba(255,255,255,0.8); }
@media (min-width:1024px) { .cta-title { font-size: 3.8rem; } }
.cta-desc {
  color: rgba(255,255,255,0.75);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.7;
  margin-bottom: 40px;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
}
.cta-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}
.btn-cta-primary {
  padding: 16px 36px;
  border-radius: 999px;
  background: white;
  color: #ea580c;
  font-weight: 900;
  font-size: 15px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  transition: all 0.3s;
}
.btn-cta-primary:hover {
  background: #fff7ed;
  transform: translateY(-4px);
  box-shadow: 0 24px 64px rgba(0,0,0,0.25);
}
.btn-cta-ghost {
  padding: 16px 36px;
  border-radius: 999px;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.3);
  color: white;
  font-weight: 900;
  font-size: 15px;
  transition: all 0.3s;
}
.btn-cta-ghost:hover {
  background: rgba(255,255,255,0.25);
  transform: translateY(-4px);
}

/* ══════════════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════════════ */
.site-footer {
  background: #030712;
  padding: 64px 0 32px;
}
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

/* ══════════════════════════════════════════════════════
   VIDEO MODAL
   ══════════════════════════════════════════════════════ */
.video-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.video-modal {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 32px 100px rgba(0,0,0,0.3);
  width: 100%;
  max-width: 640px;
}
.video-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #f3f4f6;
}
.video-modal-header span {
  font-weight: 900;
  color: #111827;
}
.video-modal-close {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: #f3f4f6;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-weight: 900;
  font-size: 18px;
  transition: all 0.3s;
}
.video-modal-close:hover {
  background: #fef2f2;
  color: #ea580c;
}
.video-modal-body {
  aspect-ratio: 16/9;
  background: #111827;
  display: flex;
  align-items: center;
  justify-content: center;
}
.video-modal-body p {
  color: #9ca3af;
  font-weight: 500;
  font-size: 14px;
}

/* ══════════════════════════════════════════════════════
   ANIMATIONS
   ══════════════════════════════════════════════════════ */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1);
}
.reveal.visible {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
@keyframes floatSlow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
.animate-float { animation: float 5s ease-in-out infinite; }
.animate-float-slow { animation: floatSlow 7s ease-in-out infinite; animation-delay:1.5s; }

.fade-enter-active,.fade-leave-active{transition:opacity .25s ease}
.fade-enter-from,.fade-leave-to{opacity:0}
.testi-enter-active,.testi-leave-active{transition:all .4s cubic-bezier(.16,1,.3,1)}
.testi-enter-from{opacity:0;transform:translateX(24px)}
.testi-leave-to{opacity:0;transform:translateX(-24px)}

.infra-fade-enter-active,.infra-fade-leave-active{transition:all .35s cubic-bezier(.16,1,.3,1)}
.infra-fade-enter-from{opacity:0;transform:translateY(12px)}
.infra-fade-leave-to{opacity:0;transform:translateY(-12px)}

/* ── RESPONSIVE GALLERY ──────────────────────── */
@media (max-width:768px) {
  .gallery-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: 240px;
  }
  .gallery-item {
    grid-column: span 1 !important;
  }
}
</style>
