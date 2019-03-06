import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../service/flight.service';
@Component({
  selector: 'app-find-item',
  templateUrl: './find-item.component.html',
  styleUrls: ['./find-item.component.scss']
})
export class FindItemComponent implements OnInit {

  constructor(private flightService: FlightService) { }

  ngOnInit() {
    this.getAllFlight();
  }
  getAllFlight() {
    this.flightService.getAllFlights().subscribe((res) => {
      console.log(res);
    });
  }
}
