import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { IUserRegister } from '../../../shared/interfaces/IUserRegister';
import { PasswordsMatchValidator } from '../../../shared/validators/password_match_validator';
import { CommonModule } from '@angular/common';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { TitleComponent } from '../../partials/title/title.component';
import { InputValidationComponent } from '../../partials/input-validation/input-validation.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule,RouterLink,DefaultButtonComponent,TextInputComponent,TitleComponent,ReactiveFormsModule,InputValidationComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit {
  registerForm!:FormGroup;
  isSubmitted = false;
  returnUrl = '';
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(5)]]
    },{
      validators: PasswordsMatchValidator('password','confirmPassword')
    });
    this.returnUrl= this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc() {
    return this.registerForm.controls;
  }
  submit(){
    this.isSubmitted = true;
    if(this.registerForm.invalid) return;
    const fv= this.registerForm.value;
    const user :IUserRegister = {
      name: fv.name,
      email: fv.email,
      password: fv.password,
      confirmPassword: fv.confirmPassword,
      address: fv.address
    };
    this.userService.register(user).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }

  
 

}

