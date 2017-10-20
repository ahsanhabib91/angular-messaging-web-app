import {  Component, EventEmitter, Input, Output,  OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ConversationService } from '../../services/conversation.service';
import { ConversationInfo } from '../../interfaces/conversation-info';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  @Output() conversation_info = new EventEmitter<ConversationInfo>();
  @Input() username: string;
  @Input() archived_inbox: boolean;

  root_url:string;
  inbox_url:string = '/api/conversations/?format=json';
  
  next_page_url:string;
  previous_page_url:string;
  
  next_page_disable:boolean;
  previous_page_disable:boolean;
  
  inboxes:any[];
  token:string;

  show_success_msg:boolean = false;
  success_msg:string;

  	constructor(private conversationService:ConversationService, private authService:AuthService) { }

	ngOnInit() {
		this.root_url = this.authService.get_root_url();
		this.token = this.authService.getToken();
		this.conversationService.getInboxes(this.root_url + this.inbox_url + '&username=' + this.username +'&archived='+ this.archived_inbox, this.token)
		.subscribe((inboxes) => {
	    	this.common_operation(inboxes);
		});
	}

	archived_conversation(archive_url:string) {
		this.conversationService.archiveCoversation(archive_url, this.token, true).subscribe((response) => {
	      	this.show_success_msg = true;
	      	this.success_msg = "Selected Conversation has archived";
	      	this.reset_page();
	  	});
	}

	un_archived_conversation(archive_url:string) {
		this.conversationService.archiveCoversation(archive_url, this.token, false).subscribe((response) => {
		    this.show_success_msg = true;
		    this.success_msg = "Selected Conversation has Unarchived";
		    this.reset_page();
		});
	}

	delete_conversation(delete_url:string) {
	  	this.conversationService.deleteCoversation(delete_url, this.token).subscribe((response) => {
	      	this.show_success_msg = true;
	      	this.success_msg = "Selected Conversation has deleted";
	      	this.reset_page();
	  	});  
	}
	
	go_to_next_page() {
	  	this.conversationService.getInboxes(this.next_page_url, this.token).subscribe((inboxes) => {
	    	this.common_operation(inboxes);
	  	});
	}
	go_to_previous_page() {
	    this.conversationService.getInboxes(this.previous_page_url, this.token).subscribe((inboxes) => {
		    this.common_operation(inboxes);
	    });
	}

    common_operation(inboxes) {
		this.inboxes = inboxes.results;
		this.next_page_url = inboxes.next;
		this.previous_page_url = inboxes.previous;
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

  	close_success_msg () {
    	this.show_success_msg = false;
    	this.success_msg = '';
    	return false;
    }

  	reset_page() {
	    this.conversationService.getInboxes(this.root_url + this.inbox_url + '&username=' + this.username +'&archived='+ this.archived_inbox, this.token).subscribe((inboxes) => {
	        this.common_operation(inboxes);
	    });
  	}

  	get_message(conversation_id: string, conversation_subject: string) {
	    let conversation_info:ConversationInfo = {
			conversation_id: conversation_id,
			conversation_subject: conversation_subject,
			archived: this.archived_inbox
	    };
    	this.conversation_info.emit(conversation_info);
  	}  	

}
