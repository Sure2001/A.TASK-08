import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // 👈 Import HttpClient

@Component({
  selector: 'app-userregister',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {  // 👈 Inject HttpClient
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        email: ['', [Validators.required, Validators.email]],
        dob: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validators: this.mustMatch('password', 'confirmPassword'),
      }
    );
  }

  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: AbstractControl) => {
      const passControl = formGroup.get(password);
      const confirmPassControl = formGroup.get(confirmPassword);

      if (confirmPassControl?.errors && !confirmPassControl.errors['mustMatch']) {
        return;
      }

      if (passControl?.value !== confirmPassControl?.value) {
        confirmPassControl?.setErrors({ mustMatch: true });
      } else {
        confirmPassControl?.setErrors(null);
      }
    };
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const formData = this.registerForm.value;

    // 🔥 POST to backend API
    this.http.post('http://localhost:5000/api/register', formData).subscribe({
      next: (res) => {
        console.log('Form Submitted:', res);
        alert('Registration Successful!');
        this.registerForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        console.error('Registration Failed:', err);
        alert('Error registering user.');
      }
    });
  }
}
