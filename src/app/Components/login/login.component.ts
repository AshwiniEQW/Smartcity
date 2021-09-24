import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import {ErrorStateMatcher} from '@angular/material/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  adminLoginForm: FormGroup;
  loading = false;
  submitted = false;
  hide = true;
  head_title="Thiruvananthapuram Connect";
  matcher = new ErrorStateMatcher();
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: ApiService,
    private toastrService: ToastrService,
    private cookieService: CookieService
  ) {


  }

  ngOnInit() {

    this.adminLoginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required,Validators.minLength(8)]),
      'rememberMe':new FormControl(false)
    });
    
    // let username=localStorage.getItem('encrypt_username');
  
    // if(username!=null )
    // {
    //   console.log(CryptoJS.AES.decrypt(username, environment.encryptPassword.trim()).toString(CryptoJS.enc.Utf8));
    // }
    
    let rememberMe:any=localStorage.getItem('rememberMe');
    let encrypt_username:any=localStorage.getItem('encrypt_username');
    let encrypt_password:any=localStorage.getItem('encrypt_password');
    if((rememberMe=='true'||rememberMe==true ) && (localStorage.getItem('user_id')==null || localStorage.getItem('user_id')==undefined||localStorage.getItem('user_id')=='') ){
    if(localStorage.getItem('token')==null||localStorage.getItem('token')==undefined){
      let decrypt_username= CryptoJS.AES.decrypt(encrypt_username, environment.encryptPassword.trim()).toString(CryptoJS.enc.Utf8);
      let decrypt_password= CryptoJS.AES.decrypt(encrypt_password, environment.encryptPassword.trim()).toString(CryptoJS.enc.Utf8);
    
      // this.adminLoginForm = new FormGroup({
      //   'email': new FormControl(decrypt_username, [Validators.required, Validators.email]),
      //   'password': new FormControl(decrypt_password, [Validators.required]),
      //   'rememberMe':new FormControl(false)
      // });
      this.adminLoginForm.setValue({
        email: decrypt_username,
        password:decrypt_password,
        rememberMe:true
      });
    }

    }

    
   
    this.checkRememberMe();



  }

  checkRememberMe(){
 
    let rememberMe:any=localStorage.getItem('rememberMe');
    let encrypt_username:any=localStorage.getItem('encrypt_username');
    let encrypt_password:any=localStorage.getItem('encrypt_password');
    if((rememberMe=='true'||rememberMe==true ) && (localStorage.getItem('user_id')==null || localStorage.getItem('user_id')==undefined||localStorage.getItem('user_id')=='') ){
    if(localStorage.getItem('token')==null||localStorage.getItem('token')==undefined){
      let decrypt_username= CryptoJS.AES.decrypt(encrypt_username, environment.encryptPassword.trim()).toString(CryptoJS.enc.Utf8);
      let decrypt_password= CryptoJS.AES.decrypt(encrypt_password, environment.encryptPassword.trim()).toString(CryptoJS.enc.Utf8);
    }

    }

   
  
    if(localStorage.getItem('user_id')!=null ||localStorage.getItem('user_id')!=undefined||localStorage.getItem('user_id')!=''){
      this.router.navigate(['/HomePage']);
    }
    
  }
  get f() { return this.adminLoginForm.controls; }

  // get input() { return this.adminLoginForm.get('email'); }

  onSubmit() {
    this.submitted = true;
    console.log(this.adminLoginForm.value);
    console.log(this.adminLoginForm.controls.rememberMe.value);
    let username=this.adminLoginForm.controls.email.value;
    let password=this.adminLoginForm.controls.password.value;
    let rememberMe=this.adminLoginForm.controls.rememberMe.value;
    this.cookieService.set('username', username);
    this.cookieService.set('password', password);


     localStorage.setItem('encrypt_username',CryptoJS.AES.encrypt(username.trim(), environment.encryptPassword.trim()).toString()) 

     localStorage.setItem('encrypt_password',CryptoJS.AES.encrypt(password.trim(), environment.encryptPassword.trim()).toString()) 


    //this.cookieService.set('isLoggedin',this.adminLoginForm.controls.rememberme.value);
    if (this.adminLoginForm.invalid) {

      this.toastrService.warning('Please enter Email & Password!');
      return;
    }
    else {
      this.service.login(this.adminLoginForm.value).subscribe((res) => {


        if (res.status) {

          if (res.data.is_admin == true && res.message == "Logged in successfully") {
            localStorage.setItem('user_id', res.data.user_id);
            // console.log(localStorage.getItem('user_id'));
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('full_name', res.data.full_name);
            localStorage.setItem('image', res.data.image);
            localStorage.setItem('rememberMe',rememberMe);
            this.toastrService.success('Login Successful!');
            this.router.navigate(['/HomePage']);
          }
          else {
            this.toastrService.error('Email or password you entered is not correct. Please try again.');
          }

        }

      },
        error => {
          this.toastrService.error('Email or password you entered is not correct. Please try again.');
        }
      );
    }
    this.adminLoginForm.markAsPristine();
    this.adminLoginForm.markAsUntouched();
  }

}
