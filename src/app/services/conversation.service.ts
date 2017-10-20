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
