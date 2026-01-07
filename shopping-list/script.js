const shoppingList = document.querySelector(".shopping-list");
const shoppingForm = document.querySelector(".shopping-form");
const filterButtons = document.querySelectorAll(".filter-buttons button");

const removeBtn = document.querySelector(".remove-btn");

document.addEventListener("DOMContentLoaded", function () {
  loadItems();
  shoppingForm.addEventListener("submit", handleFormSubmit);

  for (let button of filterButtons) {
    button.addEventListener("click", handleFilterSelection);
  }
  updatePage();
  removeBtn.addEventListener("click", removeAll);
});

function removeAll() {
  shoppingList.innerHTML = "";
  localStorage.clear("shoppingItems");
  updatePage();
  
}

function saveToLS() {
  const listItems = document.querySelectorAll("li");
  const liste = [];
  for (let li of listItems) {
    const id = li.getAttribute("item-id");
    const name = li.querySelector(".item-name").textContent;
    const completed = li.hasAttribute("item-completed");

    liste.push({ id, name, completed });
  }
  localStorage.setItem("shoppingItems", JSON.stringify(liste));
}

function loadItems() {
  const items = JSON.parse(localStorage.getItem("shoppingItems")) || [];

  shoppingList.innerHTML = "";

  for (let item of items) {
    const li = createListItem(item);
    shoppingList.appendChild(li);
  }
}

function addItem(input) {
  const id = generateId();
  const newItem = createListItem({
    id: id,
    name: input.value,
    completed: false,
  });

  shoppingList.prepend(newItem);

  input.value = "";

  updateFilterItems();
  saveToLS();
  updatePage();
}

function generateId() {
  return Date.now().toString();
}

function handleFormSubmit(e) {
  e.preventDefault();

  const input = document.getElementById("item_name");

  if (input.value.trim().length === 0) {
    alert("yeni değer giriniz");
    return;
  }
  addItem(input);
}

function toggleCompleted(e) {
  const li = e.target.parentElement;
  li.toggleAttribute("item-completed", e.target.checked);

  updateFilterItems();
  saveToLS();
}

function createListItem(item) {
  // checkbox
  const input = document.createElement("input");
  input.type = "checkbox";
  input.classList.add("form-check-input");
  input.checked = item.completed;
  input.addEventListener("change", toggleCompleted);
  // item
  const div = document.createElement("div");
  div.textContent = item.name;
  div.classList.add("item-name");
  div.addEventListener("click", openEditMode);
  div.addEventListener("blur", closeEditMode);
  div.addEventListener("keydown", cancelEnter);

  // delete icon
  const deleteIcon = document.createElement("span");
  deleteIcon.className = "fs-3 bi bi-x text-danger delete-icon";
  shoppingList.addEventListener("click", (e) => {
    const deleteIcon = e.target.closest(".delete-icon");
    if (!deleteIcon) return;

    const li = deleteIcon.closest("li");
    if (!li) return;

    li.remove();
    updatePage();
    saveToLS();
  });

  const li = document.createElement("li");
  li.setAttribute("item-id", item.id);
  li.className = "border rounded p-2 mb-1";
  li.toggleAttribute("item-completed", item.completed);
  li.appendChild(input);
  li.appendChild(div);
  li.appendChild(deleteIcon);
  return li;
}

function openEditMode(e) {
  const li = e.target.parentElement;
  if (li.hasAttribute("item-completed") == false) {
    e.target.contentEditable = true;
  }
}

function closeEditMode(e) {
  e.target.contentEditable = false;
  saveToLS();
}

function cancelEnter(e) {
  if (e.key == "Enter") {
    e.preventDefault();
    closeEditMode(e);
  }
}

function handleFilterSelection(e) {
  const filterBtn = e.target;
  filterButtons.forEach((b) =>
    b.classList.replace("btn-primary", "btn-secondary")
  );
  filterBtn.classList.replace("btn-secondary", "btn-primary");

  filterItems(filterBtn.dataset.filter);
  saveToLS();
}

function filterItems(filterType) {
  const li_items = shoppingList.querySelectorAll("li");

  for (let li of li_items) {
    li.classList.remove("d-flex");
    li.classList.remove("d-none");
    const item_completed = li.hasAttribute("item-completed");
    if (filterType == "completed") {
      li.classList.toggle(item_completed ? "d-flex" : "d-none");
    } else if (filterType == "incomplete") {
      li.classList.toggle(item_completed ? "d-none" : "d-flex");
    } else {
      li.classList.toggle("d-flex");
    }
  }
}

function updateFilterItems() {
  const activeFilter = document.querySelector(".btn-primary[data-filter]");

  filterItems(activeFilter.getAttribute("data-filter"));
}

function updatePage() {
  const alert = document.querySelector(".alert");
  const isEmpty = shoppingList.hasChildNodes();
  const clearBtn = document.querySelector(".remove-btn");
  const filterButtons = document.querySelector(".filter-buttons");

  alert.classList.toggle("d-none", isEmpty);
  clearBtn.classList.toggle("d-none", !isEmpty);
  filterButtons.classList.toggle("d-none", !isEmpty);
}

/*    */
