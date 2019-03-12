import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../service/flight.service';
import { DataService } from 'src/app/service/data.service';
@Component({
  selector: 'app-find-item',
  templateUrl: './find-item.component.html',
  styleUrls: ['./find-item.component.scss']
})
export class FindItemComponent implements OnInit {
availableFlight;
  constructor(private flightService: FlightService, private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.availableFlight = message);
    this.getAllFlight();
  }
  getAllFlight() {
    this.flightService.getAllFlights().subscribe((res) => {
      console.log(res);
    });
  }
}
