document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            processFile(content);
        };
        reader.readAsText(file);
    }
});

function processFile(content) {
    const gpgsaPattern = /\$GPGSA,[A-Z],[0-9],([0-9,]*),([0-9.]+),([0-9.]+),([0-9.]+),AND_ACC,([0-9.]+)\*[0-9A-F]{2}/g;
    const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';  // Clear previous data
    
    let match;
    while ((match = gpgsaPattern.exec(content)) !== null) {
        const row = tableBody.insertRow();
        for (let i = 1; i < match.length; i++) {
            const cell = row.insertCell();
            cell.textContent = match[i];
        }
    }
}
