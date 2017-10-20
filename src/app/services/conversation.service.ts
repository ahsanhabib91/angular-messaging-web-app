import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class ConversationService {

  constructor(public http:Http) { }

  	create_header(token:string) {
		let myheaders = new Headers();
		let jwt_token = 'JWT ' + token;
		myheaders.append('X-Requested-With', 'XMLHttpRequest');
		myheaders.append('Accept', 'application/json');
		myheaders.append('Content-Type', 'application/json');
		myheaders.append('Authorization', jwt_token);
		return myheaders;
  	}

  	getInboxes(inbox_url:string, token:string): Observable<any> {
		let myheaders = this.create_header(token);
		return this.http.get( inbox_url, {
			headers: myheaders
		})
		.map((res) => {
			return res.json();
		});
  	}

	create_conversation(converastion_create_url:string, conversation_data, token:string): Observable<any> {
		let myheaders = this.create_header(token);
		return this.http.post(converastion_create_url,
		{
			msg_sender: conversation_data.msg_sender,
			msg_receiver: conversation_data.msg_receiver,
			message: conversation_data.message,
			image:  conversation_data.image,
			conversation_id: conversation_data.conversation_subject,
			conversation_subject: conversation_data.conversation_subject
		},
		{
			headers: myheaders
		})
		.map((res) => {
			return res.json();
		});
	}

  	archiveCoversation(archive_url: string, token: string, archived:boolean) {
        let myheaders = this.create_header(token);
        return this.http.put(archive_url,
        {
            archived: archived
        },
        {
              headers: myheaders
        })
        .map((res) => {
            return res.json();
        });
    }

    deleteCoversation(delete_url: string, token: string) {
        let myheaders = this.create_header(token);
        return this.http.delete(delete_url,
        {
              headers: myheaders
        })
        .map((res) => {
            return res.json();
        });
    }

}
