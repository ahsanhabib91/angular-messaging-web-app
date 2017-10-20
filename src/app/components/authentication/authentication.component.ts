import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { NgForm } from "@angular/forms";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  token:string;
  signin:boolean = true;
  register:boolean = false;
  success_msg:boolean = false;
  error_msg:boolean = false;
  main_error_msg:any[];
  title:string = 'Please Login';
  email:string;
  emailFormControl = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);

    constructor(private authService: AuthService, private router: Router) { }
    
	ngOnInit() {
		if (localStorage.getItem('token')) {
			this.authService.verify_token(localStorage.getItem('token'))
			.subscribe(data => {
				this.router.navigate(['/']);
				return true;
			},
			error => {
				console.log(error._body.json());
			});
		} 
	}
	
	/* Login Submission handler */
	onLogin(form: NgForm) {
		this.authService.signin(form.value.username,form.value.password)
		.subscribe(data => {
			this.token = data.token;
			this.router.navigate(['']);
		},
		error => {
			let validation_error = error.json();
			let errors = [];
			if (validation_error.non_field_errors) {
				errors.push(validation_error.non_field_errors[0]);
			}
			this.main_error_msg = errors;
			this.error_msg = true;
		});
	}

	/* Sign Up Submission handler */
	onSignup(form: NgForm) {
		this.authService.signup(form.value.username, this.email, form.value.password)
		.subscribe(response => {
			this.success_msg = true;
			this.signin = true;
			this.register = false;
			this.email = "";
		},
		(error) => {
			let validation_error = error.json();
			let errors = [];
			if (validation_error.username) {
				errors.push(validation_error.username[0]);
			}
			if (validation_error.non_field_errors) {
				errors.push(validation_error.non_field_errors[0]);
			}
			this.main_error_msg = errors;
			this.error_msg = true;
		});
	}
	close_success_msg () {
		this.success_msg = false;
		return false;
	}
	close_error_msg() {
	  	this.error_msg = false;
	  	return false;
	}
	show_signin_form() {
	  	this.email = "";
	  	this.title = 'Please Login';
		this.signin = true;
		this.register = false;
	}
	show_signup_form() {
	  	this.email = "";
	  	this.title = 'Please Register';
		this.signin = false;
		this.register = true;
	}
	logout() {
		this.authService.logout();
	}
}
