import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleComponent } from '../../partials/title/title.component';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { InputContainerComponent } from '../../partials/input-container/input-container.component';
import { InputValidationComponent } from '../../partials/input-validation/input-validation.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { RegisterPageComponent } from '../register-page/register-page.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,TitleComponent,DefaultButtonComponent,InputContainerComponent,InputValidationComponent,TextInputComponent,RegisterPageComponent,RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {
 

  loginForm!:FormGroup;
  isSubmitted = false;
  returnUrl='';

  constructor(private formBuilder: FormBuilder,private userservice:UserService,
    private activatedroute:ActivatedRoute,private router:Router) { }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required,Validators.email]],
      password:['', Validators.required]
    });
    this.returnUrl = this.activatedroute.snapshot.queryParams.returnUrl;
  }
  get fc(){
    return this.loginForm.controls;
  }
  submit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;

  this.userservice.login({email:this.fc.email.value, 
    password:this.fc.password.value}).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    });
}
}
