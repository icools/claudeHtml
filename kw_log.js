
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

class GPVD extends KwLog {
    constructor(raw) {
        super(raw);
        const parts = raw.split(',');
        this.base64 = parts[1];
    }
}

class GPLOCATION extends KwLog {
    constructor(raw) {
        super(raw);
        const parts = raw.split(',');
        this.base64 = parts[1];
    }
}

function copyToClipboard(text,showAlert = false) {
    navigator.clipboard.writeText(text).then(() => {
        if(showAlert) {
            alert('已複製到剪貼簿');
        }
    }, (err) => {
        console.error('複製失敗', err);
    });
}

function createCopyButton(text,showAlert = false) {
    return `<button onclick="copyToClipboard('${text}',${showAlert})">Copy</button>`;
}

function createGPROUTE(gproute) {
    return `
        <h1>GPROUTE</h1>    
        <table >
            <tr>
                <td style="background-color: lightgray;">車種:</td>
                <td>${gproute.vehicle}${createCopyButton(gproute.vehicle)}</td>
            </tr>
            <tr>
                <td style="background-color: lightgray;">起點:</td>
                <td>${gproute.start}${createCopyButton(gproute.start)}</td>
            </tr>
            <tr>
                <td style="background-color: lightgray;">終點:</td>
                <td>${gproute.end} ${createCopyButton(gproute.end)}</td>
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

function createGPROUTEPATH(gproutepath) {
    //const mapContainerId = `map${index}`;
    return `
        <h1>GPROUTEPATH</h1>
        <table>
            <tr><th>Path</th><th>Length</th></tr>
            <tr>
                <td>${gproutepath.polyline}${createCopyButton(gproutepath.polyline,true)}</td>
            </tr>
            <tr>
                <td>${gproutepath.length}</td>
            </tr>
        </table>
    `;
    //<div id="${mapContainerId}" style="height: 100px; width: 800px;"></div>
}

function createGPVD(gpvd) {
    const base64 = gpvd.base64;
    const maxLength = 30;
    const truncatedBase64 = base64.length > maxLength ? base64.substring(0, maxLength) + "..." : base64;
    const base64_single_line = `${truncatedBase64} (Length: ${base64.length})`;
    return `
    <h1>GPVD</h1>
    <table>
        <tr><th>Base64</th></tr>
        <tr>
            <td>${base64_single_line}${createCopyButton(base64,true)}</td>
        </tr>
    </table>
`;
}

function createLocation(location) {
    const base64 = location.base64;
    const maxLength = 30;
    const truncatedBase64 = base64.length > maxLength ? base64.substring(0, maxLength) + "..." : base64;
    const base64_single_line = `${truncatedBase64} (Length: ${base64.length})`;
    return `
    <h1>GPLocation</h1>
    <table>
        <tr><th>Base64</th></tr>
        <tr>
            <td>${base64_single_line}${createCopyButton(base64,true)}</td>
        </tr>
    </table>
`;
}

// GPLOCATION

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
            logEntries.innerHTML += createGPROUTE(gpReroute);
        } else if (line.startsWith('$GPRPRESULT')) {
            const gprpresult = new GPRPRESULT(line);
            logEntries.innerHTML += createGPRPRESULT(gprpresult);
        } else if (line.startsWith('$GPROUTEPATH')) {
            const gproutepath = new GPROUTEPATH(line);
            logEntries.innerHTML += createGPROUTEPATH(gproutepath);
            // setTimeout(() => {
            //     const map = L.map(`map${index}`).setView([25.034, 121.564], 13);
            //     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            //         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            //     }).addTo(map);
            //     const decodedPath = decodePolyline(gproutepath.polyline);
            //     L.polyline(decodedPath, { color: 'blue' }).addTo(map);
            //     map.fitBounds(L.polyline(decodedPath).getBounds());
            // }, 0);
        } else if(line.startsWith('$GPVDDATA')) {
            const gpvd = new GPVD(line);
            logEntries.innerHTML += createGPVD(gpvd);
        } else if(line.startsWith('$GPLOCATION')) {
            const gplocation = new GPLOCATION(line);
            logEntries.innerHTML += createLocation(gplocation);
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

    const gpLocation = new GPLOCATION("$GPLOCATION,IEsA7CTExHdGAFvn3ArXIp5JZoC2UNWt8=");
}