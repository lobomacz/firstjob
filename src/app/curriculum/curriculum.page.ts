import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { environment } from './../../environments/environment';
import { UserService } from './../services/user.service';
import { CandidateService } from './../services/candidate.service';
import { Curriculum } from './../clases/curriculum';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.page.html',
  styleUrls: ['./curriculum.page.scss'],
})
export class CurriculumPage implements OnInit {

  public curriculum:Curriculum;

	private uid:string;
	private documentoTemp:string;
	private documentoGuardado:boolean;
	private baseUrl:string = environment.appUrl;

  constructor(
  	private uService:UserService, 
  	private cService:CandidateService,
  	private toastCtrl:ToastController,
  	private alertCtrl:AlertController
  	) { }

  ngOnInit() {
  	this.documentoGuardado = true;
  	this.uService.GetCurrentUser().subscribe((user) => {
  		if (user != null) {
  			this.uid = user.uid;
  			this.cService.GetCurriculum(this.uid).subscribe((res) => {
  				if (res.ok && res.json()) {
  					this.curriculum = new Curriculum(res.json());
  				}
  			});
  		}
  	});
  }

  On_File_Change(docFile:any){
    this.cService.UploadCurriculumDocument(this.uid, docFile.files[0]).subscribe((res) => {
      if (res.ok && res.json().count > 0) {
        this.documentoTemp = docFile.files[0].name;
        this.curriculum.documento = true;
        this.curriculum.documentoUrl = this.baseUrl.concat('/usuarios/', this.uid, '/curriculum/', this.documentoTemp);
        this.curriculum.fechaActualizacion = new Date().toLocaleDateString();
        this.documentoGuardado = false;
      }
    });
  }

  ionViewWillLeave(){
  	if(!this.documentoGuardado){
  		this.ShowAlert();
  	}
  }

  async ShowAlert(){
  	const alert = await this.alertCtrl.create({
  		header: 'Archivo Sin Guardar',
  		subHeader: 'Documento No Guardado',
  		message: 'El documento ha sido cambiado. ¿Desea mantener el cambio o descartarlo?',
  		buttons: [
  			{
  				text: 'No',
  				role: 'cancel',
  				cssClass: 'secondary'
  			},
  			{
  				text: 'Si',
  				handler: () => {
  					this.GuardaDocumento();
  				}
  			}
  		]
  	});

  	await alert.present();

  }

  async ShowToast(mensaje:string){
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 1500,
      position: 'middle'
    });

    return toast.present();
  }

  GuardaDocumento(){

  	this.cService.UpdateCandidateCurriculum(this.uid, this.curriculum).subscribe((res) => {
  		if (res.ok && res.json().count > 0) {
  			this.documentoGuardado = true;
  			this.documentoTemp = '';
        this.ShowToast('Documento Guardado');
  		}
  	});
  }

}
