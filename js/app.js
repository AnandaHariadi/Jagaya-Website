// JAGAYA SPA Controller
class App {
  constructor() {
    this.currentPage = 'dashboard';
    this.db = new Database();
    this.init();
  }

  async init() {
    await this.db.init();
    this.db.seedDemoData();
    this.bindEvents();
    this.showPage('dashboard');
    this.updateDashboard();
    this.loadAllTables();
  }

  bindEvents() {
    // Navigation
    document.querySelectorAll('.menu-item').forEach(item => {
      item.addEventListener('click', () => {
        this.navigate(item.dataset.page);
      });
    });

    // Forms
    const forms = ['relawan', 'pengungsian', 'donatur', 'distribusi'];
    forms.forEach(type => {
      const form = document.getElementById(`${type}-form`);
      if (form) {
        form.addEventListener('submit', e => this.handleFormSubmit(e, type));
      }
    });

    // Buttons
    document.getElementById('clear-log')?.addEventListener('click', () => this.clearLog());
    document.getElementById('generate-narasi')?.addEventListener('click', () => this.generateNarasi());
  }

  navigate(page) {
    // Update menu
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
    document.querySelector(`[data-page="${page}"]`).classList.add('active');

    // Show page
    this.showPage(page);
    this.currentPage = page;

    // Load data
    if (page !== 'dashboard') {
      this.loadTable(page);
    } else {
      this.updateDashboard();
    }
  }

  showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');
  }

  async loadAllTables() {
    const pages = ['relawan', 'pengungsian', 'donatur', 'distribusi', 'log'];
    for (const page of pages) {
      await this.loadTable(page);
    }
  }

  async loadTable(table) {
    try {
      const data = await this.db.getAll(table);
      const tbody = document.querySelector(`#${table}-table tbody`);
      tbody.innerHTML = '';

      data.forEach(item => {
        const row = this.createRow(item, table);
        tbody.appendChild(row);
      });
    } catch (e) {
      console.error('Load table error:', e);
    }
  }

  createRow(item, table) {
    const row = document.createElement('tr');
    let html = '';

    switch(table) {
      case 'relawan':
        html = `
          <td>${item.id}</td>
          <td>${item.nama}</td>
          <td>${item.umur}</td>
          <td>${item.alamat}</td>
          <td>${item.hp}</td>
          <td>
            <button onclick="app.edit('${table}', ${item.id})" class="btn-primary small">Edit</button>
            <button onclick="app.delete('${table}', ${item.id})" class="btn-danger small">Hapus</button>
          </td>`;
        break;
      case 'pengungsian':
        const percent = ((item.current / item.max) * 100).toFixed(0);
        html = `
          <td>${item.id}</td>
          <td>${item.nama}</td>
          <td>${item.max}</td>
          <td>${item.current}</td>
          <td>${percent}%</td>
          <td>
            <button onclick="app.edit('${table}', ${item.id})" class="btn-primary small">Edit</button>
            <button onclick="app.delete('${table}', ${item.id})" class="btn-danger small">Hapus</button>
          </td>`;
        break;
      case 'donatur':
        html = `
          <td>${item.id}</td>
          <td>${item.nama}</td>
          <td>${item.jenis}</td>
          <td>${item.jumlah}</td>
          <td>${new Date(item.createdAt).toLocaleDateString('id-ID')}</td>
          <td><button onclick="app.delete('${table}', ${item.id})" class="btn-danger small">Hapus</button></td>`;
        break;
      case 'distribusi':
        const statusClass = item.status === 'selesai' ? 'selesai' : item.status === 'dikirim' ? 'dikirim' : 'pending';
        html = `
          <td>${item.id}</td>
          <td>${item.lokasi}</td>
          <td>${item.jenis}</td>
          <td>${item.jumlah}</td>
          <td><span class="status ${statusClass}">${item.status}</span></td>
          <td>${new Date(item.createdAt).toLocaleDateString('id-ID')}</td>
          <td>
            <button onclick="app.edit('${table}', ${item.id})" class="btn-primary small">Edit</button>
            <button onclick="app.delete('${table}', ${item.id})" class="btn-danger small">Hapus</button>
          </td>`;
        break;
      case 'log':
        html = `
          <td>${item.id}</td>
          <td>${item.action}</td>
          <td>${item.detail}</td>
          <td>${new Date(item.createdAt).toLocaleDateString('id-ID')}</td>`;
        break;
    }

    row.innerHTML = html;
    return row;
  }

  async handleFormSubmit(e, type) {
    e.preventDefault();
    const data = this.getFormData(type);
    
    try {
      if (this.editing && this.editing.type === type) {
        await this.db.update(type, data, this.editing.id);
        this.cancelEdit();
      } else {
        const id = await this.db.create(type, data);
      }
      
      await this.loadTable(type);
      this.updateDashboard();
      e.target.reset();
      
    } catch (e) {
      alert('Error: ' + e.message);
    }
  }

  getFormData(type) {
    const data = {};
    switch(type) {
      case 'relawan':
        return {
          nama: document.getElementById('relawan-nama').value,
          umur: parseInt(document.getElementById('relawan-umur').value),
          alamat: document.getElementById('relawan-alamat').value,
          hp: document.getElementById('relawan-hp').value
        };
      case 'pengungsian':
        return {
          nama: document.getElementById('pengungsian-nama').value,
          max: parseInt(document.getElementById('pengungsian-max').value),
          current: parseInt(document.getElementById('pengungsian-current').value)
        };
      case 'donatur':
        return {
          nama: document.getElementById('donatur-nama').value,
          jenis: document.getElementById('donatur-jenis').value,
          jumlah: document.getElementById('donatur-jumlah').value,
          createdAt: Date.now()
        };
      case 'distribusi':
        return {
          lokasi: document.getElementById('distribusi-lokasi').value,
          jenis: document.getElementById('distribusi-jenis').value,
          jumlah: parseInt(document.getElementById('distribusi-jumlah').value),
          status: document.getElementById('distribusi-status').value,
          createdAt: Date.now()
        };
    }
  }

  async edit(type, id) {
    const data = await this.db.getAll(type);
    const item = data.find(item => item.id === id);
    
    if (item) {
      this.editing = {type, id};
      // Populate form
      const formData = this.getFormData(type);
      Object.keys(item).forEach(key => {
        const el = document.getElementById(`${type}-${key}`);
        if (el) el.value = item[key];
      });
      
      const submitBtn = document.querySelector(`#${type}-form button[type="submit"]`);
      submitBtn.textContent = 'Update';
      
      document.getElementById(`${type}-cancel`).style.display = 'inline-block';
    }
  }

  cancelEdit() {
    this.editing = null;
    document.querySelectorAll('form').forEach(form => form.reset());
    document.querySelectorAll('.btn-secondary').forEach(btn => btn.style.display = 'none');
    document.querySelectorAll('button[type="submit"]').forEach(btn => btn.textContent = 'Tambah');
  }

  async delete(type, id) {
    if (confirm('Hapus data ini?')) {
      await this.db.delete(type, id);
      await this.loadTable(type);
      this.updateDashboard();
    }
  }

  async clearLog() {
    if (confirm('Hapus semua log?')) {
      await this.db.clearLogs();
      await this.loadTable('log');
    }
  }

  generateNarasi() {
    const narasi = [
      'Situasi terkini: 14 kecamatan terdampak banjir. Kapasitas pengungsian 67% terisi. 247 relawan aktif.',
      'Update real-time: Donasi 1.247 terkirim, distribusi ke 8 titik prioritas optimal.',
      'Analisis AI: Status terkendali. Fokus logistik makanan dan obat untuk 3.618 pengungsi.'
    ];
    const output = document.getElementById('narasi-output');
    output.textContent = narasi[Math.floor(Math.random() * narasi.length)];
    output.style.display = 'block';
    output.scrollIntoView({behavior: 'smooth'});
  }

  async updateDashboard() {
    const relawan = await this.db.getAll('relawan');
    const pengungsian = await this.db.getAll('pengungsian');
    const donatur = await this.db.getAll('donatur');
    const distribusi = await this.db.getAll('distribusi');
    
    document.getElementById('kpi-relawan').textContent = relawan.length;
    document.getElementById('kpi-pengungsian').textContent = pengungsian.length;
    document.getElementById('kpi-donatur').textContent = donatur.length;
    document.getElementById('kpi-bantuan').textContent = distribusi.reduce((sum, d) => sum + d.jumlah, 0);

    // Capacity
    const totalMax = pengungsian.reduce((sum, p) => sum + p.max, 0);
    const totalCurrent = pengungsian.reduce((sum, p) => sum + p.current, 0);
    const percent = totalMax ? (totalCurrent / totalMax * 100).toFixed(1) : 0;
    
    document.getElementById('capacity-total').textContent = `${totalCurrent} / ${totalMax}`;
    document.getElementById('capacity-percent').textContent = `${percent}%`;
    document.getElementById('capacity-progress').style.width = `${percent}%`;

    // Capacity list
    const list = document.querySelector('.capacity-list');
    list.innerHTML = pengungsian.map(p => {
      const percent = (p.current / p.max * 100).toFixed(1);
      return `<div class="capacity-item">
        <span>${p.nama}</span>
        <div class="mini-progress">
          <div class="mini-progress-bar" style="width: ${percent}%"></div>
        </div>
        <span>${percent}%</span>
      </div>`;
    }).join('');
  }
}

// Global app
const app = new App();
window.app = app;

