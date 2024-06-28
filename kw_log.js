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

class KwLog {
    constructor(raw) {
        this.raw = raw;
    }
}

class GPROUTE extends KwLog {
    constructor(raw, vehicle, start, end) {
        super(raw);
        this.vehicle = vehicle;
        this.start = start;
        this.end = end;
    }
}

class GPREROUTE extends KwLog {
    constructor(raw, vehicle, start, end) {
        super(raw);
        this.vehicle = vehicle;
        this.start = start;
        this.end = end;
    }
}

class GPRPRESULT extends KwLog {
    constructor(raw, result, value) {
        super(raw);
        this.result = result;
        this.value = value;
    }
}

class GPROUTEPATH extends KwLog {
    constructor(raw, polyline) {
        super(raw);
        this.polyline = polyline;
    }
}

function processFile(content) {
    const lines = content.split('\n');
    const logEntries = document.getElementById('logEntries');
    logEntries.innerHTML = '';  // Clear previous data

    lines.forEach((line, index) => {
        if (line.startsWith('$GPROUTE')) {
            const parts = line.split(',');
            const vehicle = parts[6];
            const start = parts.slice(7, 9).join(',');
            const end = parts.slice(11, 13).join(',');
            const gproute = new GPROUTE(line, vehicle, start, end);
            logEntries.innerHTML += `
                <h1>GPROUTE</h1>
                <table>
                    <tr><th colspan="3">GPROUTE</th></tr>
                    <tr><td colspan="3">${gproute.raw}</td></tr>
                    <tr>
                        <td>車種</td>
                        <td>起點</td>
                        <td>終點</td>
                    </tr>
                    <tr>
                        <td>${gproute.vehicle}</td>
                        <td>${gproute.start}</td>
                        <td>${gproute.end}</td>
                    </tr>
                </table>
            `;
        } else if (line.startsWith('$GPREROUTE')) {
            const parts = line.split(',');
            const vehicle = parts[6];
            const start = parts.slice(7, 9).join(',');
            const end = parts.slice(11, 13).join(',');
            const gpreroute = new GPREROUTE(line, vehicle, start, end);
            logEntries.innerHTML += `
                <h1>GPREROUTE</h1>
                <table>
                    <tr><th colspan="3">GPREROUTE</th></tr>
                    <tr><td colspan="3">${gpreroute.raw}</td></tr>
                    <tr>
                        <td>車種</td>
                        <td>起點</td>
                        <td>終點</td>
                    </tr>
                    <tr>
                        <td>${gpreroute.vehicle}</td>
                        <td>${gpreroute.start}</td>
                        <td>${gpreroute.end}</td>
                    </tr>
                </table>
            `;
        } else if (line.startsWith('$GPRPRESULT')) {
            const parts = line.split(',');
            const result = parts[1];
            const value = parts[2];
            const gprpresult = new GPRPRESULT(line, result, value);
            logEntries.innerHTML += `
                <h1>GPRPRESULT</h1>
                <table>
                    <tr><th colspan="2">GPRPRESULT</th></tr>
                    <tr><td colspan="2">${gprpresult.raw}</td></tr>
                    <tr>
                        <td>Result</td>
                        <td>Value</td>
                    </tr>
                    <tr>
                        <td>${gprpresult.result}</td>
                        <td>${gprpresult.value}</td>
                    </tr>
                </table>
            `;
        } else if (line.startsWith('$GPROUTEPATH')) {
            const parts = line.split(',');
            const polyline = parts[1];
            const gproutepath = new GPROUTEPATH(line, polyline);
            const mapContainerId = `map${index}`;
            logEntries.innerHTML += `
                <h1>GPROUTEPATH</h1>
                <table>
                    <tr><th colspan="2">GPROUTEPATH</th></tr>
                    <tr><td colspan="2">${gproutepath.raw}</td></tr>
                    <tr>
                        <td colspan="2">
                            <div id="${mapContainerId}" style="height: 300px; width: 800px;"></div>
                            <button onclick="showFullscreen('${mapContainerId}')">全螢幕顯示地圖</button>
                        </td>
                    </tr>
                </table>
            `;
            setTimeout(() => {
                const map = L.map(mapContainerId).setView([25.034, 121.564], 13); // Default view, can be adjusted based on actual data
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);
                const decodedPath = decodePolyline(gproutepath.polyline);
                L.polyline(decodedPath, { color: 'blue' }).addTo(map);
                map.fitBounds(L.polyline(decodedPath).getBounds());
            }, 0);
        }
    });
}

function decodePolyline(encoded) {
    let points = [];
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;

    while (index < len) {
        let b, shift = 0, result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        let dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lat += dlat;

        shift = 0;
        result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        let dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lng += dlng;

        points.push([lat / 1E5, lng / 1E5]);
    }

    return points;
}

function showFullscreen(mapContainerId) {
    const element = document.getElementById(mapContainerId);
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { /* Firefox */
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE/Edge */
        element.msRequestFullscreen();
    }
}
