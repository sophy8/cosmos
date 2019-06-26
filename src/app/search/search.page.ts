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
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

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
  fromSelected = false;
  toSelected = false;
  minDate = new Date();
  selectedFrom;
  minDateMulticity = new Date();
  availableDate = [];
  availableDateReturn = [];
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

  dateFilterArrival = (date: Date) => date >= this.minDateMulticity && this.availableDateReturn.indexOf(this.formatDate(date)) > -1;
  dateFilterDeparture = (date: Date) => this.availableDate.indexOf(this.formatDate(date)) > -1;

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
  onChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);

    this.fromSelected = true;
    this.selectedFrom = event.value;
  }
  onChangeTo(event) {
    this.toSelected = true;
    if (this.fromSelected) {
      this.flights.forEach((el) => {
        if (el.from === this.form.controls['from'].value && el.to === this.form.controls['to'].value) {
          this.availableDate = el.departure[0].departure_date;
          this.availableDateReturn = el.departure[1].arrive_date;
        }
      });
      console.log(this.availableDate)
    }
  }
 formatDate(d) {
    let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) {month = '0' + month};
    if (day.length < 2) {day = '0' + day};

    return [year, month, day].join('-');
}
}
