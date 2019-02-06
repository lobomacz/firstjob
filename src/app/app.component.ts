import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { UserService } from './services/user.service';

import { User } from 'firebase';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {


  public appPages:any[];
  public userValid:boolean;

  private userEmail:string;
  private uid:string;
  

  private pages:any = {
    'invitado':[
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
    ],
    'usuario':[
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
        url: '/convocatorias',
        icon: 'megaphone'
      },
      {
        title: 'Perfil',
        url:'/userProfile',
        icon: 'contact'
      }, {
        title: 'Curriculum',
        url:'/curriculum',
        icon: 'briefcase'
      }
    ],
    'empleador':[
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
        url: '/convocatorias',
        icon: 'megaphone'
      },
      {
        title: 'Perfil',
        url:'/userProfile',
        icon: 'contact'
      }
    ],
    'admin':[
      {
        title: 'Inicio',
        url: '/home',
        icon: 'home'
      },
      {
        title: 'Convocatorias',
        url: '/convocatorias',
        icon: 'megaphone'
      },
      {
        title: 'Opciones',
        url: '/administrar',
        icon: 'build'
      },
      {
        title: 'Credenciales',
        url: '/credenciales',
        icon: 'key'
      }
    ]
  };

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private uService:UserService,
    private _router:Router,
    private _route:ActivatedRoute
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    //Primero se suscribe al usuarioSubject para recibir 
    //los cambios en el usuario.
    this.uService.usuarioSubject.subscribe({
      next: (v) => {

        this.llenaOpcionesDeMenu(v);

      }
    });

    //Luego suscribe a el usuario actual para actualizar
    //el valor en usuarioSubject.
    this.uService.GetCurrentUser().subscribe((u) => {
      
      this.uService.usuarioSubject.next(u);

    });
    
    
  }

  llenaOpcionesDeMenu(v:User){

    if(v != null){
      
      this.uid = v.uid;
      this.userValid = true;
      this.userEmail = v.email;

      this.uService.IsAdmin(this.uid).subscribe((u) => {
        
        if(u.key != null){

          this.appPages = this.pages.admin;
          
        }else{
          
        }
      });

      this.uService.IsCandidate(this.uid).subscribe((res) => {
        
        if(res.ok && res.json().count > 0){
          this.appPages = this.pages.usuario;
          
        }
      });

      this.uService.IsEmployer(this.uid).subscribe((r) => {
        
        if(r.ok && r.json().count > 0){
          this.appPages = this.pages.empleador;
          
        }
      });


    }else {
      
      this.uid = '';
      this.userValid = false;
      this.appPages = this.pages.invitado;
      
    }

    
    
  }


  UserLogout(){
    this.uService.Logout(this.uid).then(() => {

      this.uService.UserAudit(this.uid,'logout');

      
      this.uService.GetCurrentUser().subscribe((u) => {

        this.uService.usuarioSubject.next(u);
        this.GoHome();

      });
      
    }).catch((err) => {
      console.log(err.message);
    });
    
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

  GoHome(){
    this._router.navigateByUrl('/home');
  }
}
