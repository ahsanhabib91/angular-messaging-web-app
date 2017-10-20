import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routing }  from './app.routing';
import { AuthService } from './services/auth.service';
import { MessageService } from './services/message.service';
import { ConversationService } from './services/conversation.service';

import { AppComponent } from './app.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { ComposeComponent } from './components/compose/compose.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { MessagesComponent } from './components/messages/messages.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

import { MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatGridListModule, MatSidenavModule,
        MatTooltipModule, MatIconModule, MatChipsModule, MatMenuModule, MatAutocompleteModule } from '@angular/material';

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
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatSidenavModule,
    MatTooltipModule,
    MatIconModule,
    MatChipsModule,
    MatMenuModule,
    MatAutocompleteModule,
    routing,
  ],
  providers: [AuthService, MessageService, ConversationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
