import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	@ViewChild('correo') emailField:any;
	@ViewChild('clave') passwordField:any;

	private email:string;
	private contrasena:string;

  constructor(private _router:Router, private uService:UserService, private toastCtrl:ToastController) { }

  ngOnInit() {
  }

  On_Login_With_Password_Click(){
  	
  	if(this.emailField.valid && this.passwordField.valid){
  		
  		this.uService.LoginEmail(this.email,this.contrasena).then((cred) => {
	  		if(cred != null){
	  			this.uService.SetUid(cred.user.uid)
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

  }

  On_Login_With_Twitter_Click(){

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
