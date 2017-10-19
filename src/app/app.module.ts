import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { ComposeComponent } from './components/compose/compose.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { MessagesComponent } from './components/messages/messages.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    InboxComponent,
    ComposeComponent,
    AuthenticationComponent,
    MessagesComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
