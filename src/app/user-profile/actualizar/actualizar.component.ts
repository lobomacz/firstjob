import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { CandidateService } from './../../services/candidate.service';
import { EmployerService } from './../../services/employer.service';
import { Empleador } from '../../clases/empleador';
import { Usuario } from '../../clases/usuario';
import { Curriculum } from '../../clases/curriculum';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.scss']
})
export class ActualizarComponent implements OnInit {

	@ViewChild('telefono') telefonoField:any;

	public tipo:string;
	public usuario:Usuario;
	public empleador:Empleador;
  public curriculum:Curriculum;
	public imageFile:string;
  public maxYear:string;
  public nivelesAcademicos:any[];
  public sectores:any[];
  public etnias:any[];
  public telefonoTemp:string;
  public tipoTelTemp:string;

	private uid:string;
	private today:Date;
	private fotoTemp:string;
	private fotoGuardado:boolean;
  private documentoTemp:string;
  private documentoGuardado:boolean;
	private baseUrl = environment.appUrl;

  constructor(
    private _router:Router, 
    private navCtrl:NavController, 
    private toastCtrl:ToastController, 
    private _route:ActivatedRoute, 
    private cService:CandidateService, 
    private eService:EmployerService) { 
  	this.fotoGuardado = true;
    this.documentoGuardado = true;
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

    if(!this.documentoGuardado){
      this.cService.DeleteCurriculumDocument(this.uid, this.documentoTemp).subscribe((res) => {
        if (res.ok && res.json().count > 0) {
          console.log('Documento borrado');
        }
      });
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

  On_File_Change(docFile:any){
    this.cService.UploadCurriculumDocument(this.uid, docFile.files[0]).subscribe((res) => {
      if (res.ok && res.json().count > 0) {
        this.documentoTemp = docFile.files[0].name;
        this.curriculum = new Curriculum();
        this.curriculum._id = this.uid;
        this.curriculum.documento = true;
        this.curriculum.documentoUrl = this.baseUrl.concat('/usuarios/', this.uid, '/curriculum/', this.documentoTemp);
        this.curriculum.fechaCreacion = new Date().toLocaleDateString();
        this.curriculum.fechaActualizacion = this.curriculum.fechaCreacion;
        this.documentoGuardado = false;
      }
    });
  }

  On_Guardar_Click(){
  	if (this.tipo === 'usuario') {

  		if (!this.fotoGuardado) {
  			this.usuario.foto = '/usuarios/'.concat(this.uid, '/img/', this.fotoTemp);
  		}

		this.cService.UpdateCandidate(this.uid, this.usuario).subscribe((res) => {
			if(res.ok && res.json()){

        if (!this.documentoGuardado) {
          
          this.cService.InsertCandidateCurriculum(this.curriculum).subscribe((r) => {
            if (r.ok && r.json().count > 0) {
              this.documentoGuardado = true;
              this.documentoTemp = '';
              this.ConfirmaGuardado();
            }
          });
        }else{
          this.ConfirmaGuardado();
        }
				
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
