// Blueprint / Cetakan dari data Expense (pengeluaran)
class Expense {
  constructor(title, amount, date) {
    this.id = Date.now() + Math.random();
    this.title = title;
    this.amount = Number(amount);
    this.date = date;
  }
}

// Proses manipulasi data
class Tracker {
  constructor() {
    const savedData = localStorage.getItem("ripunn_expenses");

    if (savedData) {
      this.expenses = JSON.parse(savedData);
    } else {
      this.expenses = [];
    }
  }

  // Ubah data array jadi string JSON, lalu simpan permanen di browser
  saveToStorage() {
    localStorage.setItem("ripunn_expenses", JSON.stringify(this.expenses));
  }

  addExpense(title, amount, date) {
    const addExpense = new Expense(title, amount, date);
    this.expenses.push(addExpense);

    this.saveToStorage();
  }

  // proses menghitung total jumlah pengeluaran menggunakan
  getTotalAmount() {
    let total = 0;

    // perulangan: mengambil data expenses yang dijumlahkan dengan variable total kosong
    for (const item of this.expenses) {
      total += item.amount;
    }
    return total;
  }

  // Memfilter dan menghapus expense berdasarkan id yang dipilih
  deleteExpense(id) {
    // Proses filter: menyisakan data yang idnya tidak sama dengan id (target) yang dipilih
    this.expenses = this.expenses.filter((item) => item.id !== id);

    // menyingkronkan data setelah penghapusan data
    this.saveToStorage();
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
    divInfo.append(strongTitle, smallDate);
    li.appendChild(spanAmount);
    li.appendChild(buttonDelete);

    expenseList.appendChild(li);
  }
  document.getElementById("total-amount").textContent =
    `Rp ${myTracker.getTotalAmount().toLocaleString("id-ID")}`;
}

const expenseList = document.getElementById("expense-list");

// event: ketika click button delete, hapus dengan mengambil value data-id
// kalau terjadi event 'click' di element id "expenseList", lakukan:
expenseList.addEventListener("click", function (event) {
  // kalau terjadi event 'click' denga target yang mengandung class "delete-btn", lakukan:
  if (event.target.classList.contains("delete-btn")) {
    const deleteId = Number(event.target.getAttribute("data-id"));

    // panggil method deleteExpense()
    myTracker.deleteExpense(deleteId);
    renderUI();
  }
});

// ===
const myTracker = new Tracker();
renderUI();
