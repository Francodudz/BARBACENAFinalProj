import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    });

    this.authService.getAuthState().subscribe((user: any) => {
      if (user) {
        this.router.navigate(['/add-account']);
      }
    });
  }

  onLogin() {
    if (!this.loginForm.valid) {
        return;
    }
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.login(email, password).then(() => {
        window.alert('Login successful');
        this.router.navigate(['/post-list']);
    }).catch(error => {
      window.alert('login failed');
    });
  }

  register() {
    if (!this.registerForm.valid) {
      return;
    }
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    this.authService.register(email, password)
      .then((result: any) => {
        console.log('User registered');
        console.log(result);
        window.alert('Registered successfully');
        this.router.navigate(['/login']);
      }).catch((error: any) => {
        console.error(error);
      });
  }
}