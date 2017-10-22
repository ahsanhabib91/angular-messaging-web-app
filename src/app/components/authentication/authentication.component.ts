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
  token:string;						/* @string [user authentication token]	*/
  signin:boolean = true;			/* @boolean [to show the signin form and hide signup form] */
  register:boolean = false;			/* @boolean [to show the signup form and hide signin form] */
  success_msg:boolean = false;		/* @boobean [to show the success message] */
  error_msg:boolean = false;		/* @boobean [to show the error message] */
  main_error_msg:any[];				/* @array 	[to save the error messages] */
  title:string = 'Please Login';	/* @string 	[ form title] @default [Please Login] */
  email:string;						/* @string 	[to take email from user through two way data-binding] */
  
  /**
   * [FormControl checking the email validation]
   */
  emailFormControl = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);

    constructor(private authService: AuthService, private router: Router) { }
    
	ngOnInit() {
		/**
		 * [Checking whether the token is saved in the browser. 
		 * If so, then checking whether its validity time has expired or not by sending back-end notification]
		 * @param {[string]} localStorage.getItem('token') [description]
		 */
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
	
	/**
	* [onLogin submission handler function]
	* @param {NgForm} form [ signin through the username and password ]
	*/
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
	/**
	 * [onSignup submission handler function]
	 * @param {NgForm} form [ signup through the username, email, password ]
	 */
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

	/**
	 * [close the success message]
	 */
	close_success_msg () {
		this.success_msg = false;
		return false;
	}

	/**
	 * [close the error message]
	 * return @boolean
	 */
	close_error_msg() {
	  	this.error_msg = false;
	  	return false;
	}

	/**
	 * [show the signin form and hide signup form]
	 */
	show_signin_form() {
	  	this.email = "";
	  	this.title = 'Please Login';
		this.signin = true;
		this.register = false;
	}

	/**
	 * [show the signup form and hide signin form]
	 * return @boolean
	 */
	show_signup_form() {
	  	this.email = "";
	  	this.title = 'Please Register';
		this.signin = false;
		this.register = true;
	}

	/**
	 * [logout the user]
	 * return @boolean
	 */
	logout() {
		this.authService.logout();
	}
}
