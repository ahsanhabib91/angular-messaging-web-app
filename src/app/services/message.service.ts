import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class MessageService {

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

  	getMessages(messages_url:string, token:string): Observable<any> {
		let myheaders = this.create_header(token);
		return this.http.get( messages_url, {
			headers: myheaders
		})
		.map((res) => {
			return res.json();
		});
  	}

  	create_message(message_create_url:string, message_data, token:string): Observable<any> {
        let myheaders = this.create_header(token);
		return this.http.post(
			message_create_url,
		{
			msg_sender: message_data.msg_sender,
			msg_receiver: message_data.msg_receiver,
			message: message_data.message,
			image:  message_data.image,
			conversation_id: message_data.conversation_id,
			conversation_subject: message_data.conversation_subject
		},
		{
			headers: myheaders
		})
        .map((res) => {
            return res.json();
        });
	}

}
