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
    const gprmcPattern = /\$GPRMC,([0-9.]+),A,([0-9.]+),([NS]),([0-9.]+),([EW]),([0-9.]+),([0-9.]+),([0-9]{6}),,,A\*[0-9A-F]{2}/g;
    const locations = [];
    
    let match;
    while ((match = gprmcPattern.exec(content)) !== null) {
        const lat = convertToDecimalDegrees(match[2], match[3]);
        const lon = convertToDecimalDegrees(match[4], match[5]);
        locations.push([lat, lon]);
    }

    if (locations.length > 0) {
        displayMap(locations);
    }
}

function convertToDecimalDegrees(value, direction) {
    const degrees = Math.floor(value / 100);
    const minutes = value % 100;
    let decimalDegrees = degrees + minutes / 60;
    if (direction === 'S' || direction === 'W') {
        decimalDegrees = -decimalDegrees;
    }
    return decimalDegrees;
}

function displayMap(locations) {
    const map = L.map('map').setView(locations[0], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    locations.forEach(location => {
        L.marker(location).addTo(map);
    });
}