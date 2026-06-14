<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  ChatBubbleLeftRightIcon, HandThumbUpIcon, PaperAirplaneIcon,
  MagnifyingGlassIcon, MapPinIcon, UserCircleIcon, ClockIcon
} from '@heroicons/vue/24/outline'
import { HandThumbUpIcon as ThumbSolid } from '@heroicons/vue/24/solid'

import { forumService } from '../services/forumService'
import { authService } from '../services/authService'

const categories = ['Infrastruktur', 'Logistik', 'Evakuasi', 'Kesehatan', 'Lainnya']

const posts = ref([])
const liked = ref([]) // IDs of posts liked in this session

const loadPosts = async () => {
  try {
    posts.value = await forumService.getAll()
  } catch (err) {
    console.error('Failed to load forum posts:', err)
  }
}

onMounted(loadPosts)

/* ── FORM ── */
const form = ref({ nama: authService.getUserName() || '', kategori: 'Infrastruktur', isi: '' })
const submitted = ref(false)
const submitAspirasi = async () => {
  if (!form.value.isi.trim()) return
  
  try {
    const newPost = await forumService.create({
      nama: form.value.nama.trim(),
      kategori: form.value.kategori,
      isi: form.value.isi.trim()
    })
    posts.value.unshift(newPost)
    form.value.isi = ''
    submitted.value = true
    setTimeout(() => submitted.value = false, 2500)
  } catch (err) {
    alert('Gagal mengirim aspirasi: ' + (err.response?.data?.error || err.message))
  }
}

/* ── LIKE ── */
const isLiked = (id) => liked.value.includes(id)
const toggleLike = async (post) => {
  // Optimistic UI update
  const initiallyLiked = isLiked(post.id)
  if (initiallyLiked) {
    post.likes--
    liked.value = liked.value.filter(i => i !== post.id)
  } else {
    post.likes++
    liked.value.push(post.id)
  }
  
  try {
    const res = await forumService.toggleLike(post.id)
    post.likes = res.likes // sync with server truth
  } catch (err) {
    // Revert optimistic update
    if (initiallyLiked) {
      post.likes++
      liked.value.push(post.id)
    } else {
      post.likes--
      liked.value = liked.value.filter(i => i !== post.id)
    }
    console.error('Failed to toggle like:', err)
  }
}

/* ── FILTER + SEARCH ── */
const activeCat = ref('Semua')
const search = ref('')
const filtered = computed(() => {
  let list = posts.value
  if (activeCat.value !== 'Semua') list = list.filter(p => p.kategori === activeCat.value)
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    list = list.filter(p => p.isi.toLowerCase().includes(q) || p.nama.toLowerCase().includes(q))
  }
  return list
})

const catColor = (c) => ({
  'Infrastruktur': 'bg-orange-100 text-orange-700',
  'Logistik': 'bg-emerald-100 text-emerald-700',
  'Evakuasi': 'bg-red-100 text-red-700',
  'Kesehatan': 'bg-blue-100 text-blue-700',
  'Lainnya': 'bg-gray-100 text-gray-700',
}[c] || 'bg-gray-100 text-gray-700')
</script>

