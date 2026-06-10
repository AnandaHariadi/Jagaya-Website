<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { 
  ArrowRightIcon, 
  MapPinIcon, 
  ShieldCheckIcon, 
  HeartIcon, 
  GlobeAltIcon, 
  PlayIcon,
  CheckCircleIcon,
  UsersIcon,
  BuildingOffice2Icon,
  PhoneIcon,
  EnvelopeIcon,
  ChevronDownIcon,
  StarIcon,
  ClockIcon,
  TruckIcon,
  ExclamationTriangleIcon,
  HandRaisedIcon,
  HomeModernIcon,
  BoltIcon,
  DocumentCheckIcon,
  MegaphoneIcon,
  UserGroupIcon,
  ArrowLongRightIcon,
  SparklesIcon,
  SignalIcon,
  CubeTransparentIcon
} from '@heroicons/vue/24/solid'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

import floodHero from '../assets/flood_hero.png'
import floodVolunteers from '../assets/flood_volunteers.png'
import floodRescue from '../assets/flood_rescue.png'
import floodEvacuation from '../assets/flood_evacuation.png'
import floodLogistics from '../assets/flood_logistics.png'
import floodCommunity from '../assets/flood_community.png'
import floodBridge from '../assets/flood_bridge.png'

// ── Album Logic ──
const albumImages = [
  { src: floodBridge, caption: 'Infrastruktur Jembatan Rusak' },
  { src: floodRescue, caption: 'Tim SAR Karanganyar' },
  { src: floodVolunteers, caption: 'Distribusi Bantuan BNPB' },
  { src: floodEvacuation, caption: 'Posko Pengungsi' },
  { src: floodLogistics, caption: 'Pusat Distribusi Bantuan' },
  { src: floodCommunity, caption: 'Gotong Royong Warga' }
]
const currentAlbumPage = ref(0)
const nextAlbumPage = () => {
  if (currentAlbumPage.value < albumImages.length - 2) currentAlbumPage.value += 2
}
const prevAlbumPage = () => {
  if (currentAlbumPage.value > 0) currentAlbumPage.value -= 2
}
const computedAlbumLeft = computed(() => albumImages[currentAlbumPage.value])
const computedAlbumRight = computed(() => albumImages[currentAlbumPage.value + 1])

// ── Active service tab ──
const activeService = ref(0)
const services = [
  {
    icon: 'shield',
    title: 'Pemetaan Real-time',
    desc: 'Pantau pergerakan air, titik evakuasi, dan status keamanan wilayah terdampak secara langsung dari peta interaktif dengan update data setiap 5 menit.',
    features: ['Update data tiap 5 menit', 'Notifikasi bahaya otomatis', 'Peta interaktif multi-layer'],
    image: floodCommunity,
    color: '#10b981' // Zedag Green
  },
  {
    icon: 'heart',
    title: 'Distribusi Logistik',
    desc: 'Sistem manajemen gudang cerdas untuk memastikan bantuan donasi tepat sasaran ke posko yang paling membutuhkan.',
    features: ['Pencatatan transparan', 'Alokasi cerdas', 'Tracking distribusi'],
    image: floodLogistics,
    color: '#10b981'
  },
  {
    icon: 'users',
    title: 'Koordinasi Relawan',
    desc: 'Database terpusat untuk memobilisasi personel evakuasi dan medis ke titik krisis dengan komunikasi satu pintu.',
    features: ['Pelacakan lokasi GPS', 'Penugasan dinamis', 'Chat real-time'],
    image: floodVolunteers,
    color: '#10b981'
  },
  {
    icon: 'megaphone',
    title: 'Sistem Peringatan Dini',
    desc: 'Notifikasi otomatis ke seluruh warga dan relawan ketika level air mencapai ambang batas bahaya.',
    features: ['Push notification', 'SMS broadcast', 'Sirene otomatis'],
    image: floodRescue,
    color: '#10b981'
  },
  {
    icon: 'home',
    title: 'Manajemen Pengungsian',
    desc: 'Kelola data pengungsi, kapasitas posko, dan kebutuhan logistik di setiap titik pengungsian.',
    features: ['Data pengungsi digital', 'Kapasitas real-time', 'Kebutuhan medis'],
    image: floodEvacuation,
    color: '#10b981'
  }
]

// ── Counter animation ──
const counters = ref({ posko: 0, pengungsi: 0, relawan: 0, donatur: 0 })
const counterTargets = { posko: 45, pengungsi: 12000, relawan: 1200, donatur: 850 }
let countersStarted = false

const animateCounters = () => {
  if (countersStarted) return
  countersStarted = true
  const duration = 2500
  const steps = 80
  const interval = duration / steps
  Object.keys(counterTargets).forEach(key => {
    let current = 0
    const increment = counterTargets[key] / steps
    const timer = setInterval(() => {
      current += increment
      if (current >= counterTargets[key]) {
        counters.value[key] = counterTargets[key]
        clearInterval(timer)
      } else {
        counters.value[key] = Math.floor(current)
      }
    }, interval)
  })
}

// ── Testimonials ──
const currentTestimonial = ref(0)
const testimonials = [
  {
    name: 'Budi Santoso',
    role: 'Koordinator Relawan',
    text: 'JAGAYA membantu kami mengkoordinasikan lebih dari 500 relawan secara real-time. Distribusi bantuan jadi lebih cepat dan tepat sasaran.',
    rating: 5
  },
  {
    name: 'Siti Rahayu',
    role: 'Kepala BPBD Demak',
    text: 'Sistem pemetaan banjir yang disediakan JAGAYA sangat akurat. Kami bisa mengambil keputusan evakuasi lebih cepat dan menyelamatkan nyawa.',
    rating: 5
  },
  {
    name: 'Ahmad Fauzi',
    role: 'Donatur Tetap',
    text: 'Transparansi distribusi donasi melalui platform JAGAYA membuat saya yakin setiap rupiah yang saya berikan benar-benar sampai.',
    rating: 5
  }
]
const nextTestimonial = () => {
  currentTestimonial.value = (currentTestimonial.value + 1) % testimonials.length
}
const prevTestimonial = () => {
  currentTestimonial.value = (currentTestimonial.value - 1 + testimonials.length) % testimonials.length
}

// ── Scroll-triggered animations ──
const scrollY = ref(0)
const handleScroll = () => {
  scrollY.value = window.scrollY
}

