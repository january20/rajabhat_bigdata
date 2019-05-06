import { Component, OnInit } from '@angular/core';
import { HomeService } from './shared/home.service';
import { LatLngLiteral } from '@agm/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';

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

  constructor(
    private homeService: HomeService,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.getGeoJson();
    this.getVillages();
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

}
