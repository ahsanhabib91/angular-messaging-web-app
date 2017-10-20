import {  Component, EventEmitter, Input,  OnInit, ViewChild } from '@angular/core';
import {  NgForm, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';
import { ConversationInfo } from '../../interfaces/conversation-info';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  @Input() conversation_id: string;
  @Input() conversation_info: ConversationInfo;
  @Input() username: string;
  root_url:string;
  messages_url:string = '/api/messages/?format=json';
  message_create_url:string = '/api/message/create';
  message:string=null;
  conversation_with:string;
  success_msg:boolean =false;

  private base64textString:string="";
  @ViewChild('imageFile')
  imageFileVariable: any;

  next_page_url:string;
  previous_page_url:string;
  next_page_disable:boolean;
  previous_page_disable:boolean;
  
  messages:any[];
  token:string;

  constructor(private messageService:MessageService, private authService:AuthService) { }

	ngOnInit() {
		this.root_url = this.authService.get_root_url();
	  	this.token = this.authService.getToken();
	    this.messageService.getMessages(this.root_url + this.messages_url + '&conversation_id=' + this.conversation_info.conversation_id, this.token).subscribe((messages) => {
	        this.common_operation(messages);
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


	send_message(form: NgForm) {
		let msg_data = {
			msg_sender: this.username,
			msg_receiver: this.conversation_with,
			message: form.value.message,
			image: this.base64textString,
			conversation_id: this.conversation_info.conversation_id,
			conversation_subject: this.conversation_info.conversation_subject
		};
		this.messageService.create_message(this.root_url + this.message_create_url, msg_data, this.token).subscribe((message) => {
			this.success_msg = true;
			this.message = '';
			this.base64textString= '';
			this.imageFileVariable.nativeElement.value = "";
			this.reset_page();
		});
	}

	go_to_next_page() {
		this.messageService.getMessages(this.next_page_url, this.token).subscribe((inboxes) => {
			this.common_operation(inboxes);
		});
	}
	go_to_previous_page() {
		this.messageService.getMessages(this.previous_page_url, this.token).subscribe((inboxes) => {
			this.common_operation(inboxes);
		});
	}

	common_operation(messages) {
		this.messages = messages.results;
		this.next_page_url = messages.next;
		this.previous_page_url = messages.previous;

		if (this.username == this.messages[0].msg_receiver.username) { 
			this.conversation_with = this.messages[0].msg_sender.username;
		} else if(this.username == this.messages[0].msg_sender.username) {
			this.conversation_with = this.messages[0].msg_receiver.username;
		}

		if (this.next_page_url == null) {
		  this.next_page_disable = true;
		}
		else {
		  this.next_page_disable = false;
		}

		if (this.previous_page_url == null) {
		  this.previous_page_disable = true;
		}
		else {
		  this.previous_page_disable = false;
		}
	}

	reset_page() {
		this.messageService.getMessages(this.root_url + this.messages_url + '&conversation_id=' + this.conversation_info.conversation_id, this.token).subscribe((messages) => {
		    this.common_operation(messages);
		});
	}

	close_success_msg() {
		this.success_msg = false;
	}




}
