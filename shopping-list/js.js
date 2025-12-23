/* input kutusuna yazılıp ekle butonuna basılan ürün aşağıdaki listeye eklenecek.
eleman yoksa no items yazacak, eleman varsa bu yazı silinecek.
elemanın kutusu checklendiyse complete butonuna tıklayınca complete olanlar gözükecek. complete değilse ıncompletede gözükecek 
bir de all butonu var complete incomplete hepsi gözükecek
clear butonu var listeyi tamamen temizleyecek
 */
const items = document.querySelector("#main .container .items");
const silinecek_1 = document.querySelector(".silinecek-1");
const silinecek_2 = document.querySelector(".silinecek-2");

const itemName = document.querySelector("#main .container #item-name");
const insertItemButton = document.querySelector("#main .container #btn-add");

function updateEmptyState() {
  const hasItem = items.querySelector(".alert") !== null;
  silinecek_1.style.display = hasItem ? "none" : "block";
  silinecek_2.style.display = hasItem ? "block" : "none";
}

function insertHtml(e) {
  e.preventDefault(); // button/href yüzünden sayfa zıplamasın

  const text = itemName.value.trim();
  if (!text) return;

  const uniqueId = "check_" + Date.now() + "_" + Math.floor(Math.random() * 1000);

  items.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="alert alert-warning mt-3 row justify-content-between align-items-center" role="alert">
      <div class="form-check col-11">
        <input class="form-check-input" type="checkbox" id="${uniqueId}">
        <label class="form-check-label" for="${uniqueId}">${text}</label>
      </div>
      <a href="#" class="delete-button btn btn-outline-danger col-1">
        <i class="bi bi-file-excel"></i>
      </a>
    </div>
    `
  );

  itemName.value = "";
  updateEmptyState();
}

insertItemButton.addEventListener("click", insertHtml);

// ✅ PRO: Event Delegation (ikon'a tıklasa bile çalışır)
items.addEventListener("click", (e) => {
  e.preventDefault();

  const deleteBtn = e.target.closest(".delete-button");
  if (!deleteBtn) return;

  deleteBtn.closest(".alert").remove();
  updateEmptyState();
});

// Sayfa ilk açılışta doğru state
updateEmptyState();
