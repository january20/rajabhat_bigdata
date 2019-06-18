import { Component, OnInit } from '@angular/core';
import { HomeService } from './shared/home.service';
import { LatLngLiteral } from '@agm/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
// declare const google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  googleMapOptions = {
    lat: 14.882564,
    lng: 103.494215,
    zoom: 9.6,
  }
  geoJsonObject: Object;
  polygonPaths: Array<Array<LatLngLiteral>> = [];
  villages: any = [];
  air_quality: any;
  weathers: any;
  weatherIcon = { url: 'assets/img/weather-icon.png', scaledSize: {height: 40, width: 40} };
  weatherDescriptions = {
    fewclouds: 'มีเมฆน้อย',
    brokenclouds: 'มีเมฆกระจัดกระจาย',
    overcastclouds: 'มีเมฆปกคลุมมาก',
    scatteredclouds: 'มีเมฆปกคลุมเป็นแห่งๆ',
    lightrain: 'มีฝนเล็กน้อย',
    moderaterain: 'มีฝนปานกลาง',
    showerrain: 'มีฝนตกเป็นแห่งๆ',
    heavyintensityrain: 'มีฝนตกหนัก',
    veryheavyrain: 'มีฝนตกหนักมาก',
    thunderstorm: 'มีฝนฟ้าคะนอง',
    thunderstormwithrain: 'มีพายุฝนฟ้าคะนอง',
    thunderstormwithheavyrain: 'มีพายุฝนฟ้าคะนอง กับมีฝนตกหนัก',
    thunderstormwithlightrain: 'มีพายุฝนฟ้าคะนอง กับมีฝนตกเล็กน้อย',
    clearsky: 'ท้องฟ้าโปร่งใส',
    fog: 'มีหมอกหนาวปกคลุมพื้นที่',
    mist: 'มีหมอกฝนปกคลุมพื้นที่',
    haze: 'มีฝุ่นปกคลุมพื้นที่',
  }
  // private map: google.maps.Map = null;
  // private heatmap: google.maps.visualization.HeatmapLayer = null;

  constructor(
    private homeService: HomeService,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.getGeoJson();
    this.getVillages();
    this.getWeathers();
    this.getAirQuality();
  }

  toggleModal(village): void {
    this.matDialog.open(ModalComponent, {
      width: '50%',
      data: { id: village.id }
    });
  }

  getGeoJson() {
    this.homeService.getSurinCoorddinates().subscribe((data: any) => {
      this.geoJsonObject = {
        "type": "FeatureCollection",
        "features": [{
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [0, 90],
                  [180, 90],
                  [180, -90],
                  [0, -90],
                  [-180, -90],
                  [-180, 0],
                  [-180, 90],
                  [0, 90]
                ],
                data.geometry.coordinates[0]
              ]
          },
          "properties": {}
        }]
      }
    });
  }

  getVillages() {
    this.homeService.getVillages().subscribe((data: any) => {

      this.villages = data.map(village => {
        village.lat = parseFloat(village.lat);
        village.lng = parseFloat(village.lng);
        return village;
      });

      data.forEach((village: any) => {
        const literal = village.polygon.map(coords => {
          return { lat: parseFloat(coords.lat), lng: parseFloat(coords.lng) }
        })
        this.polygonPaths.push(literal);
      });
    })
  }

  getWeathers() {
    this.homeService.getWeathers().subscribe((data: any) => this.weathers = data);
  }

  getAirQuality() {
    this.homeService.getAirQuality().subscribe((data: any) => this.air_quality = data);
  }

  setGeoJsonStyle(feature) {
    return {
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      // fillColor: '#FF0000',
      // geodesic: false,
      // fillOpacity: 0.0
    }
  }

  markerMouseOver(infoWindow, map) {

    if (map.lastOpen != null) {
      map.lastOpen.close();
    }

    map.lastOpen = infoWindow;

    infoWindow.open();
  }

  // onMapLoad(mapInstance: google.maps.Map) {
  //   this.map = mapInstance;
  //   const coords: google.maps.LatLng[] = new google.maps.LatLng(14.882564, 103.494215);
  //   this.heatmap = new google.maps.visualization.HeatmapLayer({
  //       map: this.map,
  //       data: [coords],
  //       radius: 200,
  //       gradient: ['#ff0000']
  //   });
  // }

}
