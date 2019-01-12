import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpModule } from '@angular/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
//import { HTTP } from '@ionic-native/http/ngx';



import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireMessagingModule } from 'angularfire2/messaging';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { UserService } from './services/user.service';
import { CandidateService } from './services/candidate.service'; 
import { EmployerService } from './services/employer.service';
import { CommunicationService } from './services/communication.service';
import { ConvocatoriasService } from './services/convocatorias.service';
import { NoticiasService } from './services/noticias.service';
import { AdminService } from './services/admin.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.fbConfig),
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireDatabaseModule,
    HttpModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    CandidateService,
    EmployerService,
    CommunicationService,
    ConvocatoriasService,
    NoticiasService,
    AdminService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
