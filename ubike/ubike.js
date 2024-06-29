class UbikeStation {
    constructor(data) {
        this.sno = data.sno;
        this.sna = data.sna;
        this.sarea = data.sarea;
        this.mday = data.mday;
        this.ar = data.ar;
        this.sareaen = data.sareaen;
        this.snaen = data.snaen;
        this.aren = data.aren;
        this.act = data.act;
        this.srcUpdateTime = data.srcUpdateTime;
        this.updateTime = data.updateTime;
        this.infoTime = data.infoTime;
        this.infoDate = data.infoDate;
        this.total = data.total;
        this.availableRentBikes = data.available_rent_bikes;
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.availableReturnBikes = data.available_return_bikes;
    }

    asUBikeUiState() {
        return new UBikeUiState(
            this.sna,
            this.availableRentBikes,
            (this.availableRentBikes / this.total * 100).toFixed(2),
            this.availableReturnBikes,
            `(${this.latitude}, ${this.longitude})`
        );
    }
}

class UBikeUiState {
    constructor(name, availableRentBikes, rentBikeRatio, availableReturnBikes, coordinates) {
        this.name = name;
        this.availableRentBikes = availableRentBikes;
        this.rentBikeRatio = rentBikeRatio;
        this.availableReturnBikes = availableReturnBikes;
        this.coordinates = coordinates;
    }
}

async function fetchUbikeData() {
    const response = await fetch('https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json');
    const data = await response.json();
    return data.map(station => new UbikeStation(station));
}
