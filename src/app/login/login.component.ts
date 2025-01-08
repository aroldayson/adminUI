import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { AdminService } from '../admin.service';
import Swal from 'sweetalert2';
import { resourceUsage } from 'node:process';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  showPassword: boolean = true;
  load: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  ngOnInit(): void {
    // this.simulateLoading();
  }

  simulateLoading() {
    this.load = true;
    setTimeout(() => {
      this.load = false;
    }, 3000);
  }


  constructor(private admin: AdminService, private router: Router) {}

  loginform = new FormGroup({
    Email: new FormControl(''),
    Password: new FormControl(''),
  });

  login() {
    // this.load = true;
    this.simulateLoading();
    if (this.loginform.valid) {
      this.admin.logins(this.loginform.value).subscribe(
        (result: any) => {
          if (result && result.token) {
            Swal.fire({
              icon: 'success',
              title: 'Login Successful!',
              text: 'You are now logged in.',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            this.load = false;
            localStorage.setItem('Account_ID', result.user.Admin_ID);
            localStorage.setItem('token', result.token);
            this.router.navigate(['/main']);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Login Failed',
              text: 'Login was unsuccessful. Please try again.',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            this.load = false;
          }
          console.log(result);
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Please check your email and password.',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          console.error('Login error:', error);
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Please fill in all required fields correctly.',
        showConfirmButton: true,
      });
      console.log('Form is not valid');
    }
  }


}
