import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ComposeComponent } from './components/compose/compose.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { AuthService } from './services/auth.service';

const appRoutes: Routes = [
    { path:'', component:SidenavComponent, canActivate: [AuthService] },
	{ path:'authentication', component:AuthenticationComponent },
	
	// otherwise redirect to 404 Page or Component
    { path: '**', redirectTo: 'authentication' }
];

export const routing = RouterModule.forRoot(appRoutes);