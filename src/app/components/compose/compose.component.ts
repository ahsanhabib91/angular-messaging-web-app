import {  Component, EventEmitter, Input, Output,  OnInit, ViewChild } from '@angular/core';
import {  NgForm, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ConversationService } from '../../services/conversation.service';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {
  root_url:string;
  user_list_url:string = '/api/users/';
  conversation_create_url:string = '/api/conversation/create';
  private base64textString:string="";
  @ViewChild('imageFile')
  imageFileVariable: any;

  username: string;
  receiver_name: string;
  message:string=null;
  conversation_subject:string=null;
  error_msg:boolean =false;
  success_msg:boolean =false;
  receiver_valid:boolean = false;
  user_empty:boolean = false;
  
  users:any[] = [];
  token:string;

	constructor(private conversationService:ConversationService, private authService:AuthService) { }

	ngOnInit() {
		this.root_url = this.authService.get_root_url();
		this.token = this.authService.getToken();
		this.username = this.authService.getUsername();
		this.authService.getUsers(this.root_url + this.user_list_url + '?username=' + this.username , this.token)
		.subscribe((users) => {
			if (users.length != 0) {
				this.users = users;
			}
			else {
				this.user_empty = true;
			}
		});
		
		this.stateCtrl = new FormControl();
		this.filteredUsers = this.stateCtrl.valueChanges
	    .startWith(null)
	    .map((user) => {
	      	if (user) {
				this.receiver_name = user;
				this.receiver_valid = true;
				return this.filterUsers(user);
			}
			else {
				this.receiver_valid = false;
				return this.users.slice();
			}
	    });
	}

    stateCtrl: FormControl;
  	filteredUsers: Observable<any[]>;
    filterUsers(username: string) {
      return this.users.filter(user =>
        user.username.toLowerCase().indexOf(username.toLowerCase()) === 0);
    }
  
	get_all_users() {
		this.stateCtrl = new FormControl();
		this.filteredUsers = this.stateCtrl.valueChanges
		.startWith(null)
		.map((user) => {
			if (user) {
				this.receiver_name = user;
				this.receiver_valid = true;
				return this.filterUsers(user);
			}
			else {
				this.receiver_valid = false;
				return this.users.slice();
			}
		});
	}
	handleImageFileSelect(evt)  {
			let files = evt.target.files;
			let file = files[0];
			if (files && file) {
			let reader = new FileReader();
			reader.onload =this._handleImageReaderLoaded.bind(this);
			reader.readAsBinaryString(file);
		}
	}
	_handleImageReaderLoaded(readerEvt) {
		let binaryString = readerEvt.target.result;
		this.base64textString= btoa(binaryString);
	}

	/* Create Conversation handler */
	send_conversation(form: NgForm) {
		let conversation_data = {
			msg_sender: this.username,
			msg_receiver: this.receiver_name,
			image: this.base64textString,
			message: form.value.message,
			conversation_subject: form.value.conversation_subject
		};
		if (this.username == this.receiver_name) {
			this.receiver_valid = false;
			this.error_msg = true;
		} else {
			this.conversationService.create_conversation(this.root_url + this.conversation_create_url, conversation_data, this.token)
			.subscribe(message => {
				this.message = '';
				this.conversation_subject = '';
				this.base64textString = "";
				this.imageFileVariable.nativeElement.value = "";
				this.receiver_valid = false;
				this.success_msg = true;
				this.error_msg = false;
				this.get_all_users();
			},
			(error) => {
				this.receiver_valid = false;
				this.error_msg = true;
			});
		}

	}
	close_success_msg() {
		this.success_msg = false;
	}
	close_error_msg() {
		this.error_msg = false;
	}

}
