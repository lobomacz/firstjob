import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { ToastController, NavController } from '@ionic/angular';
import { environment } from './../../../environments/environment';
import { Plaza } from './../../clases/plaza';

import { PlazasService } from '../../services/plazas.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

	private baseUrl:string = environment.appUrl;

	private plaza:Plaza;
	private idPlaza:string;
	private idEmpleador:string;
	private sectores:any[];
	private categorias:any[];
	private documentFile:string;
	private documentUrl:string;
	private documentFilePrev:string;
	private documentSaved:boolean;


  constructor(
  	private _route:ActivatedRoute, 
  	private _router:Router, 
  	private toastCtrl:ToastController, 
  	private navCtrl:NavController,
  	private cService:PlazasService,
  	private uService:UserService
  	) { }

  ngOnInit() {
  	
  	this.idPlaza = null;
  	this.documentSaved = true;
  	this.plaza = new Plaza();
  	this.documentFile = null;

  	this._route.paramMap.subscribe((params) => {

  		this.idEmpleador = params.get('idEmpleador');

  		if(params.get('id') != null){

  			this.idPlaza = params.get('id');

  			this.cService.GetPlaza(this.idPlaza).subscribe((res) => {
  				if(res.ok && res.json()){
  					this.plaza = new Plaza(res.json());
  					this.documentUrl = this.baseUrl.concat(this.plaza.documento);
  					
  				}
  			});
  		}

  		this.uService.GetSectores().subscribe((res) => {
			if(res.ok && res.json()){
				this.sectores = res.json().datos;
			}
		});

		this.uService.GetCategorias().subscribe((res) => {
			if(res.ok && res.json()){
				this.categorias = res.json().datos;
			}
		});
  	});
  }

  On_Guardar_Click(){

  	if (!this.documentSaved) {
  		this.plaza.documento = this.documentFile;
  	}

  	if(this.idPlaza === null){

  		let hoy = new Date().toLocaleString();

  		this.plaza.fechaPublicacion = hoy;
  		this.plaza.idEmpleador = this.idEmpleador;
  		this.cService.InsertPlaza(this.plaza).subscribe((res) => {
  			this.Finiquita_Cierre(res);
  		});

  	}else{

  		this.cService.UpdatePlaza(this.idPlaza, this.plaza).subscribe((res) => {
  			this.Finiquita_Cierre(res);
  		});

  	}

  }

  Finiquita_Cierre(res:Response){

  	if(res.ok && res.json().count > 0){
		this.documentSaved = true;
		this.documentFile = null;

		if(this.documentFilePrev != null){
			let documentName = this.documentFilePrev.slice(this.documentFilePrev.lastIndexOf('/'));
			this.cService.DeleteDocument(this.idEmpleador, documentName).subscribe((r) => {

				if (r.ok && r.json().count > 0) {
					this.documentFilePrev = null;
					this.ShowToast().then(() => {
            this.navCtrl.goBack();
          });
					
				}
				
			});
		}else{
			this.ShowToast().then(() => {
        this.navCtrl.goBack();
      });
			
		}
	}
  }

  On_File_Change(file:any){

  	this.cService.UploadDocument(this.idEmpleador,file.files[0]).subscribe((res) => {
  		if(res.ok && res.json().count > 0){

  			if (this.documentFile != null) {

  				this.documentFilePrev = this.documentFile;
  				
  			}

			this.documentUrl = this.baseUrl.concat('/empleadores/',this.idEmpleador,'/documento/',file.files[0].name);
  			this.documentFile = '/empleadores/'.concat(this.idEmpleador,'/documento/',file.files[0].name);
  			this.documentSaved = false;
  			
  		}
  	});

  }

  async ShowToast(mensaje:string = "Datos Aplicados Con Exito"){

  	const toast = await this.toastCtrl.create({
  		message: mensaje,
  		duration: 2000,
  		position: "bottom"
  	});

  	return toast.present();
  }

}
