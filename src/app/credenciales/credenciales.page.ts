import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-credenciales',
  templateUrl: './credenciales.page.html',
  styleUrls: ['./credenciales.page.scss'],
})
export class CredencialesPage implements OnInit {

	public email:string;
	public contrasena:string;

  private uid:string;

  constructor(
  	private toastCtrl:ToastController, 
  	private alertCtrl:AlertController,
  	private _auth:AngularFireAuth,
  	private _db:AngularFireDatabase,
    private _router:Router
  	) { }

  ngOnInit() {
  }

  On_Crear_Click(){
  	this.ShowAlert();
  }

  async ShowAlert(){

  	const alert = await this.alertCtrl.create({
  		header: 'Agregar Credenciales',
  		subHeader: 'Credenciales de Administrador',
  		message: 'Al crear una nueva credencial de administrador, ingresará con la nueva credencial. ¿Desea Continuar?',
  		buttons: [
  			{
  				text: 'No',
  				role: 'cancel',
  				cssClass: 'secondary'
  			},
  			{
  				text: 'Si',
  				cssClass: 'primary',
  				handler: () => {
            this.CrearCredenciales();
  				}
  			}
  		]
  	});

  	return alert.present();
  }

  async ShowToast(mensaje:string){

  	const toast = await this.toastCtrl.create({
  		message: mensaje,
  		duration: 2000,
  		position: 'bottom'
  	});

  	await toast.present();
  }

  CrearCredenciales(){

  	this._auth.auth.createUserWithEmailAndPassword(this.email, this.contrasena).then((cred) => {

  		let uid = cred.user.uid;
  		let fechaIngreso = new Date().toLocaleDateString();

  		this._db.object('/admins/'.concat(uid)).set({'fechaIngreso':fechaIngreso}).then(() => {
  			this.ShowToast('Credenciales Creadas').then(() => {
          this._router.navigateByUrl('/home');
        });
  		});

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

  			this.ShowToast(mensaje);
  		});

  }

}
