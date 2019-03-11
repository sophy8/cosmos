import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchRoutingModule } from './search-routing.module';
import { SearchPage } from './search.page';
import { FindItemComponent } from './find-item/find-item.component';
import { IonicSelectableModule } from 'ionic-selectable';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FlightService } from '../service/flight.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PlanetService } from '../service/planet.service';
import { AvailablePlanetPipe } from '../pipes/available-planet.pipe';
import { AvailablePlanetToPipe } from '../pipes/available-planet-to.pipe';
import { MaterialModule } from '../../app/modules//material/material.module';
import { DataService } from '../service/data.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchRoutingModule, HttpClientModule, FormsModule, MaterialModule,
    ReactiveFormsModule, IonicSelectableModule, BsDatepickerModule.forRoot()
  ],
  declarations: [SearchPage, FindItemComponent, AvailablePlanetPipe, AvailablePlanetToPipe],
  providers: [FlightService, PlanetService, DataService]
})
export class SearchPageModule { }
