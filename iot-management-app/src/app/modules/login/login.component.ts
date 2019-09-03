import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notifier: NotificationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required])
    });
  }

  login(user: any): void {
    this.authService.login(user).subscribe(
      (res: any) => {
        localStorage.setItem('currentUserToken', res.token);
        localStorage.setItem('currentUserName', res.username);
        this.notifier.showSuccess('Bem-vindo!', 'Login realizado com sucesso');
        this.router.navigate(['']);
      });
  }

}