// ── Lifecycle ──
let testimonialTimer = null

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        if (entry.target.id === 'stats-section') {
          animateCounters()
        }
      }
    })
  }, { threshold: 0.12 })

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

  testimonialTimer = setInterval(nextTestimonial, 5000)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (testimonialTimer) clearInterval(testimonialTimer)
})

const formatNumber = (num) => {
  if (num >= 1000) return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + 'K'
  return num.toString()
}

// ── CCTV 24 Jam YouTube Embed Links ──
// Use embed links with modest branding (rel=0). Autoplay is disabled by default by YouTube.
const cctvLinks = [
  {
    label: 'Live CCTV 1',
    src: 'https://www.youtube.com/embed/Cn3yyH-KTOE?rel=0&modestbranding=1'
  },
  {
    label: 'Live CCTV 2',
    src: 'https://www.youtube.com/embed/GHuRrOnW2MQ?rel=0&modestbranding=1'
  },
  {
    label: 'Live CCTV 3',
    src: 'https://www.youtube.com/embed/A2Lgrc0B4Rw?rel=0&modestbranding=1'
  },
  {
    label: 'Live CCTV 4',
    src: 'https://www.youtube.com/embed/dY070ndSob0?rel=0&modestbranding=1'
  },
  // if you want 4 only, delete the next two. (we keep exactly what was requested visually: 4 embeds)

]
</script>


