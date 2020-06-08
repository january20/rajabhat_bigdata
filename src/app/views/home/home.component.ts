import { Component, OnInit } from '@angular/core';
import { HomeService } from './shared/home.service';
import { LatLngLiteral } from '@agm/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { Router } from '@angular/router';
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
    zoom: 9.8,
  }
  geoJsonObject: Object;
  polygonPaths: Array<Array<LatLngLiteral>> = [];
  countData: any;
  villages: any = [];
  air_quality: any;
  weathers: any;
  houseIcon = { url: 'assets/img/house.png', scaledSize: {height: 40, width: 40} };
  weatherDescriptions = {
    fewclouds: {
      description: 'มีเมฆน้อย',
      icon: { url: 'assets/img/weathers/weather02.png', scaledSize: {height: 40, width: 40} }
    },
    brokenclouds: {
      description: 'มีเมฆกระจัดกระจาย',
      icon: { url: 'assets/img/weathers/weather03.png', scaledSize: {height: 40, width: 40} }
    },
    overcastclouds: {
      description: 'มีเมฆปกคลุมมาก',
      icon: { url: 'assets/img/weathers/weather04.png', scaledSize: {height: 40, width: 40} }
    },
    scatteredclouds: {
      description: 'มีเมฆปกคลุมเป็นแห่งๆ',
      icon: { url: 'assets/img/weathers/weather03.png', scaledSize: {height: 40, width: 40} }
    },
    lightrain: {
      description: 'มีฝนเล็กน้อย',
      icon: { url: 'assets/img/weathers/weather05.png', scaledSize: {height: 40, width: 40} }
    },
    moderaterain: {
      description: 'มีฝนปานกลาง',
      icon: { url: 'assets/img/weathers/weather06.png', scaledSize: {height: 40, width: 40} }
    },
    showerrain: {
      description: 'มีฝนตกเป็นแห่งๆ',
      icon: { url: 'assets/img/weathers/weather06.png', scaledSize: {height: 40, width: 40} }
    },
    heavyintensityrain: {
      description: 'มีฝนตกหนัก',
      icon: { url: 'assets/img/weathers/weather07.png', scaledSize: {height: 40, width: 40} }
    },
    veryheavyrain: {
      description: 'มีฝนตกหนักมาก',
      icon: { url: 'assets/img/weathers/weather07.png', scaledSize: {height: 40, width: 40} }
    },
    thunderstorm: {
      description: 'มีฝนฟ้าคะนอง',
      icon: { url: 'assets/img/weathers/weather09.png', scaledSize: {height: 40, width: 40} }
    },
    thunderstormwithrain: {
      description: 'มีพายุฝนฟ้าคะนอง',
      icon: { url: 'assets/img/weathers/weather08.png', scaledSize: {height: 40, width: 40} }
    },
    thunderstormwithheavyrain: {
      description: 'มีพายุฝนฟ้าคะนอง กับมีฝนตกหนัก',
      icon: { url: 'assets/img/weathers/weather08.png', scaledSize: {height: 40, width: 40} }
    },
    thunderstormwithlightrain: {
      description: 'มีพายุฝนฟ้าคะนอง กับมีฝนตกเล็กน้อย',
      icon: { url: 'assets/img/weathers/weather08.png', scaledSize: {height: 40, width: 40} }
    },
    clearsky: {
      description: 'ท้องฟ้าโปร่งใส',
      icon: { url: 'assets/img/weathers/weather01.png', scaledSize: {height: 40, width: 40} }
    },
    fog: {
      description: 'มีหมอกหนาวปกคลุมพื้นที่',
      icon: { url: 'assets/img/weathers/weather16.png', scaledSize: {height: 40, width: 40} }
    },
    mist: {
      description: 'มีหมอกฝนปกคลุมพื้นที่',
      icon: { url: 'assets/img/weathers/weather16.png', scaledSize: {height: 40, width: 40} }
    },
    haze: {
      description: 'มีฝุ่นปกคลุมพื้นที่',
      icon: { url: 'assets/img/weathers/weather02.png', scaledSize: {height: 40, width: 40} }
    },
  }
  // private map: google.maps.Map = null;
  // private heatmap: google.maps.visualization.HeatmapLayer = null;

  constructor(
    private homeService: HomeService,
    private matDialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.getGeoJson();
    //this.getVillages();
    this.getWeathers();
    //this.getAirQuality();
    //this.getCountData();
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

  getCountData() {
    this.homeService.getCountData().subscribe((data: any) => this.countData = data);
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

  navigate(path: string) {
    this.router.navigate([path]);
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
