import { ref } from 'vue'
import { authService } from '../services/authService'

// Shared across all dashboard-shell pages so sidebar collapse state persists.
export const sidebarOpen = ref(true)

export function handleLogout() {
  authService.logout()
}

// Tiny helper: trigger a browser download of CSV text.
export function downloadCSV(filename, rows) {
  const csv = rows.map(r => r.map(cell => {
    const s = String(cell ?? '')
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }).join(',')).join('\n')
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
