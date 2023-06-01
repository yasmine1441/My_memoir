document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    
    var name = document.getElementById("name").value;
    var date = document.getElementById("date").value;
    var type = document.getElementById("type").value;
    var description = document.getElementById("description").value;
    
    var data = {
      name: name,
      date: date,
      type: type,
      description: description
    };
    
    // Check if there are existing entries in local storage
    var entries = [];
    var existingData = localStorage.getItem("entries");
    if (existingData) {
      entries = JSON.parse(existingData);
    }
    
    // Add new entry to the array
    entries.push(data);
    
    // Save updated entries array to local storage
    localStorage.setItem("entries", JSON.stringify(entries));
    
    // Clear form fields
    document.getElementById("name").value = "";
    document.getElementById("date").value = "";
    document.getElementById("type").value = "";
    document.getElementById("description").value = "";
    
    // Refresh table
    refreshTable();
  });
  
  function refreshTable() {
    var table = document.getElementById("myTable");
    
    // Clear existing table data
    while (table.rows.length > 1) {
      table.deleteRow(1);
    }
    
    // Get entries from local storage
    var entries = [];
    var existingData = localStorage.getItem("entries");
    if (existingData) {
      entries = JSON.parse(existingData);
    }
    
    // Populate table with entries
    for (var i = 0; i < entries.length; i++) {
      var data = entries[i];
      
      var row = table.insertRow();
      var nameCell = row.insertCell(0);
      var dateCell = row.insertCell(1);
      var typeCell = row.insertCell(2);
      var descriptionCell = row.insertCell(3);
      var actionCell = row.insertCell(4);
      
      nameCell.innerHTML = data.name;
      dateCell.innerHTML = data.date;
      typeCell.innerHTML = data.type;
      descriptionCell.innerHTML = data.description;
      actionCell.innerHTML = "<button onclick='editRow(this, " + i + ")'>Modifier</button> <button onclick='deleteRow(this, " + i + ")'>Supprimer</button>";
    }
  }
  
  function editRow(button, index) {
    var entries = [];
    var existingData = localStorage.getItem("entries");
    if (existingData) {
      entries = JSON.parse(existingData);
    }
    
    // Get the corresponding data entry
    var data = entries[index];
    
    // Set the form fields with the existing data
    document.getElementById("name").value = data.name;
    document.getElementById("date").value = data.date;
    document.getElementById("type").value = data.type;
    document.getElementById("description").value = data.description;
    
    // Remove the data entry from the array
    entries.splice(index, 1);
    
    // Save updated entries array to local storage
    localStorage.setItem("entries", JSON.stringify(entries));
    
    // Refresh table
    refreshTable();
  }
  
  function deleteRow(button, index) {
    var entries = [];
    var existingData = localStorage.getItem("entries");
    if (existingData) {
      entries = JSON.parse(existingData);
    }
    
    // Remove the data entry from the array
    entries.splice(index, 1);
    
    // Save updated entries array to local storage
    localStorage.setItem("entries", JSON.stringify(entries));
    
    // Refresh table
    refreshTable();
  }
  
  // Initial table population on page load
  refreshTable();
  