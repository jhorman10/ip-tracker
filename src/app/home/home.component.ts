import { Component } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../service/map.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  map: any;
  lat = 39.8282;
  lng = -98.5795;

  data: any;
  zoom = 3;

  searchIp: string = '';
  ip: string = '--';
  location: string = '--';
  timezone: string = '--';
  isp: string = '--';

  constructor(private service: MapService) {}

  private initMap(): void {
    this.map = L.map('map', {
      center: [this.lat, this.lng],
      zoom: this.zoom,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
  }

  getData() {
    this.service.getData(this.searchIp).subscribe((data) => {
      this.data = data;
    });

    this.ip = this.data.ip;
    this.location = `${this.data.city}, ${this.data.country_code2}`;
    this.timezone = this.data.time_zone.offset;
    this.isp = this.data.isp;
    this.lat = this.data.latitude;
    this.lng = this.data.longitude;

    this.mapLocation();
  }

  mapLocation() {
    var markerIcon = L.icon({
      iconUrl: '../../assets/images/icon-location.svg',

      iconSize: [46, 56], // size of the icon
      iconAnchor: [23, 55], // point of the icon which will correspond to marker's location
    });
    this.map.setView([this.lat, this.lng], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(
      this.map
    );

    L.marker([this.lat, this.lng], { icon: markerIcon }).addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
}
