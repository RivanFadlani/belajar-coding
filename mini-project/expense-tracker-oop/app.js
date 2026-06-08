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

document.forms["expense-form"].addEventListener("submit", function (event) {
  event.preventDefault();

  const expenseTitle = document.getElementById("expense-title").value;
  const expenseAmount = document.getElementById("expense-amount").value;
  const expenseDate = document.getElementById("expense-date").value;

  document.forms["expense-form"].reset();

  myTracker.addExpense(expenseTitle, expenseAmount, expenseDate);

  renderUI();
});

function renderUI() {
  const expenseList = document.getElementById("expense-list");
  expenseList.innerHTML = "";

  for (const item of myTracker.expenses) {
    const li = document.createElement("li");

    const divInfo = document.createElement("div");
    divInfo.classList.add("expense-info");

    const strongTitle = document.createElement("strong");
    strongTitle.classList.add("expense-item-title");
    strongTitle.textContent = item.title;

    const smallDate = document.createElement("small");
    smallDate.classList.add("expense-item-date");
    smallDate.textContent = item.date;

    const spanAmount = document.createElement("span");
    spanAmount.classList.add("expense-item-amount");
    spanAmount.textContent = `Rp ${item.amount.toLocaleString("id-ID")}`;

    const buttonDelete = document.createElement("button");
    buttonDelete.classList.add("delete-btn");
    buttonDelete.setAttribute("data-id", item.id);
    buttonDelete.textContent = "Delete";

    // append
    li.appendChild(divInfo);
    divInfo.append(strongTitle, strongTitle, smallDate);
    li.appendChild(spanAmount);
    li.appendChild(buttonDelete);

    expenseList.appendChild(li);
  }
}

const expenseList = document.getElementById("expense-list");

expenseList.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    const deleteId = Number(event.target.getAttribute("data-id"));

    myTracker.deleteExpense(deleteId);
    renderUI();
  }
});

// ===
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
