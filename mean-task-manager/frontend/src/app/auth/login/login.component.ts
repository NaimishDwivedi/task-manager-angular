import { Component } from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterOutlet,RouterLink,RegisterComponent,ToastrModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // email = ''
  // password = ''

  constructor(private authService: AuthService, private router:Router,private toastr: ToastrService ) {}

  login(loginForm: NgForm) {
    console.log('Form:', loginForm);
    const formValues = loginForm.value;
    console.log('Form Values:', formValues);
    if (formValues) {
      this.authService.login(formValues.email, formValues.password).subscribe({
        next: (response: any) => {
          this.toastr.success('Logged in successfully'); 
          console.log(response.user);
          
          localStorage.setItem('token', response.token);

          sessionStorage.setItem('user',JSON.stringify(response.user))
          this.router.navigate([`/showTasks/:${response.user.id}`])
        },
        error: () => this.toastr.error('Invalid Credentials'),
      });
    }
  }
}
