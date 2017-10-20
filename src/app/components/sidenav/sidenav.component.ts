import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ConversationInfo } from '../../interfaces/conversation-info';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  inbox:boolean = true;
  compose:boolean = false;
  messages:boolean = false;
  archived_inbox:boolean = false;
  
  show_inbox_icon:boolean = true;
  show_compose_icon:boolean = false;
  show_archived_inbox_icon:boolean = false;

  username:string;
  conversation_id:string;
  conversation_subject:string;
  conversation_info:ConversationInfo;

  constructor(private authService:AuthService) { }

  ngOnInit() {
  	this.username = this.authService.getUsername();
  }

  get_messages(conversation_info: ConversationInfo):void {
    this.inbox = false;
    this.compose = false;
    this.archived_inbox = false;
    this.show_inbox_icon = false;
    this.show_compose_icon = false;
    this.show_archived_inbox_icon = false;
    this.conversation_info = conversation_info;
    this.messages = true;
  }
  show_inbox() {
  	this.inbox = true;
  	this.compose = false;
    this.messages = false;
    this.archived_inbox = false;
    this.show_inbox_icon = true;
    this.show_compose_icon = false;
    this.show_archived_inbox_icon = false;
  }

  show_compose() {
    this.username = this.authService.getUsername();
  	this.inbox = false;
  	this.compose = true;
    this.archived_inbox = false;
    this.messages = false;
    this.show_inbox_icon = false;
    this.show_compose_icon = true;
    this.show_archived_inbox_icon = false;
  }
  show_archived_inbox() {
    this.username = this.authService.getUsername();
    this.inbox = false;
    this.compose = false;
    this.archived_inbox = true;
    this.messages = false;
    this.show_inbox_icon = false;
    this.show_compose_icon = false;
    this.show_archived_inbox_icon = true;
  }
  logout() {
    this.authService.logout();
  }

}
