import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { LoadingController, AlertController } from '@ionic/angular';

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
  @ViewChild('portComponent') portComponent: IonicSelectableComponent;
  constructor(private fb: FormBuilder, private loadingController: LoadingController) { }
  ports: Port[];
  port: Port;
  ngOnInit() {
    this.form = this.fb.group({
      'return': [null, Validators.required],
      'from': [null, Validators.required],
      'port': [null, Validators.required],
      'date': [null, Validators.required]
    });
    this.ports = [
      { id: 1, name: 'Tokai' },
      { id: 2, name: 'Vladivostok' },
      { id: 3, name: 'Navlakhi' }
    ];
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }
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
    console.log(value);
    loading.present();
    loading.dismiss();
  }
}
