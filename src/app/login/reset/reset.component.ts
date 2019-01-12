import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

	@ViewChild('email') emailField:any;

	titulo:string;
	correo:string;
	

  constructor(private uService:UserService, private _router:Router, private toastCtrl:ToastController) { 
  	this.titulo = "Ingrese su Email";
  }

  ngOnInit() {
  }

  EnviarCorreo(){
  	
  	if(this.emailField.valid){
  		let that = this;
	  	this.uService.ResetPassword(this.correo).then(() => {
	  		that.ShowToast('Mensaje Enviado.');
	  		that.Redirect();
	  	}).catch((err) => {
	  		let mensaje = '';
	  		switch (err.code) {
	  			case "auth/invalid-email":
	  				mensaje = 'Correo Invalido';
	  				break;
	  			case "auth/user-not-found":
	  				mensaje = 'Usuario No Existe';
	  				break;
	  			default:
	  				console.log('Error '.concat(err.code));
	  				console.log(err.message);
	  				break;
	  		}
	  		
	  	});
	  }else{
	  	this.ShowToast('Ingrese un correo valido.');
	  }
  }

  Redirect(){
  	this._router.navigateByUrl('/login');
  }

  async ShowToast(mensaje:string){
  	const toast = await this.toastCtrl.create({
  		message:mensaje,
  		position:'middle',
  		duration:2000
  	});

  	toast.present();
  }

}
