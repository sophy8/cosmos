import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { LoadingController, AlertController } from '@ionic/angular';
import { PlanetService } from '../service/planet.service';
import { FlightService } from '../service/flight.service';
import { DataService } from '../service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { min } from 'rxjs/operators';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

class Port {
  public id: number;
  public name: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})


export class SearchPage implements OnInit {
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  form: FormGroup;
  minDate = new Date();
  selectedFrom;
  minDateMulticity = new Date();
  dateFilterDeparture;
  @ViewChild('portComponent') portComponent: IonicSelectableComponent;
  constructor(private fb: FormBuilder, private flightService: FlightService, private router: Router, private data: DataService,
    private loadingController: LoadingController, private planetService: PlanetService) { }
  ports: Port[];
  port: Port;
  planets = [];
  flights = [];
  ngOnInit() {
    console.log(this.minDate);
    this.setPlanet();
    this.setAllFlight();
    this.form = this.fb.group({
      'return': [null, Validators.required],
      'from': [null, Validators.required],
      'to': [null, Validators.required],
      'date_from': [null, Validators.compose([Validators.required,
      ])],
      'date_to': [null]
    });
    this.ports = [
      { id: 1, name: 'Tokai' },
      { id: 2, name: 'Vladivostok' },
      { id: 3, name: 'Navlakhi' }
    ];
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
   console.log(event.value);
  this.minDateMulticity.setDate(event.value.getDate());
  }
  dateFilterArrival = (date: Date) => date >= this.minDateMulticity;
  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }
  async search(value) {
    const loading = await this.loadingController.create({
      message: "Loading..."
    });

    this.flightService.getFlights(value).subscribe((res) => {
      this.data.changeMessage(res);
      console.log(res);
    });
    this.router.navigate([`/search/item`]);
    loading.present();
    loading.dismiss();
  }
  setPlanet() {
    this.planetService.getAllPlanets().subscribe((res: any[]) => {
      this.planets = res;
    });
  }
  setAllFlight() {
    this.flightService.getAllFlights().subscribe((res: any[]) => {
      this.flights = res;
    });
  }
  onChange(event) {
    this.selectedFrom = event.detail.value;
  }
}
