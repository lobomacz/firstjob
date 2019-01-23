import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { CandidateService } from './../../services/candidate.service';
import { EmployerService } from './../../services/employer.service';
import { Empleador } from '../../clases/empleador';
import { Usuario } from '../../clases/usuario';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.scss']
})
export class ActualizarComponent implements OnInit {

	@ViewChild('telefono') telefonoField:any;

	private tipo:string;
	private usuario:Usuario;
	private empleador:Empleador;
	private imageFile:string;
	private uid:string;
	private today:Date;
	private maxYear:string;
	private nivelesAcademicos:any[];
	private sectores:any[];
	private etnias:any[];
	private telefonoTemp:string;
	private tipoTelTemp:string;
	private fotoTemp:string;
	private fotoGuardado:boolean;

	private baseUrl = environment.appUrl;

  constructor(private _router:Router, private navCtrl:NavController, private toastCtrl:ToastController, private _route:ActivatedRoute, private cService:CandidateService, private eService:EmployerService) { 
  	this.fotoGuardado = true;
  }

  ngOnInit() {
  	this.today = new Date();
  	this.maxYear = (this.today.getFullYear() - 17).toString();
  	

  	this._route.paramMap.subscribe((par) => {
  		this.tipo = par.get('tipo');
  		this.uid = par.get('id');

  		this.cService.GetEtnias().subscribe((res) => {
  			if(res.ok && res.json()){
  				this.etnias = res.json().datos;
  				
  			}
  		});

  		if(this.tipo === 'usuario'){
  			this.cService.GetCandidateProfile(this.uid).subscribe((u) => {
  				if(u.ok && u.json()){
  					this.usuario = new Usuario(u.json());
  					this.imageFile = this.baseUrl.concat(this.usuario.foto);
  					this.cService.GetNivelesAcademicos().subscribe((res) => {
  						if (res.ok && res.json()) {
  							this.nivelesAcademicos = res.json().datos;
  							
  						}
  					});
  					this.LlenaSectores();
  				}
  			});
  		}else if(this.tipo === 'empleador'){
  			
  			this.eService.GetEmpleadorProfile(this.uid).subscribe((emp) => {
  				
  				if(emp.ok && emp.json()){
  					
  					this.empleador = new Empleador(emp.json());
  					this.imageFile = this.baseUrl.concat(this.empleador.logo);
  					this.LlenaSectores();
  				}
  			});
  		}
  	});
  }

  ionViewWillLeave(){
  	if(!this.fotoGuardado){
  		if(this.tipo === 'usuario'){
  			this.cService.DeleteCandidateFoto(this.uid, this.fotoTemp).subscribe((res) => {
  				if(res.ok && res.json().count > 0){
  					console.log('Imagen Borrada');
  				}
		  	});
  		}else if (this.tipo === 'empleador'){
  			this.eService.DeleteEmployerLogo(this.uid, this.fotoTemp).subscribe((res) => {
  				if(res.ok && res.json().count > 0){
  					console.log('Imagen Borrada');
  				}
  			});
  		}
  	}

  	
  }

  LlenaSectores(){
  	this.cService.GetSectores().subscribe((res) => {
		if(res.ok && res.json()){
			this.sectores = res.json().datos;
			
		}
	});
  }

  AgregaTel(){
  	if(this.telefonoField && this.telefonoField.valid){
  		let tel = {'numero': this.telefonoTemp, 'tipo': this.tipoTelTemp};

  		if(this.usuario.telefonos === null){
  			this.usuario.telefonos = [tel,];
  		}else{
  			this.usuario.telefonos.push(tel);
  		}

  		
  		this.telefonoTemp = '';
  		this.tipoTelTemp = '';
  	}
  }

  On_Foto_Change(foto:any){
  	if(this.tipo === 'usuario'){
  		this.cService.UploadCandidateFoto(this.uid, foto.files[0]).subscribe((res) => {
  			
  			if(res.ok && res.json()){
  				if(res.json().count > 0){
  					this.fotoTemp = foto.files[0].name;
  					this.imageFile = this.baseUrl.concat('/usuarios/', this.uid, '/img/', this.fotoTemp);
  					this.fotoGuardado = false;
  				}
  			}
  		});
  	}else if(this.tipo === 'empleador'){
  		this.eService.UploadEmployerLogo(this.uid, foto.files[0]).subscribe((res) => {
  			if(res.ok && res.json()){
  				if(res.json().count > 0){
  					this.fotoTemp = foto.files[0].name;
  					this.imageFile = this.baseUrl.concat('/empleadores/', this.uid, '/img/', this.fotoTemp);
  					this.fotoGuardado = false;
  				}
  			}
  		});
  	}
  }

  On_Guardar_Click(){
  	if (this.tipo === 'usuario') {

  		if (!this.fotoGuardado) {
  			this.usuario.foto = '/usuarios/'.concat(this.uid, '/img/', this.fotoTemp);
  		}

		this.cService.UpdateCandidate(this.uid, this.usuario).subscribe((res) => {
			if(res.ok && res.json()){
				this.ConfirmaGuardado();
			}
		}, (err) => {
			this.ShowToast(err.message);
		});
	}else if(this.tipo === 'empleador'){
		if (!this.fotoGuardado) {
  			this.empleador.logo = '/empleadores/'.concat(this.uid, '/img/', this.fotoTemp);
  		}

  		this.eService.ActualizarEmpleador(this.uid, this.empleador).subscribe((res) => {
  			if (res.ok && res.json()) {
  				this.ConfirmaGuardado();
  			}
  		});
	}
  }

  ConfirmaGuardado(){
	this.fotoGuardado = true;
	this.fotoTemp = '';
	this.ShowToast();
	this.Redirect();
  }

  async ShowToast(mensaje:string='Cambios Aplicados'){
  	const toast = await this.toastCtrl.create({
  		message: mensaje,
  		duration: 2000,
  		position: 'bottom'
  	});

  	return toast.present();
  }

  Redirect(){
  	this.navCtrl.goBack();
  }

}
