import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { icon, LatLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, map, Map, marker, Marker, tileLayer } from 'leaflet';
import { LocationService } from '../../../services/location';
import { Order } from '../../../shared/model/order';

@Component({
  selector: 'map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() order!: Order;

  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl: 'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });
  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62];

  @ViewChild('map', { static: true })
  mapRef!: ElementRef;
  map!: Map;
  currentMarker!: Marker;

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    if (!this.order) {
      this.order = new Order();
    }
    this.initializeMap();
  }

  initializeMap() {
    if (this.map) return;

    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false,
    }).setView(this.DEFAULT_LATLNG, 1);

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);

    this.map.on('click', (e: LeafletMouseEvent) => {
      this.setMarker(e.latlng);
    });

    // Set initial marker if addressLatLng exists
    if (this.order.addressLatLng) {
      this.setMarker(this.order.addressLatLng);
    }
  }

  findMyLocation() {
    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => {
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL);
        this.setMarker(latlng);
      },
      error: (err) => console.error('Error getting location:', err),
    });
  }

  setMarker(latlng: LatLngExpression) {
    let latLngObj: LatLng;

    if (latlng instanceof LatLng) {
        latLngObj = latlng;
    } else if (Array.isArray(latlng)) {
        latLngObj = new LatLng(latlng[0], latlng[1]);
    } else {
        latLngObj = new LatLng(latlng.lat, latlng.lng);
    }

    // Add console log to verify the latLngObj
    console.log('Setting marker at:', latLngObj);

    // Update the order's addressLatLng
    this.order.addressLatLng = latLngObj;
    
    // Add console log to verify the order update
    console.log('Updated order addressLatLng:', this.order.addressLatLng);

    // Update or create marker
    if (this.currentMarker) {
        this.currentMarker.setLatLng(latLngObj);
    } else {
        this.currentMarker = marker(latLngObj, {
            draggable: true,
            icon: this.MARKER_ICON,
        }).addTo(this.map);

        this.currentMarker.on('dragend', () => {
            const newPos = this.currentMarker.getLatLng();
            this.order.addressLatLng = newPos;
            // Add console log for drag events
            console.log('Marker dragged to:', newPos);
        });
    }
}}