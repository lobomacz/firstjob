import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { EmployerService } from './../services/employer.service';
import { CandidateService } from './../services/candidate.service';
import { Usuario } from '../clases/usuario';
import { Empleador } from '../clases/empleador';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

	@ViewChild('correo') emailField;
	@ViewChild('contrasena') passwordField;

	email:string;
	password:string;
	confirma:string;
	esUsuario:boolean;
	esEmpleador:boolean;

  constructor(
    private toastCtrl:ToastController, 
    private _router:Router, 
    private _auth:AngularFireAuth, 
    private eService:EmployerService, 
    private cService:CandidateService) { }

  ngOnInit() {
  }

  CrearUsuario(){
  	if(this.emailField.invalid && this.passwordField.invalid){
  		this.ViewToast('Email/Contraseña Invalido.');
  	}else if(this.esUsuario || this.esEmpleador){

  		this._auth.auth.createUserWithEmailAndPassword(this.email, this.password).then((cred) => {

  			const uid = cred.user.uid;
  			const email = cred.user.email;
  			const fecha = new Date().toLocaleDateString();

  			if(this.esUsuario){
  				let usuario:Usuario = new Usuario();
  				usuario._id = uid;
  				usuario.email = email;
  				usuario.activo = true;
  				usuario.fechaIngreso = fecha;
  				this.cService.InsertCandidate(usuario).subscribe((res) => {
  					if(res.json().count > 0){
  						this.Mensaje_Usuario_Creado();
  					}
  				});
  			}else if(this.esEmpleador){
  				let empleador:Empleador = new Empleador();
  				empleador._id = uid;
  				empleador.email = email;
  				empleador.activo = true;
  				empleador.fechaIngreso = fecha;
  				this.eService.InsertaEmpleador(empleador).subscribe((res) => {
  					if(res.json().count > 0){
  						this.Mensaje_Usuario_Creado();
  					}
  				});
  			}


  			
  		}).catch((err) => {
  			let mensaje = '';
  			switch (err.code) {
  				case "auth/email-already-in-use":
  					mensaje = `La dirección ${this.email} ya está en uso.`;
  					break;
  				case "auth/invalid-email":
  					mensaje = 'Correo No Válido';
  					break;
  				case "auth/operation-not-allowed":
  					mensaje = 'Operación No Permitida.';
  					break;
  				case "auth/weak-password":
  					mensaje = 'Contraseña Débil.';
  					break;
  				default:
  					mensaje = err.message;
  					break;
  			}

  			this.ViewToast(mensaje);
  		});
  	}else{
  		console.log({'Empleador':this.esEmpleador, 'Usuario':this.esUsuario});
  		this.ViewToast('Seleccione Tipo de Usuario');
  	}
  }

  Mensaje_Usuario_Creado(){
  	this.ViewToast(`Usuario ${this.email} Creado`).then(() => {
		this._router.navigateByUrl('/home');
	});
}

  async ViewToast(mensaje:string){
  	const toast = await this.toastCtrl.create({
  		message:mensaje,
  		position:'bottom',
  		duration:2000
  	});

  	toast.present();
  }

  Toggle(tipo:string){
  	
  	if(tipo === 'usuario'){
  		this.esEmpleador = this.esUsuario == true ? false:null;
  	}else{
  		this.esUsuario = this.esEmpleador == true ? false:null;
  	}
  }

  

}
