import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { UserService } from './services/user.service';

import { User } from 'firebase';

import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {


  public appPages:any[];
  private userValid:boolean;
  private userEmail:string;
  private uid:string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private uService:UserService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.llenaOpcionesDeMenu();
  }

  llenaOpcionesDeMenu(){
    this.uService.userSubject.subscribe({
      next: (v) => {
        if(v == null && this.appPages == undefined){
          this.userValid = false;
          this.appPages = [
            {
              title: 'Inicio',
              url: '/home',
              icon: 'home'
            },
            {
              title:'Ingresar',
              url:'/login',
              icon:'log-in'
            },
            {
              title: 'Registrate',
              url: '/registrar',
              icon: 'create'
            }
          ];
        }else if(v != null){
          this.uid = v.uid;
          this.userValid = true;
          if (this.appPages == undefined) {
            this.appPages = [
              {
                title: 'Inicio',
                url: '/home',
                icon: 'home'
              },
              {
                title: 'Plazas',
                url: '/plazas',
                icon: 'filing'
              },
              {
                title: 'Convocatorias',
                url: '/oferta',
                icon: 'megaphone'
              }
            ];

          }else{
            this.appPages.pop();
            this.appPages.pop();

            this.appPages.push(
                {
                  title: 'Plazas',
                  url: '/plazas',
                  icon: 'filing'
                },
                {
                  title: 'Convocatorias',
                  url: '/oferta',
                  icon: 'megaphone'
                }
              );
          }
          this.uService.IsCandidate(this.uid).subscribe((res) => {
            
            if(res.ok && res.json() != null){

              if(res.json().count > 0){

                this.appPages.splice(2, 0, {
                  title: 'Perfil',
                  url:'/userProfile',
                  icon: 'contact'
                }, {
                  title: 'Curriculo',
                  url:'/curriculum',
                  icon: 'briefcase'
                });

              }else{
                this.uService.IsEmployer(this.uid).subscribe((r) => {

                  if(r.ok && r.json() != null){

                    if(r.json().count > 0){

                      this.appPages.splice(2, 0, {
                        title: 'Perfil',
                        url:'/userProfile',
                        icon: 'contact'
                      });

                    }
                  }

                });
              }

            }
          });
        }else{
          this.userValid = false;
          this.appPages.splice(1,4,{
              title:'Ingresar',
              url:'/login',
              icon:'log-in'
            },
            {
              title: 'Registrate',
              url: '/registrar',
              icon: 'create'
            });
          
        }
      }
    });

    this.uService.GetCurrentUser().subscribe((u) => {
      if(u != null){
        this.userEmail = u.email;
      }
      this.uService.userSubject.next(u);
    });
  }

  UserLogout(){
    this.uService.Logout(this.uid);
    this.llenaOpcionesDeMenu();
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad');
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter');
  }

  ionViewCanEnter(){
    console.log('ionViewCanEnter');
  }
}
