let contacts = [];

// DOM Elements
const form = document.querySelector(".js-form");
const contactList = document.querySelector(".Contact_list");
const imgPreview = document.getElementById("imgPreview");

// --- Render Contact ---
function renderContact(contact) {
  // Remove if deleted
  if (contact.deleted) {
    const item = document.querySelector(`[data-key='${contact.id}']`);
    if (item) item.remove();
    return;
  }

  // Create contact card
  const node = document.createElement("article");
  node.classList.add("person");
  node.dataset.key = contact.id;
  node.innerHTML = `
    <img src="${contact.imageurl}" alt="${contact.name}">
    <div class="contactdetail">
      <h3><i class="fas fa-user-circle contactIcon"></i>${contact.name}</h3>
      <p><i class="fas fa-envelope contactIcon"></i>${contact.email}</p>
      <p><i class="fas fa-phone-alt contactIcon"></i>${contact.contactnumber}</p>
    </div>
    <button class="delete-contact js-delete-contact">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
      </svg>
    </button>
  `;

  contactList.appendChild(node);
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// --- Add Contact ---
function addContact() {
  const contactObject = {
    name: form.fullName.value.trim(),
    email: form.myEmail.value.trim(),
    imageurl: form.imgurl.value.trim(),
    contactnumber: form.myTel.value.trim(),
    id: Date.now()
  };
  contacts.push(contactObject);
  renderContact(contactObject);
  form.reset();
  imgPreview.src = "";
}

// --- Delete Contact ---
contactList.addEventListener("click", (event) => {
  const deleteBtn = event.target.closest(".js-delete-contact");
  if (!deleteBtn) return;
  const key = deleteBtn.parentElement.dataset.key;
  deleteContact(key);
});

function deleteContact(key) {
  contacts = contacts.filter(item => item.id !== Number(key));
  renderContact({ id: Number(key), deleted: true });
}

// --- Image Preview ---
form.imgurl.addEventListener("input", () => {
  const url = form.imgurl.value.trim();
  imgPreview.src = url ? url : "";
});

// --- Form Submit ---
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addContact();
});

// --- Load Stored Contacts ---
document.addEventListener("DOMContentLoaded", () => {
  const storedContacts = localStorage.getItem("contacts");
  if (storedContacts) {
    contacts = JSON.parse(storedContacts);
    contacts.forEach(contact => renderContact(contact));
  }
});
