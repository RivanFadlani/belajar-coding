class Expense {
  constructor(title, amount, date) {
    this.id = Date.now() + Math.random();
    this.title = title;
    this.amount = Number(amount);
    this.date = date;
  }
}

class Tracker {
  constructor() {
    this.expenses = [];
  }

  addExpense(title, amount, date) {
    const addExpense = new Expense(title, amount, date);
    this.expenses.push(addExpense);
  }

  getTotalAmount() {
    let total = 0;

    for (const item of this.expenses) {
      total += item.amount;
    }
    return total;
  }

  deleteExpense(id) {
    this.expenses = this.expenses.filter((item) => item.id !== id);
  }
}

const myTracker = new Tracker();

// Uji Coba Tambah Data
myTracker.addExpense("Kopi Skena", 35000, "2026-06-07");
myTracker.addExpense("Beli Keyboard Baru", 450000, "2026-06-07");
myTracker.addExpense("Makan Siang", 25000, "2026-06-07");

console.log("1. Cek Semua Data (Harus berisi 3 objek):", myTracker.expenses);
console.log("2. Total Pengeluaran (Harus 510000):", myTracker.getTotalAmount());

// Uji Coba Hapus Data (Kita ambil ID dari data pertama sebagai contoh)
if (myTracker.expenses.length > 0) {
  const idYangMauDihapus = myTracker.expenses[0].id;
  myTracker.deleteExpense(idYangMauDihapus);

  console.log(
    "3. Cek Setelah Dihapus (Harus sisa 2 objek):",
    myTracker.expenses,
  );
  console.log("4. Total Baru (Harus 475000):", myTracker.getTotalAmount());
}