<template>
  <div class="bg-gray-50 min-h-screen font-sans pb-24">
    <!-- Hero -->
    <section class="relative bg-gradient-to-br from-orange-600 via-red-600 to-red-700 pt-28 pb-20 overflow-hidden">
      <div class="absolute inset-0 opacity-10" style="background-image:radial-gradient(circle at 1px 1px, white 1px, transparent 0);background-size:24px 24px"></div>
      <div class="max-w-5xl mx-auto px-6 relative text-center text-white">
        <div class="inline-flex items-center gap-2 bg-white/15 border border-white/25 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5">
          <ChatBubbleLeftRightIcon class="w-4 h-4" /> Suara Warga Demak
        </div>
        <h1 class="text-4xl md:text-5xl font-black leading-tight mb-4">Forum Aspirasi Terbuka</h1>
        <p class="text-white/80 max-w-2xl mx-auto text-lg">Sampaikan keluhan, usulan, dan kebutuhan Anda secara langsung. Setiap suara membantu kami merespons lebih cepat dan tepat sasaran.</p>
      </div>
    </section>

    <div class="max-w-5xl mx-auto px-6 -mt-10 relative z-10">
      <!-- Submit form -->
      <div class="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 md:p-8 mb-8">
        <h2 class="text-lg font-black text-gray-900 mb-5 flex items-center gap-2">
          <PaperAirplaneIcon class="w-5 h-5 text-orange-500" /> Kirim Aspirasi Anda
        </h2>
        <div class="grid md:grid-cols-2 gap-4 mb-4">
          <input v-model="form.nama" type="text" placeholder="Nama (boleh dikosongkan)"
            class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none" />
          <select v-model="form.kategori"
            class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none bg-white">
            <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>
        <textarea v-model="form.isi" rows="3" placeholder="Tuliskan aspirasi, keluhan, atau usulan Anda di sini..."
          class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none resize-none mb-4"></textarea>
        <div class="flex items-center justify-between gap-4">
          <transition name="fade">
            <p v-if="submitted" class="text-sm font-bold text-green-600">✓ Aspirasi terkirim. Terima kasih!</p>
          </transition>
          <button @click="submitAspirasi" :disabled="!form.isi.trim()"
            class="ml-auto inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:from-orange-600 hover:to-red-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
            <PaperAirplaneIcon class="w-5 h-5" /> Kirim
          </button>
        </div>
      </div>

      <!-- Filter bar -->
      <div class="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div class="flex flex-wrap gap-2">
          <button v-for="c in ['Semua', ...categories]" :key="c" @click="activeCat = c"
            class="px-4 py-2 rounded-full text-xs font-bold transition-all"
            :class="activeCat === c ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300'">
            {{ c }}
          </button>
        </div>
        <div class="relative md:ml-auto md:w-64">
          <MagnifyingGlassIcon class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          <input v-model="search" type="text" placeholder="Cari aspirasi..."
            class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none" />
        </div>
      </div>

      <!-- Posts -->
      <div class="space-y-4">
        <p class="text-sm text-gray-500 font-medium">{{ filtered.length }} aspirasi ditampilkan</p>
        <transition-group name="list" tag="div" class="space-y-4">
          <div v-for="p in filtered" :key="p.id"
            class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div class="flex items-start gap-4">
              <div class="w-11 h-11 rounded-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center shrink-0">
                <UserCircleIcon class="w-7 h-7 text-orange-500" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap mb-1">
                  <span class="font-bold text-gray-900 text-sm">{{ p.nama }}</span>
                  <span :class="catColor(p.kategori)" class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide">{{ p.kategori }}</span>
                  <span class="text-xs text-gray-400 flex items-center gap-1 ml-auto"><ClockIcon class="w-3.5 h-3.5" /> {{ p.waktu }}</span>
                </div>
                <p class="text-gray-700 text-sm leading-relaxed mb-3">{{ p.isi }}</p>
                <button @click="toggleLike(p)"
                  class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                  :class="isLiked(p.id) ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'">
                  <ThumbSolid v-if="isLiked(p.id)" class="w-4 h-4" />
                  <HandThumbUpIcon v-else class="w-4 h-4" />
                  {{ p.likes }} Dukung
                </button>
              </div>
            </div>
          </div>
        </transition-group>
        <div v-if="filtered.length === 0" class="text-center py-16 text-gray-400">
          <ChatBubbleLeftRightIcon class="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p class="font-medium">Belum ada aspirasi pada kategori ini.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
* { font-family: 'Inter', system-ui, sans-serif; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.list-enter-active { transition: all 0.4s cubic-bezier(0.16,1,0.3,1); }
.list-enter-from { opacity: 0; transform: translateY(-12px); }
.list-move { transition: transform 0.4s; }
</style>
