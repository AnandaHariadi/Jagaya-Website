// IndexedDB Database Manager
class Database {
  constructor() {
    this.db = null;
    this.dbName = 'JagayaDB';
    this.version = 1;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = e => {
        this.db = e.target.result;
        this.createSchema();
      };
    });
  }

  createSchema() {
    const tables = ['relawan', 'pengungsian', 'donatur', 'distribusi', 'log'];
    tables.forEach(table => {
      if (!this.db.objectStoreNames.contains(table)) {
        const store = this.db.createObjectStore(table, { keyPath: 'id', autoIncrement: true });
        if (table === 'donatur' || table === 'distribusi') {
          store.createIndex('createdAt', 'createdAt', { unique: false });
        }
      }
    });
  }

  async getAll(table) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([table], 'readonly');
      const store = transaction.objectStore(table);
      const request = store.getAll();
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async create(table, data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([table, 'log'], 'readwrite');
      const store = transaction.objectStore(table);
      const logStore = transaction.objectStore('log');
      
      const request = store.add(data);
      request.onsuccess = () => {
        const id = request.result;
        // Log
        logStore.add({
          action: 'create',
          detail: `${table} ID ${id}`,
          createdAt: Date.now()
        });
        resolve(id);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async update(table, data, id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([table, 'log'], 'readwrite');
      const store = transaction.objectStore(table);
      const logStore = transaction.objectStore('log');
      
      const request = store.put({...data, id});
      request.onsuccess = () => {
        logStore.add({
          action: 'update',
          detail: `${table} ID ${id}`,
          createdAt: Date.now()
        });
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }

  async delete(table, id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([table, 'log'], 'readwrite');
      const store = transaction.objectStore(table);
      const logStore = transaction.objectStore('log');
      
      const request = store.delete(id);
      request.onsuccess = () => {
        logStore.add({
          action: 'delete',
          detail: `${table} ID ${id}`,
          createdAt: Date.now()
        });
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }

  async clearLogs() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['log'], 'readwrite');
      const store = transaction.objectStore('log');
      const request = store.clear();
      request.onsuccess = resolve;
      request.onerror = () => reject(request.error);
    });
  }

  seedDemoData() {
    // Demo data on first load
    const demoData = {
      relawan: [
        {nama: 'Ahmad Santoso', umur: 28, alamat: 'Karanganyar, Demak', hp: '081234567890'},
        {nama: 'Siti Nurhaliza', umur: 25, alamat: 'Sayung, Demak', hp: '081234567891'}
      ],
      pengungsian: [
        {nama: 'Balai Desa Karanganyar', max: 800, current: 450},
        {nama: 'Masjid Agung Demak', max: 1500, current: 1200},
        {nama: 'Posko Sayung', max: 600, current: 280}
      ],
      donatur: [
        {nama: 'PMI Demak', jenis: 'Makanan', jumlah: 1000},
        {nama: 'PT Semesta Jaya', jenis: 'Pakaian', jumlah: 500}
      ],
      distribusi: [
        {lokasi: 'Sayung', jenis: 'Air Minum', jumlah: 2000, status: 'selesai'},
        {lokasi: 'Karanganyar', jenis: 'Makanan', jumlah: 800, status: 'dikirim'}
      ]
    };

    // Add if empty
    Object.entries(demoData).forEach(async ([table, items]) => {
      const existing = await this.getAll(table);
      if (existing.length === 0) {
        for (const item of items) {
          await this.create(table, item);
        }
      }
    });
  }
}

window.Database = Database;

