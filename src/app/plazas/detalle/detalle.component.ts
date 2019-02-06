import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController, ToastController, AlertController, NavController } from '@ionic/angular';
import { Nl2BrPipe } from 'nl2br-pipe';
import { PopoverComponent } from '../popover/popover.component';
import { environment } from './../../../environments/environment';
import { Plaza } from './../../clases/plaza';
import { Empleador } from './../../clases/empleador';
import { DetallePopoverComponent } from './../detalle-popover/detalle-popover.component';
import { PlazasService } from '../../services/plazas.service';
import { EmployerService } from '../../services/employer.service';
import { UserService } from '../../services/user.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

	public tipo:string;
	public idPlaza:string;
	public plaza:Plaza;
	public empleador:string;
	public categoria:string;
	public sector:string;
  public documentUrl:string;
  public esAplicante:boolean;

  private uid:string;
	private baseUrl:string = environment.appUrl;


  constructor(
  		private _route:ActivatedRoute, 
      private navCtrl:NavController,
  		private popoverCtrl:PopoverController,
  		private toastCtrl:ToastController,
      private alertCtrl:AlertController,
  		private cService:PlazasService,
  		private eService:EmployerService
  	) { }

  ngOnInit() {

  	this._route.paramMap.subscribe((params) => {
  		if(params.get('id')){
  			this.idPlaza = params.get('id');
  			this.LoadPlaza();
  		}
  	});
  }

  LoadPlaza(){

    this.cService.GetPlaza(this.idPlaza).subscribe((res) => {
      if(res.ok && res.json()){
        this.plaza = new Plaza(res.json());
        this.documentUrl = this.baseUrl.concat(this.plaza.documento);
        this.LoadUserType();

        this.eService.GetCategoria(this.plaza.categoria).subscribe((r) => {
          if (r.ok && r.json()) {
            this.categoria = r.json().dato.descripcion;
          }
        });

        this.eService.GetEmpleadorProfile(this.plaza.idEmpleador).subscribe((r) => {
          if(r.ok && r.json()){
            this.empleador = r.json().nombreLargo;
          }
        });

        this.eService.GetSector(this.plaza.sector).subscribe((r) => {
          if (r.ok && r.json()) {
            this.sector = r.json().dato.descripcion;
          }
        });
      }
    });
  }

  LoadUserType(){

  	this.eService.GetCurrentUser().subscribe((u) => {

  		if(u != null){
  			this.uid = u.uid;

  			this.eService.IsCandidate(this.uid).subscribe((c) => {
  				if(c.ok && c.json().count > 0){
  					this.tipo = 'usuario';
            this.esAplicante = this.In_Aplicantes();
  				}
  			});

  			this.eService.IsEmployer(this.uid).subscribe((e) => {
  				if (e.ok && e.json().count > 0) {
  					this.tipo = 'empleador';
  				}
  			});
  		}
  	});
  }

  async PlazaPopover(){
  	
    const popover = await this.popoverCtrl.create({
      component: DetallePopoverComponent,
      animated: true,
      keyboardClose: true,
      componentProps: {'idPlaza': this.idPlaza, 'idEmpleador': this.uid, 'aplicantes': this.plaza.aplicantes.length > 0}
    });

    popover.onDidDismiss().then((ov) => {

      if(ov.data != null){
        this.ShowAlert(ov.data.opcion);
      }

    });

    await popover.present();
  	
  }

  On_Aplicar_Click(){
    this.ShowAlert('aplicar');
  }

  On_Retirar_Click(){
    this.ShowAlert('retirar');
  }

  Cerrar_Plaza(){
    this.cService.ClosePlaza(this.idPlaza).subscribe((res) => {
      if (res.ok && res.json().count > 0) {
        
        let mensaje = 'Plaza Cerrada';

        this.ShowToast(mensaje).then(() => {
          this.navCtrl.goBack(true);
        });
      }
    });
  }

  Aplicar_Plaza(){
    this.cService.ApplyPlaza(this.idPlaza, this.uid).subscribe((res) => {
      
      if (res.ok && res.json().count > 0) {

        let mensaje = 'Ahora recibirá notificaciones';

        this.ShowToast(mensaje).then(() => {
          this.LoadPlaza();
        });
        
      }
    });
  }

  Retirar_Plaza(){

    this.cService.UnapplyUser(this.idPlaza, this.uid).subscribe((res) => {
      if (res.ok && res.json().count > 0) {
        let mensaje = 'Se retiró su aplicación a esta plaza';

        this.ShowToast(mensaje).then(() => {
          this.LoadPlaza();
        });

        
      }
    });
  }

  async ShowAlert(opcion:string){

    if(opcion === 'aplicar'){

      const alert = await this.alertCtrl.create({
        header: 'Aplicar Para Plaza',
        message: 'Al aplicar a esta plaza, el empleador tendrá acceso a su perfil profesional y su curriculum.',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Ok',
            handler: () => {
              this.Aplicar_Plaza();
            }
          }
        ]
      });

      await alert.present();

    }else if (opcion === 'cerrar') {
      

      const alert = await this.alertCtrl.create({
        header: 'Cerrar Plaza',
        message: 'Al cerrar esta plaza, no estará disponible para recibir aplicaciones.',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Ok',
            handler: () => {
              this.Cerrar_Plaza();
            }
          }
        ]
      });

      await alert.present();

    }else if(opcion === 'retirar') {
      const alert = await this.alertCtrl.create({
        header: 'Retirar Aplicación',
        message: 'Al retirarse de aplicar a esta plaza, el empleador no tendrá acceso a su perfil profesional y su curriculum.',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Ok',
            handler: () => {
              this.Retirar_Plaza();
            }
          }
        ]
      });

      await alert.present();
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

  In_Aplicantes(){

    let aplicant:boolean = false;

    if(this.plaza.aplicantes.length > 0){

      this.plaza.aplicantes.forEach((val) => {
        if (val === this.uid) {
          aplicant = true;
        }
      });

    }

    return aplicant;
  }

}
