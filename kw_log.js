
class KwLog {
    constructor(raw) {
        this.raw = raw;
    }
}

class GPROUTE extends KwLog {
    constructor(raw) {
        super(raw);

        const parts = raw.split(',');
        this.vehicle = `${parts[6]},${parts[7]},${parts[8]}`;
        this.start = `${parts[10]},${parts[11]}`;
        this.end = `${parts[13]},${parts[14]}`;
    }
}

class GPREROUTE extends KwLog {
    constructor(raw) {
        super(raw);

        const parts = raw.split(',');
        this.vehicle = `${parts[6]},${parts[7]},${parts[8]}`;
        this.start = `${parts[10]},${parts[11]}`;
        this.end = `${parts[13]},${parts[14]}`;
    }
}

class GPRPRESULT extends KwLog {
    constructor(raw) {
        super(raw);
        const parts = raw.split(',');
        this.result = parts[1];
        this.value = parts[2];
    }
}

class GPROUTEPATH extends KwLog {
    constructor(raw) {
        super(raw);
        if (typeof raw !== 'string') {
            return;
        }

        const parts = raw.split(',');
        const name = parts[0];
        if(name !== '$GPROUTEPATH') {
            return;
        }

        this.polyline = parts[1];
        this.length = parts[2];
    }
}

//GPVDDATA
class GPVD extends KwLog {
    constructor(raw) {
        super(raw);
        const parts = raw.split(',');
        this.base64 = parts[1];
    }
}


function createGPROUTE(gproute) {
    return `
        <h1>GPROUTE</h1>
        <table>
            <tr><th>車種</th><th>起點</th><th>終點</th></tr>
            <tr>
                <td>${gproute.vehicle}</td>
                <td>${gproute.start}</td>
                <td>${gproute.end}</td>
            </tr>
        </table>
    `;
}

function createGPRPRESULT(gprpresult) {
    return `
        <h1>GPRPRESULT</h1>
        <table>
            <tr><th>Result</th><th>Value</th></tr>
            <tr>
                <td>${gprpresult.result}</td>
                <td>${gprpresult.value}</td>
            </tr>
        </table>
    `;
}

function createGPROUTEPATH(gproutepath, index) {
    const mapContainerId = `map${index}`;
    return `
        <h1>GPROUTEPATH</h1>
        <p>Path: ${gproutepath.polyline}</p>
        <div id="${mapContainerId}" style="height: 100px; width: 800px;"></div>
    `;
}

function createGPVD(gpvd) {
    return `
        <h1>GPVD</h1>
        <p>Base64: ${gpvd.base64}</p>
    `;
}

function processFile(content) {
    const lines = content.split('\n');
    const logEntries = document.getElementById('logEntries');
    logEntries.innerHTML = '';  // 清除之前的資料

    lines.forEach((line, index) => {
        if (line.startsWith('$GPROUTE,')) {
            const gproute = new GPROUTE(line);
            logEntries.innerHTML += createGPROUTE(gproute);
        } else if (line.startsWith('$GPREROUTE')) {
            const gpReroute = new GPREROUTE(line);
            logEntries.innerHTML += createGPREROUTE(gpReroute);
        } else if (line.startsWith('$GPRPRESULT')) {
            const gprpresult = new GPRPRESULT(line);
            logEntries.innerHTML += createGPRPRESULT(gprpresult);
        } else if (line.startsWith('$GPROUTEPATH')) {
            const gproutepath = new GPROUTEPATH(line);
            logEntries.innerHTML += createGPROUTEPATH(gproutepath, index);
            setTimeout(() => {
                const map = L.map(`map${index}`).setView([25.034, 121.564], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);
                const decodedPath = decodePolyline(gproutepath.polyline);
                L.polyline(decodedPath, { color: 'blue' }).addTo(map);
                map.fitBounds(L.polyline(decodedPath).getBounds());
            }, 0);
        } else if(line.startsWith('$GPVDDATA')) {
            const gpvd = new GPVD(line);
            logEntries.innerHTML += createGPVD(gpvd);
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

function test() {
    const gprpResult = new GPRPRESULT("$GPRPRESULT,OK,1012");
    console.assert(gprpResult.result === 'OK', 'Test failed');
    console.assert(gprpResult.value === '1012', 'Test failed');
    console.log('Test GpResult passed[O]');

    const gpRoute = new GPROUTE("$GPROUTE,AUT,1,MTH,0,33537,CAR,307343,2773489,START,307305,2773460,END,307480,2773505,MM,1,581,1688,1,307343,2773489,25.06867, 121.56975");
    console.assert(gpRoute.vehicle === 'CAR,307343,2773489', 'Test failed');
    console.assert(gpRoute.start === '307305,2773460', 'Test failed');
    console.assert(gpRoute.end === '307480,2773505', 'Test failed');
    console.log('Test GpRoute passed[O]');

    const gpReroute = new GPROUTE("$GPREROUTE,AUT,1,MTH,0,33537,CAR,307343,2773489,START,307305,2773460,END,307480,2773505,MM,1,581,1688,1,307343,2773489,25.06867, 121.56975");
    console.assert(gpReroute.vehicle === 'CAR,307343,2773489', 'Test failed');
    console.assert(gpReroute.start === '307305,2773460', 'Test failed');
    console.assert(gpReroute.end === '307480,2773505', 'Test failed');
    console.log('Test GpReroute passed[O]');

    const gpRoutePath = new GPROUTEPATH("$GPROUTEPATH,uc_xCcw~dVEg@tJjA|AHb@?n@Kp@GKeA~AOjB]}Bg@{@WiKoFkFcB,4286");
    console.assert(gpRoutePath.polyline === 'uc_xCcw~dVEg@tJjA|AHb@?n@Kp@GKeA~AOjB]}Bg@{@WiKoFkFcB', 'Test failed');
    console.assert(gpRoutePath.length === `4286`, 'Test failed');
    console.log('Test GpRoutePath passed[O]');
}