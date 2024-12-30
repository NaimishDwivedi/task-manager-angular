import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,RouterModule,RouterLink,LoginComponent], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router:Router,private toastr:ToastrService) {}

  register(registerForm: NgForm) {
    const formValues = registerForm.value;
    // console.log('Form values:', formValues);

    if (formValues.username && formValues.email && formValues.password) {
      this.authService.register(formValues.username ,formValues.email, formValues.password).subscribe({
        next: () => {
          this.toastr.success('Registration successfully'); 
          this.router.navigate(['/login'])
        },
        error: () => this.toastr.error('Registration Failed'),
      });
    }
  }
}
