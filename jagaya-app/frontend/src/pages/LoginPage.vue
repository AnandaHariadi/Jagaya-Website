<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { authService } from '../services/authService'
import { ShieldCheckIcon } from '@heroicons/vue/24/solid'
import logoImg from '../assets/logo-jagaya.png'
import fotoImg from '../assets/foto.png'

const router = useRouter()
const route = useRoute()
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const role = ref('petugas') // Default role
const errorMsg = ref('')

const handleLogin = async () => {
  if (!email.value || !password.value) return
  
  isLoading.value = true
  errorMsg.value = ''
  
  try {
    await authService.login(email.value, password.value, role.value)
    
    if (role.value === 'masyarakat') {
      router.push('/public-dashboard')
    } else {
      const redirect = route.query.redirect
      router.push(redirect ? String(redirect) : '/dashboard')
    }
  } catch (err) {
    errorMsg.value = err.response?.data?.error || 'Gagal login. Silakan periksa koneksi dan kredensial Anda.'
  } finally {
    isLoading.value = false
  }
}
</script>


<template>
  <div class="min-h-screen bg-white flex relative overflow-hidden font-sans">
    <!-- Wavy Background Decor for the entire page -->
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div class="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-orange-50 rounded-full blur-[100px] opacity-70"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-50 rounded-full blur-[100px] opacity-70"></div>
    </div>

    <!-- Left Side: Image / Branding -->
    <div class="hidden lg:flex lg:w-1/2 relative z-10 flex-col items-center justify-center p-12 overflow-hidden">
      <!-- Background Image with Gradient Overlay -->
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1200&q=80" alt="Banjir Demak" class="w-full h-full object-cover opacity-30" />
        <div class="absolute inset-0 bg-gradient-to-br from-orange-600/90 to-red-700/90 mix-blend-multiply"></div>
      </div>

      <!-- Fluid Blob Shape Overlay -->
      <div class="absolute inset-0 flex items-center justify-center z-10">
        <div class="w-[80%] h-[80%] bg-gradient-to-tr from-orange-500/30 to-red-500/30 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-3xl animate-blob"></div>
      </div>

      <!-- Content -->
      <div class="relative z-20 text-center text-white max-w-lg">
        <div class="inline-flex w-[144px] h-[144px] bg-white rounded-3xl p-1 mx-auto mb-8 items-center justify-center shadow-2xl transform -rotate-6">
          <img :src="logoImg" alt="JAGAYA" class="w-full h-full object-contain transform scale-150" />
        </div>
        <h1 class="text-5xl font-black mb-6 tracking-tight">JAGAYA System</h1>
        <p class="text-lg font-medium text-white/90 leading-relaxed mb-8">
          Platform manajemen tanggap darurat terpadu. Akses portal command center untuk pemantauan real-time dan distribusi bantuan bencana.
        </p>
        
        <!-- Stats Mini Card -->
        <div class="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 flex justify-around">
          <div>
            <p class="text-3xl font-black">45</p>
            <p class="text-[11px] font-bold uppercase tracking-wider text-orange-200">Posko Aktif</p>
          </div>
          <div class="w-px bg-white/20"></div>
          <div>
            <p class="text-3xl font-black">1.2K</p>
            <p class="text-[11px] font-bold uppercase tracking-wider text-orange-200">Relawan</p>
          </div>
        </div>
      </div>

      <!-- Founder Profile Pill -->
      <div class="absolute bottom-8 left-8 z-20">
        <div class="flex items-center gap-4 bg-black/40 backdrop-blur-lg border border-white/10 px-5 py-3 rounded-full hover:bg-black/50 transition-colors cursor-default shadow-xl">
          <img :src="fotoImg" class="w-12 h-12 rounded-full border-2 border-orange-500 object-cover shadow-[0_0_15px_rgba(249,115,22,0.4)]" alt="Founder" />
          <div class="text-left pr-2">
            <p class="text-white font-bold text-[14px]">M. Ananda Hariadi</p>
            <p class="text-orange-400 text-xs font-black tracking-wider uppercase">Founder JAGAYA</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side: Login Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative z-10">
      <div class="w-full max-w-md bg-white p-10 rounded-[40px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] border border-gray-100 relative">
        <!-- Small decorative element -->
        <div class="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full blur-2xl opacity-20"></div>

        <div class="text-center mb-8 relative z-10">
          <h2 class="text-3xl font-black text-gray-900 tracking-tight mb-2">Selamat Datang</h2>
          <p class="text-[15px] font-medium text-gray-500 mb-4">Silakan masuk menggunakan kredensial Anda.</p>
          
          <div class="p-3 bg-orange-50 rounded-xl text-left border border-orange-100">
            <p class="text-xs font-bold text-orange-800 mb-1">Akun Demo Petugas:</p>
            <p class="text-xs text-orange-600 mb-2 font-mono">demo@petugas.com | demo123</p>
            <p class="text-xs font-bold text-orange-800 mb-1">Akun Demo Masyarakat:</p>
            <p class="text-xs text-orange-600 font-mono">demo@warga.com | demo123</p>
          </div>
        </div>

        <form class="space-y-6 relative z-10" @submit.prevent="handleLogin">
          <!-- Role Selection Tabs -->
          <div class="flex p-1 bg-gray-100 rounded-xl mb-6">
            <button type="button" @click="role = 'petugas'" :class="role === 'petugas' ? 'bg-white shadow text-orange-600' : 'text-gray-500 hover:text-gray-700'" class="flex-1 py-2 text-sm font-bold rounded-lg transition-all">Petugas</button>
            <button type="button" @click="role = 'masyarakat'" :class="role === 'masyarakat' ? 'bg-white shadow text-orange-600' : 'text-gray-500 hover:text-gray-700'" class="flex-1 py-2 text-sm font-bold rounded-lg transition-all">Masyarakat</button>
          </div>

          <div v-if="errorMsg" class="bg-red-50 text-red-600 border border-red-200 px-4 py-3 rounded-xl text-sm font-bold text-center">
            {{ errorMsg }}
          </div>

          <div>
            <label for="email" class="block text-[13px] font-bold text-gray-700 uppercase tracking-wide mb-2">{{ role === 'petugas' ? 'Email / ID Petugas' : 'Email Anda' }}</label>
            <div class="mt-1">
              <input id="email" name="email" type="email" autocomplete="email" required v-model="email" 
                     class="appearance-none block w-full px-5 py-3.5 border border-gray-200 rounded-2xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-medium text-[15px] transition-all bg-gray-50 focus:bg-white" 
                     :placeholder="role === 'petugas' ? 'contoh@relawan.demak.go.id' : 'email@contoh.com'" />
            </div>
          </div>

          <div>
            <label for="password" class="block text-[13px] font-bold text-gray-700 uppercase tracking-wide mb-2">Kata Sandi</label>
            <div class="mt-1">
              <input id="password" name="password" type="password" autocomplete="current-password" required v-model="password" 
                     class="appearance-none block w-full px-5 py-3.5 border border-gray-200 rounded-2xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-medium text-[15px] transition-all bg-gray-50 focus:bg-white" 
                     placeholder="••••••••" />
            </div>
          </div>

          <div class="flex items-center justify-between mt-6">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded" />
              <label for="remember-me" class="ml-2 block text-[13px] font-bold text-gray-600">Ingat saya</label>
            </div>
            <div class="text-[13px]">
              <a href="#" class="font-bold text-orange-600 hover:text-orange-500 transition-colors">Lupa sandi?</a>
            </div>
          </div>

          <div class="pt-4">
            <button type="submit" :disabled="isLoading" 
                    class="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-[0_10px_20px_rgba(249,115,22,0.2)] text-[15px] font-black text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0">
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? 'Memverifikasi...' : 'Masuk ke Sistem' }}
            </button>
          </div>
        </form>

        <div class="mt-8 text-center border-t border-gray-100 pt-8 space-y-3">
          <p v-if="role === 'masyarakat'" class="text-[13px] font-medium text-gray-500">
            Belum punya akun? 
            <router-link to="/register" class="font-bold text-orange-600 hover:text-red-600 transition-colors">Daftar Sekarang</router-link>
          </p>
          <p class="text-[13px] font-medium text-gray-500">
            Kembali ke 
            <router-link to="/landing" class="font-bold text-orange-600 hover:text-red-600 transition-colors">Beranda Publik</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes blob {
  0% { border-radius: 60% 40% 30% 70%/60% 30% 70% 40%; }
  50% { border-radius: 30% 60% 70% 40%/50% 60% 30% 60%; }
  100% { border-radius: 60% 40% 30% 70%/60% 30% 70% 40%; }
}
.animate-blob { animation: blob 10s ease-in-out infinite; }
</style>
