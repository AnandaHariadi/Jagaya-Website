<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logoImg from '../assets/logo-jagaya.png'

const router = useRouter()
const form = ref({
  nama: '',
  email: '',
  password: '',
  confirmPassword: ''
})
const isLoading = ref(false)
const errorMsg = ref('')

const handleRegister = () => {
  if (form.value.password !== form.value.confirmPassword) {
    errorMsg.value = 'Kata sandi tidak cocok!'
    return
  }
  
  isLoading.value = true
  errorMsg.value = ''
  
  // Mock registration delay
  setTimeout(() => {
    // Automatically log in as 'masyarakat' after registration
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('userRole', 'masyarakat')
    router.push('/public-dashboard')
    isLoading.value = false
  }, 1000)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
    <!-- Wavy Background Decor -->
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div class="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange-200 rounded-full blur-[100px] opacity-50"></div>
      <div class="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-red-200 rounded-full blur-[100px] opacity-50"></div>
    </div>

    <div class="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
      <div class="flex justify-center mb-6">
        <div class="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center p-3">
          <img :src="logoImg" alt="JAGAYA" class="w-full h-full object-contain" />
        </div>
      </div>
      <h2 class="text-center text-3xl font-black text-gray-900 tracking-tight">Daftar Akun Masyarakat</h2>
      <p class="mt-2 text-center text-sm text-gray-600 font-medium">
        Sudah punya akun?
        <router-link to="/login" class="font-bold text-orange-600 hover:text-orange-500">Masuk di sini</router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
      <div class="bg-white py-8 px-4 shadow sm:rounded-3xl sm:px-10 border border-gray-100">
        
        <div v-if="errorMsg" class="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-bold text-center">
          {{ errorMsg }}
        </div>

        <form class="space-y-6" @submit.prevent="handleRegister">
          <div>
            <label for="nama" class="block text-sm font-bold text-gray-700">Nama Lengkap</label>
            <div class="mt-1">
              <input id="nama" name="nama" type="text" required v-model="form.nama" class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-colors" placeholder="Nama Anda" />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-bold text-gray-700">Email</label>
            <div class="mt-1">
              <input id="email" name="email" type="email" autocomplete="email" required v-model="form.email" class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-colors" placeholder="email@contoh.com" />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-bold text-gray-700">Kata Sandi</label>
            <div class="mt-1">
              <input id="password" name="password" type="password" required v-model="form.password" class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-colors" placeholder="••••••••" />
            </div>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-bold text-gray-700">Konfirmasi Kata Sandi</label>
            <div class="mt-1">
              <input id="confirmPassword" name="confirmPassword" type="password" required v-model="form.confirmPassword" class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-colors" placeholder="••••••••" />
            </div>
          </div>

          <div>
            <button type="submit" :disabled="isLoading" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all disabled:opacity-70">
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? 'Memproses...' : 'Daftar Sekarang' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
