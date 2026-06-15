<script setup>
import { ref } from 'vue'
import PublicLayout from '../components/PublicLayout.vue'
import { HeartIcon, UserGroupIcon, ShieldExclamationIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'

const stats = ref([
  { id: 1, name: 'Dana Terkumpul', value: 'Rp 45.2M', icon: HeartIcon, color: 'text-pink-600', bg: 'bg-pink-100' },
  { id: 2, name: 'Relawan Aktif', value: '1,240', icon: UserGroupIcon, color: 'text-orange-600', bg: 'bg-orange-100' },
  { id: 3, name: 'Area Terdampak', value: '12 Desa', icon: ShieldExclamationIcon, color: 'text-red-600', bg: 'bg-red-100' },
])

const recentUpdates = ref([
  { id: 1, title: 'Bantuan Logistik Tiba di Posko Karanganyar', date: 'Hari ini, 14:30', status: 'Selesai' },
  { id: 2, title: 'Evakuasi Warga Dukuh Tugu', date: 'Hari ini, 10:15', status: 'Proses' },
  { id: 3, title: 'Pembukaan Dapur Umum Sentral Mijen', date: 'Kemarin, 16:00', status: 'Selesai' },
])
</script>

<template>
  <PublicLayout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <!-- Welcome Section -->
      <div class="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden mb-10">
        <div class="absolute top-0 right-0 -mt-4 -mr-4 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div class="relative z-10 max-w-3xl">
          <h1 class="text-4xl sm:text-5xl font-black mb-4 tracking-tight">Bersama Hadapi Bencana</h1>
          <p class="text-lg text-white/90 mb-8 font-medium leading-relaxed">
            Portal Informasi dan Partisipasi Masyarakat Kabupaten Demak. Salurkan bantuan Anda atau bergabunglah menjadi pahlawan kemanusiaan hari ini.
          </p>
          <div class="flex flex-wrap gap-4">
            <router-link to="/public-donasi" class="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-lg flex items-center gap-2">
              Donasi Sekarang <ArrowRightIcon class="w-4 h-4" />
            </router-link>
            <router-link to="/public-relawan" class="bg-orange-700/50 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-xl font-bold hover:bg-orange-700/70 transition-colors flex items-center gap-2">
              Daftar Relawan
            </router-link>
            <router-link to="/laporan-warga" class="bg-white/10 backdrop-blur-md text-white border border-white/30 px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-colors flex items-center gap-2">
              Lapor Kondisi
            </router-link>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div v-for="stat in stats" :key="stat.id" class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
          <div :class="[stat.bg, stat.color]" class="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
            <component :is="stat.icon" class="w-7 h-7" />
          </div>
          <div>
            <p class="text-sm font-bold text-gray-500 uppercase tracking-wide">{{ stat.name }}</p>
            <p class="text-3xl font-black text-gray-900 mt-1">{{ stat.value }}</p>
          </div>
        </div>
      </div>

      <!-- Recent Updates -->
      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-black text-gray-900">Pembaruan Lapangan</h2>
        </div>
        <div class="space-y-4">
          <div v-for="update in recentUpdates" :key="update.id" class="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-orange-50/50 hover:border-orange-100 transition-colors">
            <div>
              <h3 class="text-lg font-bold text-gray-900">{{ update.title }}</h3>
              <p class="text-sm text-gray-500 font-medium mt-1">{{ update.date }}</p>
            </div>
            <div class="mt-3 sm:mt-0">
              <span :class="update.status === 'Selesai' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'" class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                {{ update.status }}
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </PublicLayout>
</template>
