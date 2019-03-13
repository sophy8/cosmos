import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { RegisterService } from '../../service/register.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
    this.service.login(data).subscribe((res) => {
      console.log(res);
    });
  }

}
