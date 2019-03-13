import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { RegisterService } from '../../service/register.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private service: RegisterService) { }

  ngOnInit() {
    this.setForm();
  }
  setForm() {
    this.loginForm = this.fb.group({
      'username': [null],
      'email': [null],
      'password': [null]
    });
  }
  logIn(data) {
    this.service.register(data).subscribe((res) => {
      console.log(res);
    });
  }
}