<template>
  <div class="lp zedag-theme">

    <!-- ═══════════ HERO ═══════════ -->
    <section class="hero-zedag">
      <div class="hero-zedag__bg">
        <img :src="floodHero" alt="Banjir Demak" class="hero-zedag__img" />
        <div class="hero-zedag__overlay"></div>
      </div>
      
      <!-- Curved bottom shape -->
      <div class="hero-zedag__curve">
        <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,100 C320,250 1120,-50 1440,100 L1440,200 L0,200 Z" fill="#ffffff"/>
        </svg>
      </div>

      <div class="container hero-zedag__inner">
        <div class="hero-zedag__content">
          <div class="hero-zedag__badge">
            <span class="hero-zedag__badge-line"></span>
            Sistem Tanggap Bencana
          </div>
          <h1 class="hero-zedag__title">
            Manajemen Cerdas & <br/>
            Respons Cepat Bencana.
          </h1>
          <p class="hero-zedag__desc">
            Platform terpadu untuk pemantauan titik banjir, distribusi logistik posko, dan koordinasi relawan di Kabupaten Demak secara real-time.
          </p>
          <div class="hero-zedag__actions">
            <router-link to="/dashboard" class="btn-zedag btn-zedag--green">
              Akses Dashboard
              <ArrowRightIcon class="w-4 h-4 ml-2" />
            </router-link>
            <div class="hero-zedag__video-btn">
              <div class="hero-zedag__play-icon">
                <PlayIcon class="w-5 h-5" />
              </div>
              <div class="hero-zedag__video-text">
                <span>LIHAT VIDEO</span>
                <small>Cara Kerja Sistem</small>
              </div>
            </div>
          </div>
        </div>

        <div class="hero-zedag__image-wrapper">
          <div class="hero-zedag__main-image">
            <img :src="floodRescue" alt="Rescue" />
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════ ABOUT / INTRODUCING ═══════════ -->
    <section class="intro-zedag reveal">
      <div class="container">
        <div class="intro-zedag__grid">
          <div class="intro-zedag__images">
            <div class="intro-zedag__img-large">
              <img :src="floodVolunteers" alt="Relawan" />
            </div>
            <div class="intro-zedag__img-small">
              <img :src="floodEvacuation" alt="Evakuasi" />
            </div>
            <div class="intro-zedag__stat-box">
              <div class="stat-box__num">+12K</div>
              <div class="stat-box__label">Pengungsi Terbantu</div>
            </div>
          </div>
          
          <div class="intro-zedag__content">
            <div class="zedag-tag">MEMPERKENALKAN</div>
            <h2 class="zedag-heading">
              Sistem Terpadu Untuk<br/>Semua Kebutuhan Darurat.
            </h2>
            <p class="intro-zedag__text">
              JAGAYA adalah platform digital terpadu yang menghubungkan pemerintah, relawan, dan masyarakat dalam satu ekosistem tanggap bencana. Kami memastikan setiap bantuan dan tindakan terkoordinasi dengan presisi.
            </p>
            
            <div class="intro-zedag__founder">
              <div class="founder__avatar">
                <img src="https://i.pravatar.cc/150?img=11" alt="Bupati Demak" />
              </div>
              <div class="founder__info">
                <h4>Bupati Demak</h4>
                <p>Kepala Daerah</p>
              </div>
              <div class="founder__features">
                <ul>
                  <li><CheckCircleIcon class="w-5 h-5 text-blue-600"/> Respons real-time 24/7</li>
                  <li><CheckCircleIcon class="w-5 h-5 text-blue-600"/> Transparansi donasi publik</li>
                  <li><CheckCircleIcon class="w-5 h-5 text-blue-600"/> Koordinasi relawan terpusat</li>
                </ul>
              </div>
            </div>

            <div class="intro-zedag__actions">
              <router-link to="/developer" class="btn-zedag btn-zedag--green">
                Pelajari Lebih Lanjut
              </router-link>
              <div class="intro-zedag__contact">
                <div class="contact__icon"><PhoneIcon class="w-5 h-5 text-blue-900" /></div>
                <div>
                  <span class="contact__label">Call For Emergency</span>
                  <span class="contact__number">112 / +62 812-345-678</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════ SERVICES (INFRASTRUKTUR DIGITAL) ═══════════ -->
    <section class="services-zedag reveal" aria-label="Infrastruktur Digital">
      <div class="container services-zedag__inner">
        <div class="services-zedag__split">
          <div class="services-zedag__left-bg"></div>
          <div class="services-zedag__right-bg"></div>
        </div>

        <div class="services-zedag__content grid lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <!-- Left: Tabs -->
          <div class="services-zedag__left lg:col-span-5 relative z-10">
            <div class="zedag-tag">INFRASTRUKTUR DIGITAL</div>

            <h2 class="text-4xl font-black text-slate-900 leading-tight mb-4">
              Pusat Kendali<br/>
              <span class="text-blue-600">Untuk Kemanusiaan.</span>
            </h2>

            <p class="text-gray-600 mb-6 leading-relaxed">
              Platform komprehensif untuk menyatukan data lapangan, komunikasi darurat, dan aksi cepat tanggap.
              Satu pintu pengawasan terpadu—lebih cepat, lebih jelas, lebih terkoordinasi.
            </p>

            <div class="flex flex-col gap-3">
              <button
                v-for="(s, idx) in services"
                :key="idx"
                class="w-full text-left px-6 py-4 rounded-2xl flex items-center gap-4 transition-all border"
                :class="activeService === idx
                  ? 'bg-white shadow-xl border-blue-100 scale-[1.02]'
                  : 'bg-white/70 hover:bg-white border-gray-100 text-slate-600'
                "
                @click="activeService = idx"
              >
                <div
                  class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
                  :class="activeService === idx ? 'bg-blue-600 text-white' : 'bg-slate-100 text-blue-700'"
                >
                  <ShieldCheckIcon v-if="s.icon === 'shield'" class="w-6 h-6" />
                  <HeartIcon v-else-if="s.icon === 'heart'" class="w-6 h-6" />
                  <UsersIcon v-else-if="s.icon === 'users'" class="w-6 h-6" />
                  <MegaphoneIcon v-else-if="s.icon === 'megaphone'" class="w-6 h-6" />
                  <HomeModernIcon v-else class="w-6 h-6" />
                </div>

                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <h4 class="font-black text-slate-900 text-[15px] truncate">{{ s.title }}</h4>
                    <span
                      v-if="activeService === idx"
                      class="text-[10px] font-black uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full"
                    >Aktif</span>
                  </div>

                  <p class="text-xs text-gray-500 mt-1 line-clamp-2">{{ s.desc }}</p>
                </div>
              </button>
            </div>
          </div>

          <!-- Right: Details -->
          <div class="services-zedag__right lg:col-span-7 relative" :key="activeService">
            <div class="bg-white p-2 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden group">
              <div class="aspect-[4/3] rounded-2xl overflow-hidden relative">
                <img
                  :src="services[activeService].image"
                  :alt="services[activeService].title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/35 to-transparent"></div>

                <div class="absolute top-5 left-5 flex items-center gap-2">
                  <span class="inline-flex items-center gap-2 bg-white/15 border border-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-[11px] font-bold">
                    <CheckCircleIcon class="w-4 h-4 text-green-300" /> Real-time
                  </span>
                  <span class="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-[11px] font-bold">
                    <span class="w-2 h-2 rounded-full bg-white" /> LIVE
                  </span>
                </div>

                <div class="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-white">
                  <h3 class="text-2xl font-black mb-2">{{ services[activeService].title }}</h3>
                  <p class="text-sm text-gray-200 mb-5">{{ services[activeService].desc }}</p>

                  <div class="grid grid-cols-2 gap-3 mb-6">
                    <div
                      v-for="f in services[activeService].features"
                      :key="f"
                      class="flex items-center gap-2 text-sm bg-black/20 px-3 py-2 rounded-xl"
                    >
                      <CheckCircleIcon class="w-4 h-4 text-green-300 shrink-0" />
                      <span class="truncate">{{ f }}</span>
                    </div>
                  </div>

                  <div class="flex flex-col sm:flex-row gap-3">
                    <router-link
                      to="/dashboard"
                      class="inline-flex items-center justify-center flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
                    >
                      Lihat Dashboard Interaktif
                    </router-link>
                    <router-link
                      to="/relawan"
                      class="inline-flex items-center justify-center flex-1 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold py-3 rounded-xl transition-colors"
                    >
                      Koordinasi Relawan
                    </router-link>
                  </div>
                </div>
              </div>
            </div>

            <div class="absolute -z-10 top-1/2 -right-14 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
            <div class="absolute -z-10 bottom-0 -left-12 w-48 h-48 bg-green-400/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>


    <!-- ═══════════ PROCESS (OUR SERVICES GRID STYLE IN ZEDAG) ═══════════ -->
    <section class="process-zedag reveal">
      <div class="container">
        <div class="text-center mb-16">
          <div class="zedag-tag mx-auto">ALUR KERJA</div>
          <h2 class="zedag-heading">
            Proses Tanggap Bencana Kami.
          </h2>
          <p class="text-gray-500 max-w-2xl mx-auto mt-4 text-center">
            Langkah demi langkah sistem kami memproses data, memberikan peringatan, dan mengkoordinasikan bantuan ke titik bencana.
          </p>
        </div>

        <div class="max-w-5xl mx-auto relative">
          <!-- Central Line -->
          <div class="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 -translate-x-1/2 hidden md:block"></div>
          
          <div class="space-y-24 relative">
            <div v-for="(step, idx) in [
              { num: '01', color: 'from-orange-500 to-red-500', icon: 'alert', title: 'Deteksi Bencana Banjir', desc: 'Sensor IoT dan laporan warga terintegrasi untuk mendeteksi titik banjir secara real-time.', img: 'https://images.unsplash.com/photo-1501706362039-c6e80973b5f6?auto=format&fit=crop&w=1200&q=80' },
              { num: '02', color: 'from-blue-500 to-indigo-500', icon: 'megaphone', title: 'Peringatan Dini', desc: 'Notifikasi darurat dikirim ke relawan dan warga di area terdampak saat ambang bahaya tercapai.', img: 'https://images.unsplash.com/photo-1581092919531-2c2ad0d7b1a2?auto=format&fit=crop&w=1200&q=80' },
              { num: '03', color: 'from-emerald-500 to-teal-500', icon: 'group', title: 'Mobilisasi Tim SAR', desc: 'Relawan dan tim SAR dikerahkan ke lokasi berdasarkan koordinat GPS dan prioritas krisis.', img: 'https://images.unsplash.com/photo-1520975693411-6f3e3a8dfd8d?auto=format&fit=crop&w=1200&q=80' },
              { num: '04', color: 'from-amber-500 to-yellow-500', icon: 'truck', title: 'Distribusi Bantuan', desc: 'Logistik dikirim ke posko dengan alokasi cerdas berdasarkan kebutuhan dan ketersediaan.', img: 'https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=1200&q=80' },
            ]" :key="idx" 

            class="relative flex flex-col md:flex-row items-center gap-8 md:gap-16 group"
            :class="idx % 2 !== 0 ? 'md:flex-row-reverse' : ''">
              
              <!-- Number Badge (Center on Desktop) -->
              <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white shadow-xl border-4 border-white z-20 hidden md:flex items-center justify-center text-xl font-black text-slate-800">
                {{ step.num }}
              </div>

              <!-- Image Side -->
              <div class="w-full md:w-1/2 relative">
                <div class="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
                  <img :src="step.img" :alt="step.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div class="absolute inset-0 bg-gradient-to-tr opacity-60 mix-blend-multiply" :class="step.color"></div>
                </div>
                <!-- Floating Icon -->
                <div class="absolute -bottom-6 -right-6 md:right-auto" :class="idx % 2 !== 0 ? 'md:-left-6' : 'md:-right-6'">
                  <div class="w-20 h-20 rounded-2xl bg-white shadow-2xl flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform">
                    <ExclamationTriangleIcon v-if="step.icon === 'alert'" class="w-10 h-10 text-orange-500" />
                    <MegaphoneIcon v-else-if="step.icon === 'megaphone'" class="w-10 h-10 text-blue-500" />
                    <UserGroupIcon v-else-if="step.icon === 'group'" class="w-10 h-10 text-emerald-500" />
                    <TruckIcon v-else class="w-10 h-10 text-amber-500" />
                  </div>
                </div>
              </div>

              <!-- Text Side -->
              <div class="w-full md:w-1/2 bg-white md:bg-transparent p-6 md:p-0 rounded-xl md:rounded-none shadow-xl md:shadow-none relative z-10"
                   :class="idx % 2 !== 0 ? 'md:text-right' : 'md:text-left'">
                <div class="md:hidden w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black mb-4">
                  {{ step.num }}
                </div>
                <h3 class="text-3xl font-black text-slate-900 mb-4">{{ step.title }}</h3>
                <p class="text-gray-600 text-lg leading-relaxed">{{ step.desc }}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════ CCTV 24 JAM (KOTA DEMAK) ═══════════ -->
    <section class="cctv-section reveal bg-[#f9f9fc] py-24">
      <div class="container">
        <div class="text-center mb-16">
          <div class="zedag-tag mx-auto">CCTV 24 JAM</div>
          <h2 class="zedag-heading">Kota Demak, Pantau Real-time</h2>
          <p class="text-gray-500 max-w-2xl mx-auto mt-4 text-center">
            Live feed untuk memantau kondisi banjir dan aktivitas di titik rawan.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(v, i) in cctvLinks" :key="i" class="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-white">
            <div class="aspect-video bg-gray-100">
              <iframe
                :src="v.src + '&autoplay=1&mute=1'"
                title="CCTV Demak Live {{ i + 1 }}"
                class="w-full h-full"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
            <div class="p-4">
              <p class="text-[13px] font-bold text-slate-900">{{ v.label }}</p>
              <p class="text-[12px] text-gray-500 font-medium">Update berkala sesuai sumber live.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════ ALBUM BUKU BENCANA ═══════════ -->
    <section class="album-section reveal bg-slate-50 py-24">

      <div class="container">
        <div class="text-center mb-12">
          <div class="zedag-tag mx-auto">DOKUMENTASI</div>
          <h2 class="zedag-heading">Galeri Kondisi Terkini</h2>
          <p class="text-gray-500 max-w-2xl mx-auto mt-4 text-center">
            Lihat rekaman nyata kondisi lapangan melalui album interaktif kami.
          </p>
        </div>

        <div class="album-book-wrapper">
          <button class="album-nav-btn prev" @click="prevAlbumPage" :disabled="currentAlbumPage === 0">
            <ChevronLeftIcon class="w-6 h-6" />
          </button>
          
          <div class="album-book">
            <div class="album-page album-page-left" :key="currentAlbumPage + 'L'">
              <div class="album-img-wrap">
                <img :src="computedAlbumLeft?.src" />
              </div>
              <div class="album-caption">
                <h4>{{ computedAlbumLeft?.caption }}</h4>
                <div class="page-num">{{ currentAlbumPage + 1 }}</div>
              </div>
            </div>

            <div class="album-page album-page-right" :key="currentAlbumPage + 'R'" v-if="computedAlbumRight">
              <div class="album-img-wrap">
                <img :src="computedAlbumRight.src" />
              </div>
              <div class="album-caption">
                <h4>{{ computedAlbumRight.caption }}</h4>
                <div class="page-num">{{ currentAlbumPage + 2 }}</div>
              </div>
            </div>
          </div>

          <button class="album-nav-btn next" @click="nextAlbumPage" :disabled="currentAlbumPage >= albumImages.length - 2">
            <ChevronRightIcon class="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>

    <!-- ═══════════ STATS ═══════════ -->
    <section class="stats reveal" id="stats-section">
      <div class="container">
        <div class="stats-zedag__grid">
          <div class="stat-zedag__item" v-for="s in [
            { key: 'posko', label: 'Posko Aktif', icon: 'building' },
            { key: 'pengungsi', label: 'Pengungsi Terdata', icon: 'users' },
            { key: 'relawan', label: 'Relawan Aktif', icon: 'hand' },
            { key: 'donatur', label: 'Donatur', icon: 'heart' },
          ]" :key="s.key">
            <div class="stat-zedag__icon">
              <BuildingOffice2Icon v-if="s.icon === 'building'" class="w-8 h-8" />
              <UsersIcon v-else-if="s.icon === 'users'" class="w-8 h-8" />
              <HandRaisedIcon v-else-if="s.icon === 'hand'" class="w-8 h-8" />
              <HeartIcon v-else class="w-8 h-8" />
            </div>
            <div class="stat-zedag__info">
              <p class="stat-zedag__num">{{ s.key === 'posko' || s.key === 'donatur' ? counters[s.key] : formatNumber(counters[s.key]) }}+</p>
              <p class="stat-zedag__label">{{ s.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════ CTA BANNER (HOTLINE) ZEDAG STYLE ═══════════ -->
    <section class="cta-zedag reveal">
      <div class="container">
        <div class="cta-zedag__inner">
          <div class="cta-zedag__bg">
            <img :src="floodHero" alt="Background" />
            <div class="cta-zedag__overlay"></div>
          </div>
          
          <div class="cta-zedag__content">
            <div class="cta-zedag__text">
              <h2>Butuh Bantuan Darurat?</h2>
              <p>Tetap Terhubung dengan Sistem Tanggap Bencana JAGAYA</p>
            </div>
            
            <div class="cta-zedag__contact-box">
              <div class="cta-zedag__icon-wrap">
                <PhoneIcon class="w-8 h-8" />
              </div>
              <div class="cta-zedag__contact-info">
                <span>Hotline Darurat 24/7</span>
                <strong>+62 812-345-6789</strong>
              </div>
            </div>

            <router-link to="/donasi" class="btn-zedag btn-zedag--green btn-zedag--lg">
              Donasi Sekarang
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════ FOOTER ═══════════ -->
    <footer class="footer-zedag">
      <div class="container">
        <div class="footer-zedag__top">
          <div class="footer-zedag__brand">
            <div class="footer-zedag__logo">
              <ShieldCheckIcon class="w-8 h-8 text-green-500" />
              <span>JAGAYA</span>
            </div>
            <p class="footer-zedag__desc">
              Platform manajemen bencana terpadu untuk Kabupaten Demak. 
              Menghubungkan pemerintah, relawan, dan masyarakat.
            </p>
            <div class="footer-zedag__socials">
              <a href="#"><GlobeAltIcon class="w-5 h-5"/></a>
              <a href="#"><PhoneIcon class="w-5 h-5"/></a>
              <a href="#"><EnvelopeIcon class="w-5 h-5"/></a>
            </div>
          </div>

          <div class="footer-zedag__links">
            <div class="footer-zedag__col">
              <h4>Layanan</h4>
              <a href="#">Pemetaan Banjir</a>
              <a href="#">Distribusi Logistik</a>
              <a href="#">Koordinasi Relawan</a>
              <a href="#">Peringatan Dini</a>
            </div>
            <div class="footer-zedag__col">
              <h4>Menu Utama</h4>
              <router-link to="/landing">Beranda</router-link>
              <router-link to="/dashboard">Dashboard</router-link>
              <router-link to="/donasi">Donasi</router-link>
              <router-link to="/relawan">Relawan</router-link>
            </div>
            <div class="footer-zedag__col">
              <h4>Newsletter</h4>
              <p class="text-sm text-gray-400 mb-4">Dapatkan update terkini tentang kondisi bencana.</p>
              <div class="footer-zedag__subscribe">
                <input type="email" placeholder="Email Address" />
                <button><ArrowRightIcon class="w-5 h-5"/></button>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-zedag__bottom">
          <p>© 2026 JAGAYA System. All Rights Reserved.</p>
        </div>
      </div>
    </footer>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

/* ═══════════════════════════════════════════════
   ZEDAG THEME TOKENS
   ═══════════════════════════════════════════════ */
:root {
  --zedag-blue-dark: #0f172a;
  --zedag-blue: #1e3a8a; /* Deep corporate blue */
  --zedag-blue-light: #2563eb;
  --zedag-green: #10b981; /* Accent green */
  --zedag-green-hover: #059669;
  --zedag-text: #1f2937;
  --zedag-text-muted: #6b7280;
  --zedag-bg: #ffffff;
  --zedag-surface: #f8fafc;
}

* {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  margin: 0; padding: 0; box-sizing: border-box;
}

.zedag-theme {
  background: var(--zedag-bg);
  color: var(--zedag-text);
  overflow-x: hidden;
}
.container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }

/* Reveal Animation */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Typography & Tags */
.zedag-tag {
  display: inline-block;
  font-size: 12px; font-weight: 700;
  color: var(--zedag-blue-light);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 12px;
  position: relative;
  padding-left: 40px;
}
.zedag-tag::before {
  content: ''; position: absolute;
  left: 0; top: 50%; transform: translateY(-50%);
  width: 30px; height: 2px;
  background: var(--zedag-blue-light);
}
.zedag-tag--white { color: var(--zedag-green); }
.zedag-tag--white::before { background: var(--zedag-green); }

.zedag-heading {
  font-size: clamp(32px, 4vw, 46px);
  font-weight: 800;
  color: var(--zedag-blue-dark);
  line-height: 1.2;
  margin-bottom: 24px;
}
.zedag-heading--white { color: #ffffff; }

/* Buttons */
.btn-zedag {
  display: inline-flex; align-items: center;
  padding: 14px 32px;
  border-radius: 8px; /* Slightly rounded, not fully pill like before */
  font-weight: 700; font-size: 15px;
  text-decoration: none; cursor: pointer;
  transition: all 0.3s ease;
}
.btn-zedag--green {
  background: var(--zedag-green);
  color: #fff;
}
.btn-zedag--green:hover {
  background: var(--zedag-green-hover);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
}
.btn-zedag--blue {
  background: var(--zedag-blue);
  color: #fff;
}
.btn-zedag--blue:hover {
  background: var(--zedag-blue-dark);
  transform: translateY(-2px);
}
.btn-zedag--lg { padding: 18px 40px; font-size: 16px; }

/* ═══════════════════════════════════════════════
   HERO ZEDAG STYLE
   ═══════════════════════════════════════════════ */
.hero-zedag {
  position: relative;
  min-height: 90vh;
  display: flex; align-items: center;
  padding-top: 80px;
  background: var(--zedag-blue-dark); /* Fallback */
}
.hero-zedag__bg {
  position: absolute; inset: 0; z-index: 0;
}
.hero-zedag__img {
  width: 100%; height: 100%; object-fit: cover;
}
.hero-zedag__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(90deg, rgba(15,23,42,0.95) 0%, rgba(30,58,138,0.85) 50%, rgba(37,99,235,0.7) 100%);
}
.hero-zedag__curve {
  position: absolute; bottom: -1px; left: 0; width: 100%; z-index: 2;
}
.hero-zedag__curve svg {
  width: 100%; height: auto; display: block;
}

.hero-zedag__inner {
  position: relative; z-index: 10;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 60px; align-items: center;
  padding-bottom: 100px; /* Space for curve */
}
.hero-zedag__content { color: #fff; }

.hero-zedag__badge {
  display: inline-flex; align-items: center; gap: 12px;
  font-size: 13px; font-weight: 700;
  color: rgba(255,255,255,0.8);
  text-transform: uppercase; letter-spacing: 2px;
  margin-bottom: 24px;
}
.hero-zedag__badge-line {
  width: 40px; height: 2px; background: var(--zedag-green);
}

.hero-zedag__title {
  font-size: clamp(40px, 5vw, 64px);
  font-weight: 800; line-height: 1.1;
  margin-bottom: 24px;
}
.hero-zedag__desc {
  font-size: 16px; color: rgba(255,255,255,0.7);
  line-height: 1.7; margin-bottom: 40px; max-width: 500px;
}
.hero-zedag__actions {
  display: flex; align-items: center; gap: 32px;
}
.hero-zedag__video-btn {
  display: flex; align-items: center; gap: 16px; cursor: pointer;
}
.hero-zedag__play-icon {
  width: 50px; height: 50px; border-radius: 50%;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  display: flex; align-items: center; justify-content: center;
  color: #fff; transition: all 0.3s;
}
.hero-zedag__video-btn:hover .hero-zedag__play-icon {
  background: var(--zedag-green); border-color: var(--zedag-green);
  transform: scale(1.1);
}
.hero-zedag__video-text {
  display: flex; flex-direction: column;
}
.hero-zedag__video-text span { font-size: 14px; font-weight: 700; color: #fff; }
.hero-zedag__video-text small { font-size: 12px; color: rgba(255,255,255,0.6); }

.hero-zedag__image-wrapper { position: relative; }
.hero-zedag__main-image {
  border-radius: 20px; overflow: hidden;
  border: 8px solid rgba(255,255,255,0.1);
  position: relative;
}
.hero-zedag__main-image img {
  width: 100%; height: 500px; object-fit: cover;
}
.hero-zedag__float-badge {
  position: absolute; bottom: 30px; right: -30px;
  background: #fff; padding: 20px; border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  display: flex; flex-direction: column; gap: 12px;
}
.hero-zedag__float-avatars {
  display: flex; margin-left: 10px;
}
.hero-zedag__float-avatars img {
  width: 40px; height: 40px; border-radius: 50%;
  border: 2px solid #fff; margin-left: -10px;
}
.hero-zedag__float-text .stars { display: flex; gap: 2px; margin-bottom: 4px; }
.hero-zedag__float-text span { font-size: 11px; font-weight: 800; color: var(--zedag-text); }


/* ═══════════════════════════════════════════════
   INTRODUCING ZEDAG
   ═══════════════════════════════════════════════ */
.intro-zedag { padding: 100px 0; background: #fff; }
.intro-zedag__grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
}
.intro-zedag__images { position: relative; }
.intro-zedag__img-large {
  border-radius: 16px; overflow: hidden;
}
.intro-zedag__img-large img { width: 100%; height: 500px; object-fit: cover; }
.intro-zedag__img-small {
  position: absolute; bottom: -40px; right: -40px;
  width: 250px; height: 200px; border-radius: 16px;
  border: 8px solid #fff; overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}
.intro-zedag__img-small img { width: 100%; height: 100%; object-fit: cover; }
.intro-zedag__stat-box {
  position: absolute; top: 40px; left: -30px;
  background: var(--zedag-green); color: #fff;
  padding: 24px; border-radius: 12px;
  box-shadow: 0 15px 30px rgba(16, 185, 129, 0.3);
}
.stat-box__num { font-size: 32px; font-weight: 800; line-height: 1; margin-bottom: 8px; }
.stat-box__label { font-size: 14px; font-weight: 600; }

.intro-zedag__text {
  font-size: 16px; color: var(--zedag-text-muted);
  line-height: 1.8; margin-bottom: 32px;
}
.intro-zedag__founder {
  display: flex; align-items: center; gap: 20px;
  padding: 24px; background: var(--zedag-surface);
  border-radius: 12px; margin-bottom: 32px;
  border-left: 4px solid var(--zedag-blue);
}
.founder__avatar img { width: 64px; height: 64px; border-radius: 50%; }
.founder__info h4 { font-size: 18px; font-weight: 800; color: var(--zedag-blue-dark); }
.founder__info p { font-size: 14px; color: var(--zedag-text-muted); }
.founder__features ul { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-left: 20px;}
.founder__features li { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: var(--zedag-blue-dark); }

.intro-zedag__actions {
  display: flex; align-items: center; gap: 32px;
}
.intro-zedag__contact {
  display: flex; align-items: center; gap: 16px;
}
.contact__icon {
  width: 48px; height: 48px; border-radius: 50%;
  background: #eff6ff; display: flex; align-items: center; justify-content: center;
}
.contact__label { display: block; font-size: 12px; color: var(--zedag-text-muted); font-weight: 600; }
.contact__number { display: block; font-size: 18px; font-weight: 800; color: var(--zedag-blue-dark); }


/* ═══════════════════════════════════════════════
   SERVICES (WHY CHOOSE US & TABS)
   ═══════════════════════════════════════════════ */
.services-zedag {
  position: relative; padding: 100px 0; background: #fff;
}
.services-zedag__split {
  position: absolute; inset: 0; display: flex; z-index: 0;
}
.services-zedag__left-bg {
  width: 45%; background: #f1f5f9;
  border-top-right-radius: 100px; /* Slight curve like Zedag */
}
.services-zedag__right-bg { width: 55%; background: var(--zedag-surface); }

.services-zedag__inner { position: relative; z-index: 1; }
.services-zedag__content {
  display: grid; grid-template-columns: 45% 55%;
}

/* Left side content */
.services-zedag__left {
  padding: 60px 60px 60px 0;
}
.services-zedag__desc {
  font-size: 16px; line-height: 1.8; margin-bottom: 40px; font-weight: 500;
}
.services-zedag__tabs {
  display: flex; flex-direction: column; gap: 12px;
}
.services-zedag__tab {
  display: flex; align-items: center; gap: 16px;
  width: 100%; text-align: left;
  padding: 16px 24px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  color: var(--zedag-text); font-size: 15px; font-weight: 700;
  cursor: pointer; transition: all 0.3s;
  position: relative; overflow: hidden;
}
.services-zedag__tab:hover { background: #f8fafc; }
.services-zedag__tab.active { background: #fff; color: var(--zedag-blue-dark); }
.tab-indicator {
  position: absolute; left: 0; top: 0; bottom: 0;
  width: 4px; background: var(--zedag-green);
  transform: scaleY(0); transition: transform 0.3s;
}
.services-zedag__tab.active .tab-indicator { transform: scaleY(1); }
.services-zedag__tab.active svg { color: var(--zedag-green); }

/* Right side content */
.services-zedag__right {
  padding: 60px 0 60px 60px;
  display: flex; align-items: center;
}
.services-zedag__image-panel {
  width: 100%; border-radius: 16px; overflow: hidden;
  box-shadow: 0 25px 50px rgba(0,0,0,0.1);
  position: relative; background: #fff;
}
.services-zedag__image-panel img {
  width: 100%; height: 350px; object-fit: cover;
}
.services-zedag__detail-box {
  padding: 40px;
}
.detail-box__title {
  font-size: 24px; font-weight: 800; color: var(--zedag-blue-dark); margin-bottom: 16px;
}
.detail-box__desc {
  font-size: 15px; color: var(--zedag-text-muted); line-height: 1.7; margin-bottom: 24px;
}
.detail-box__list {
  list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
}
.detail-box__list li {
  display: flex; align-items: center; gap: 10px;
  font-size: 14px; font-weight: 600; color: var(--zedag-blue-dark);
}


/* ═══════════════════════════════════════════════
   PROCESS (OUR SERVICES ZEDAG STYLE)
   ═══════════════════════════════════════════════ */
.process-zedag { padding: 100px 0; background: var(--zedag-surface); }
.process-zedag__grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px;
}
.process-zedag__card {
  background: #fff; border-radius: 12px; overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  transition: transform 0.3s; border: 1px solid #f1f5f9;
}
.process-zedag__card:hover { transform: translateY(-10px); }
.process-zedag__card-img {
  position: relative; height: 200px;
}
.process-zedag__card-img img {
  width: 100%; height: 100%; object-fit: cover;
}
.process-zedag__card-icon {
  position: absolute; bottom: -24px; right: 24px;
  width: 56px; height: 56px; border-radius: 50%;
  background: var(--zedag-blue); color: #fff;
  display: flex; align-items: center; justify-content: center;
  border: 4px solid #fff;
}
.process-zedag__card-content {
  padding: 32px 24px 24px; position: relative;
}
.process-zedag__step-num {
  font-size: 40px; font-weight: 900; color: #f1f5f9;
  position: absolute; top: 20px; left: 24px; z-index: 0;
  line-height: 1;
}
.process-zedag__card h3 {
  font-size: 18px; font-weight: 800; color: var(--zedag-blue-dark);
  margin-bottom: 12px; position: relative; z-index: 1;
}
.process-zedag__card p {
  font-size: 14px; color: var(--zedag-text-muted); line-height: 1.6;
  margin-bottom: 24px; position: relative; z-index: 1;
}
.process-zedag__card-footer {
  border-top: 1px solid #f1f5f9; padding-top: 16px;
}
.process-zedag__link {
  display: inline-flex; align-items: center; justify-content: center;
  width: 36px; height: 36px; border-radius: 8px;
  background: #f8fafc; color: var(--zedag-blue); transition: all 0.3s;
}
.process-zedag__card:hover .process-zedag__link {
  background: var(--zedag-green); color: #fff;
}

/* ═══════════════════════════════════════════════
   GALLERY MOSAIC
   ═══════════════════════════════════════════════ */
.gallery__mosaic {
  display: grid; grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 260px; gap: 16px;
}
.gallery__item {
  border-radius: 12px; overflow: hidden; position: relative; cursor: pointer;
}
.gallery__item img {
  width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s;
}
.gallery__item:hover img { transform: scale(1.08); }
.gallery__caption {
  position: absolute; inset: 0;
  background: linear-gradient(0deg, rgba(15,23,42,0.9) 0%, transparent 60%);
  display: flex; flex-direction: column; justify-content: flex-end;
  padding: 24px; opacity: 0; transition: opacity 0.4s;
}
.gallery__item:hover .gallery__caption { opacity: 1; }
.gallery__caption h3 { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 6px; }
.gallery__caption p { font-size: 13px; color: rgba(255,255,255,0.7); }
.gallery__item--tall { grid-row: span 2; }
.gallery__item--wide { grid-column: span 2; }


/* ═══════════════════════════════════════════════
   STATS
   ═══════════════════════════════════════════════ */
.stats { padding: 60px 0; background: #fff; border-bottom: 1px solid #f1f5f9; }
.stats-zedag__grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px;
}
.stat-zedag__item {
  display: flex; align-items: center; gap: 20px;
  padding: 24px; border-radius: 12px; background: var(--zedag-surface);
  transition: all 0.3s; border: 1px solid #f1f5f9;
}
.stat-zedag__item:hover {
  background: var(--zedag-blue); color: #fff;
  transform: translateY(-5px); box-shadow: 0 15px 30px rgba(30,58,138,0.2);
}
.stat-zedag__icon {
  width: 64px; height: 64px; border-radius: 12px;
  background: #fff; color: var(--zedag-blue);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}
.stat-zedag__info { flex: 1; }
.stat-zedag__num { font-size: 28px; font-weight: 900; margin-bottom: 4px; line-height: 1; }
.stat-zedag__item:hover .stat-zedag__num { color: #fff; }
.stat-zedag__label { font-size: 13px; font-weight: 600; color: var(--zedag-text-muted); }
.stat-zedag__item:hover .stat-zedag__label { color: rgba(255,255,255,0.8); }

/* ═══════════════════════════════════════════════
   CTA BANNER ZEDAG STYLE
   ═══════════════════════════════════════════════ */
.cta-zedag { padding: 100px 0; background: #fff; }
.cta-zedag__inner {
  position: relative; border-radius: 16px; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  padding: 80px 40px; text-align: center;
}
.cta-zedag__bg { position: absolute; inset: 0; z-index: 0; }
.cta-zedag__bg img { width: 100%; height: 100%; object-fit: cover; }
.cta-zedag__overlay {
  position: absolute; inset: 0;
  background: var(--zedag-blue); opacity: 0.95;
}
.cta-zedag__content {
  position: relative; z-index: 1; color: #fff;
  display: flex; flex-direction: column; align-items: center; gap: 32px;
}
.cta-zedag__text h2 { font-size: 40px; font-weight: 800; margin-bottom: 12px; }
.cta-zedag__text p { font-size: 18px; color: rgba(255,255,255,0.8); }

.cta-zedag__contact-box {
  display: flex; align-items: center; gap: 20px;
  background: rgba(255,255,255,0.1); padding: 20px 40px;
  border-radius: 50px; border: 1px solid rgba(255,255,255,0.2);
}
.cta-zedag__icon-wrap {
  width: 56px; height: 56px; border-radius: 50%;
  background: var(--zedag-green); display: flex; align-items: center; justify-content: center;
}
.cta-zedag__contact-info { display: flex; flex-direction: column; align-items: flex-start; }
.cta-zedag__contact-info span { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 1px;}
.cta-zedag__contact-info strong { font-size: 24px; font-weight: 800; }

/* ═══════════════════════════════════════════════
   FOOTER ZEDAG STYLE
   ═══════════════════════════════════════════════ */
.footer-zedag { background: #0b1120; color: #94a3b8; padding-top: 80px; }
.footer-zedag__top {
  display: grid; grid-template-columns: 1fr 2fr; gap: 60px;
  padding-bottom: 60px; border-bottom: 1px solid rgba(255,255,255,0.05);
}
.footer-zedag__logo {
  display: flex; align-items: center; gap: 12px; margin-bottom: 24px;
}
.footer-zedag__logo span { font-size: 24px; font-weight: 900; color: #fff; }
.footer-zedag__desc { font-size: 15px; line-height: 1.8; margin-bottom: 32px; }
.footer-zedag__socials { display: flex; gap: 12px; }
.footer-zedag__socials a {
  width: 40px; height: 40px; border-radius: 8px;
  background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center;
  color: #fff; transition: all 0.3s;
}
.footer-zedag__socials a:hover { background: var(--zedag-green); }

.footer-zedag__links { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
.footer-zedag__col h4 {
  font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 24px;
}
.footer-zedag__col a {
  display: block; font-size: 14px; color: #94a3b8; text-decoration: none;
  padding: 8px 0; transition: all 0.3s;
}
.footer-zedag__col a:hover { color: var(--zedag-green); transform: translateX(5px); }

.footer-zedag__subscribe {
  display: flex; background: rgba(255,255,255,0.05);
  border-radius: 8px; overflow: hidden;
}
.footer-zedag__subscribe input {
  flex: 1; background: transparent; border: none; padding: 14px 20px;
  color: #fff; outline: none; font-size: 14px;
}
.footer-zedag__subscribe button {
  padding: 0 20px; background: var(--zedag-green); border: none;
  color: #fff; cursor: pointer; transition: background 0.3s;
}
.footer-zedag__subscribe button:hover { background: var(--zedag-green-hover); }

.footer-zedag__bottom {
  padding: 24px 0; text-align: center; font-size: 14px;
}

/* ═══════════════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════════════ */
@media (max-width: 1024px) {
  .hero-zedag__inner { grid-template-columns: 1fr; text-align: center; padding-bottom: 60px; }
  .hero-zedag__actions { justify-content: center; }
  .hero-zedag__image-wrapper { display: none; }
  .intro-zedag__grid { grid-template-columns: 1fr; gap: 40px; }
  .intro-zedag__images { max-width: 500px; margin: 0 auto; }
  
  .services-zedag__content { grid-template-columns: 1fr; }
  .services-zedag__split { display: none; }
  .services-zedag__left { padding: 40px; background: var(--zedag-blue); border-radius: 16px; margin-bottom: 40px; }
  .services-zedag__right { padding: 0; }
  
  .process-zedag__grid { grid-template-columns: repeat(2, 1fr); }
  .stats-zedag__grid { grid-template-columns: repeat(2, 1fr); }
  .gallery__mosaic { grid-template-columns: repeat(2, 1fr); }
  
  .footer-zedag__top { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .hero-zedag__actions { flex-direction: column; gap: 20px; }
  .process-zedag__grid { grid-template-columns: 1fr; }
  .stats-zedag__grid { grid-template-columns: 1fr; }
  .gallery__mosaic { grid-template-columns: 1fr; }
  .gallery__item--wide { grid-column: span 1; }
  .footer-zedag__links { grid-template-columns: 1fr; gap: 40px; }
  .intro-zedag__actions { flex-direction: column; align-items: flex-start; gap: 20px; }
  .cta-zedag__content { gap: 20px; }
  .cta-zedag__contact-box { flex-direction: column; padding: 20px; text-align: center; }
  .album-book { flex-direction: column; }
  .album-book-wrapper { flex-direction: column; gap: 20px; }
  .album-page { border-radius: 12px !important; }
}

/* ═══════════════════════════════════════════════
   ALBUM BOOK
   ═══════════════════════════════════════════════ */
.album-book-wrapper {
  display: flex; align-items: center; justify-content: center; gap: 40px;
  max-width: 1000px; margin: 0 auto;
}
.album-book {
  display: flex; flex: 1;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 30px 60px rgba(0,0,0,0.1);
  perspective: 1500px;
}
.album-page {
  flex: 1; padding: 30px;
  display: flex; flex-direction: column;
  background: #fff;
  animation: pageFlip 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.album-page-left {
  border-right: 2px solid #f1f5f9;
  border-radius: 16px 0 0 16px;
  transform-origin: right center;
}
.album-page-right {
  border-left: 1px solid #e2e8f0;
  border-radius: 0 16px 16px 0;
  transform-origin: left center;
}
.album-img-wrap {
  flex: 1; border-radius: 8px; overflow: hidden;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.05);
}
.album-img-wrap img {
  width: 100%; height: 300px; object-fit: cover;
  transition: transform 0.3s;
}
.album-img-wrap:hover img { transform: scale(1.05); }
.album-caption {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 20px; padding-top: 20px; border-top: 1px solid #f1f5f9;
}
.album-caption h4 { font-size: 16px; font-weight: 700; color: var(--zedag-blue-dark); }
.page-num {
  width: 32px; height: 32px; border-radius: 50%; background: var(--zedag-surface);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 800; color: var(--zedag-text-muted);
}
.album-nav-btn {
  width: 56px; height: 56px; border-radius: 50%;
  background: #fff; color: var(--zedag-blue);
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  display: flex; align-items: center; justify-content: center;
  border: none; cursor: pointer; transition: all 0.3s;
}
.album-nav-btn:hover:not(:disabled) {
  background: var(--zedag-green); color: #fff; transform: translateY(-3px);
}
.album-nav-btn:disabled { opacity: 0.5; cursor: not-allowed; }

@keyframes pageFlip {
  0% { opacity: 0; transform: rotateY(20deg); }
  100% { opacity: 1; transform: rotateY(0deg); }
}
</style>
