function saveEntry() {
    let entryText = document.getElementById("journalEntry").value.trim();
    if (entryText === "") {
        alert("Please write something before saving!");
        return;
    }

    let entriesList = document.getElementById("entriesList");

    // Create a new list item
    let listItem = document.createElement("li");
    let timestamp = new Date().toLocaleString();

    let entryContent = document.createElement("span");
    entryContent.innerHTML = `<b>${timestamp}:</b> ${entryText}`;

    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit");
    editButton.onclick = function () {
        document.getElementById("journalEntry").value = entryText;
        entriesList.removeChild(listItem);
        saveToLocalStorage();
    };

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.onclick = function () {
        entriesList.removeChild(listItem);
        saveToLocalStorage();
    };

    listItem.appendChild(entryContent);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    entriesList.appendChild(listItem);

    saveToLocalStorage();
    document.getElementById("journalEntry").value = "";
}

function saveToLocalStorage() {
    let entries = [];
    document.querySelectorAll("#entriesList li span").forEach(item => {
        entries.push(item.innerHTML);
    });
    localStorage.setItem("journalEntries", JSON.stringify(entries));
}

function loadEntries() {
    let savedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    let entriesList = document.getElementById("entriesList");

    savedEntries.forEach(entry => {
        let listItem = document.createElement("li");

        let entryContent = document.createElement("span");
        entryContent.innerHTML = entry;

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit");
        editButton.onclick = function () {
            document.getElementById("journalEntry").value = entry.split("</b> ")[1];
            entriesList.removeChild(listItem);
            saveToLocalStorage();
        };

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete");
        deleteButton.onclick = function () {
            entriesList.removeChild(listItem);
            saveToLocalStorage();
        };

        listItem.appendChild(entryContent);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        entriesList.appendChild(listItem);
    });
}

document.getElementById("darkModeToggle").onclick = function () {
    document.body.classList.toggle("dark-mode");
};

window.onload = loadEntries;
