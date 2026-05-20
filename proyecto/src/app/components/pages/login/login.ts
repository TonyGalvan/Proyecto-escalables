import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Header } from '../../header/header';
import { Footer } from '../../footer/footer';
import { Card } from '../../card/card';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  public errorMsg = this.authService.errorMessage;

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit() {
    this.authService.errorMessage.set(null);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.username!, this.loginForm.value.password!);
    }
  }
}
