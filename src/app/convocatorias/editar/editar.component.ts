import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { UserService } from './../../services/user.service';
import { ConvocatoriasService } from './../../services/convocatorias.service';
import { Convocatoria } from './../../clases/convocatoria';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

	private id:string;
	private convocatoria:Convocatoria;
	private uid:string;
	private etiquetas:string;

  constructor(
  	private _route:ActivatedRoute, 
  	private navCtrl:NavController,
  	private uService:UserService, 
  	private cService:ConvocatoriasService,
  	private toastCtrl:ToastController
  	) {
  		this.convocatoria = new Convocatoria();
  		this.id = null;
  	}

  ngOnInit() {

  	this.uService.GetCurrentUser().subscribe((user) => {
  		if(user != null){
  			this.uid = user.uid;

  			this.uService.IsCandidate(this.uid).subscribe((res) => {
  				if (res.ok && res.json().count > 0) {
  					this.navCtrl.goBack(false);
  				}else{
  					this._route.paramMap.subscribe((params) => {
  						if (params != null && params.get('id')) {
  							this.id = params.get('id');

  							this.cService.GetConvocatoria(this.id).subscribe((r) => {
  								if (r.ok && r.json()) {
  									this.convocatoria = new Convocatoria(r.json());
  									this.etiquetas = this.convocatoria.etiquetas.join(',');
  								}
  							});
  						}

  					});
  				}
  			});
  		}
  	});
  }

  On_Guardar_Click(){
  	if (this.id === null) {

  		let fecha = new Date();
  		let etiquetas = this.etiquetas.split(',');
  		let etiquetas_clean = [];
  		etiquetas.forEach((val) => {
  			etiquetas_clean.push(val.trim());
  		});

  		
  		this.convocatoria.idAutor = this.uid;
  		this.convocatoria.fechaPublicacion = fecha.toLocaleDateString();
  		this.convocatoria.timeStamp = fecha.getTime();
  		this.convocatoria.etiquetas = etiquetas_clean;

  		this.cService.InsertConvocatoria(this.convocatoria).subscribe((res) => {
  			if (res.ok && res.json().count > 0) {
  				let mensaje = 'Registro Guardado';
  				this.ShowToast(mensaje).then(()=>{
  					this.navCtrl.goBack(true);
  				});
  			}
  		});
  		
  	}else{

  		let etiquetas = this.etiquetas.split(',');
  		let etiquetas_clean = [];
  		etiquetas.forEach((val) => {
  			etiquetas_clean.push(val.trim());
  		});

  		this.cService.UpdateConvocatoria(this.id, this.convocatoria).subscribe((res) => {
  			if (res.ok && res.json().count > 0) {
  				let mensaje = 'Cambios Aplicados';
  				this.ShowToast(mensaje).then(()=>{
  					this.navCtrl.goBack(true);
  				});
  			}
  		});
  	}
  }

  async ShowToast(mensaje:string){
  	const toast = await this.toastCtrl.create({
  		message: mensaje,
  		duration: 2000,
  		position: 'bottom'
  	});

  	return toast.present();
  }

}
