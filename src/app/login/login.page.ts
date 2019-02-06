import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../services/user.service';
import { CandidateService } from '../services/candidate.service';

import { Usuario } from '../clases/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	@ViewChild('correo') emailField:any;
	@ViewChild('clave') passwordField:any;

	public email:string;
	public contrasena:string;
  
  constructor(
    private _router:Router, 
    private _route:ActivatedRoute, 
    private uService:UserService, 
    private toastCtrl:ToastController,
    private cService:CandidateService
    ) { }

  ngOnInit() {
  }

  On_Login_With_Password_Click(){
  	
  	if(this.emailField.valid && this.passwordField.valid){
  		
  		this.uService.LoginEmail(this.email,this.contrasena).then((cred) => {
        
	  		if(cred != null){
	  			this.uService.UserAudit(cred.user.uid,'login');
          this.Redirect();
	  			
	  		}
	  		
	  	}).catch((err) => {
	  		console.error(err.message);
        let mensaje = '';
        switch (err.code) {
          case "auth/invalid-email":
            mensaje = "Correo Invalido";
            break;
          case "auth/user-disabled":
            mensaje = "Usuario Desabilitado";
            break;
          case "auth/user-not-found":
            mensaje = "Usuario Desconocido";
            break;
          
          default:
            console.log(err.message);
            mensaje = "Correo/Contraseña Incorrectos";
            break;
        }
        this.PresentToast(mensaje);
	  	});
  	}else{
  		this.PresentToast('Ingrese correo/contraseña');
  	}

  	
  }

  On_Login_With_Facebook_Click(){

    this.uService.LoginFacebook().then((cred) => {
      if(cred.user != null){

        let uid = cred.user.uid;
        let email = cred.user.email;

        this.uService.UserAudit(uid,'login');

        this.CheckUsuario(uid, email);
        
      }
    }, (error) => {

      let mensaje = '';
      console.log(error.code);

      if (error.code === 'auth/account-exists-with-different-credential') {
        mensaje = 'La dirección de correo está registrada con otra credencial.';
        
      }else {
        mensaje = error.code;
      }

      this.PresentToast(mensaje);
      
    }).catch((error) => {
      console.error('Error al validar: '.concat(error.message));
    });

  }

  On_Login_With_Twitter_Click(){

    this.uService.LoginTwitter().then((cred) => {

      if (cred.user != null) {
        
        let uid = cred.user.uid;
        let email = cred.user.email;

        this.uService.UserAudit(uid,'login');

        this.CheckUsuario(uid, email);

      }

    }, (error) => {
      
      let mensaje = '';

      if (error.code === 'auth/account-exists-with-different-credential') {
        mensaje = 'La dirección de correo está registrada con otra credencial.';
        
      }else {
        mensaje = error.code;
      }

      this.PresentToast(mensaje);

    }).catch((error) => {
      console.error('Error al validar: '.concat(error.message));
    });
  }

  CheckUsuario(uid:string, email:string){

    this.uService.IsCandidate(uid).subscribe((res) => {
      if (res.ok && res.json().count > 0) {
        
        let usuario:Usuario = new Usuario();
        usuario._id = uid;
        usuario.email = email;
        usuario.activo = true;
        usuario.fechaIngreso = new Date().toLocaleDateString();
        this.cService.InsertCandidate(usuario).subscribe((res) => {
          if(res.json().count > 0){
            this.PresentToast('Usuario Registrado').then(() => {
              this.Redirect();
            });
          }
        });

      }else if(res.ok && res.json() == 0){
        this.Redirect();
      }
    });

  }

  async PresentToast(mensaje:string){
  	const toast = await this.toastCtrl.create({
  		message:mensaje,
  		position:'middle',
  		duration:2000
  	});
  	toast.present();
  }

  Redirect(){
  	this._router.navigateByUrl('/home');
  }

}
