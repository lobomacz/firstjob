import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PopoverController, ToastController, AlertController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';
import { environment } from './../../environments/environment';
import { Empleador } from '../clases/empleador';
import { Usuario } from '../clases/usuario';
import { CandidateService } from './../services/candidate.service';
import { EmployerService } from './../services/employer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

	tipoUsuario:string;
	empleador:Empleador;
	usuario:Usuario;
  imageFile:string;
  _uid:string;
  baseUrl:string = environment.appUrl;
  sinPerfil:boolean;
  userEtnia:string;
  userNivel:string;
  userSector:string;

  constructor(private cService:CandidateService, private eService:EmployerService, private _router:Router, private _route:ActivatedRoute, private popoverCtrl:PopoverController, private toastCtrl:ToastController, private alertCtrl:AlertController) { 
  	this.tipoUsuario = 'desconocido';
    this.empleador = null;
    this.usuario = null;
  }

  ngOnInit() {

    this.sinPerfil = true;

    this._route.paramMap.subscribe((params) => {

      if (params.get('id') != null) {

        this._uid = params.get('id');
        this.GetUserData();

      }else{

        this.cService.GetCurrentUser().subscribe(u => {

          if(u != null){
            this._uid = u.uid;

            this.LoadUserByType();
          }

        });

      }
    });

    
  }


  ionViewWillEnter(){

    if(this.usuario != null){

      this.GetUserData();

    }else if(this.empleador != null){

      this.GetEmployerData();
      
    }
    
  }

  ionViewDidEnter(){

  }

  LoadUserByType(){

    this.cService.IsCandidate(this._uid).subscribe((c) => {
        
        if (c.ok && c.json().count > 0) {

          this.GetUserData();

        }else if(c.ok && c.json().count == 0){

          this.eService.IsEmployer(this._uid).subscribe((res) => {
            if(res.ok && res.json().count > 0){
              this.GetEmployerData();
            }
          });

        }
      });
  }

  GetUserData(){
    
    this.cService.GetCandidateProfile(this._uid).subscribe((res) => {
            
      if(res.ok && res.json() != null){
        this.usuario = new Usuario(res.json());
        this.tipoUsuario = 'usuario';
        this.imageFile = this.baseUrl.concat(this.usuario.foto);
        if (this.usuario.primerNombre != '' && this.usuario.primerApellido != '' && this.usuario.direccion != '') {
          this.sinPerfil = false;
        }

        if(this.usuario.etnia && this.usuario.etnia.length > 0){
          this.cService.GetEtnia(this.usuario.etnia).subscribe((r) => {
            if(r.ok && r.json() && r.json().dato != null){
              this.userEtnia = r.json().dato.nombre;
              
            }
          });
        }

        if (this.usuario.nivelAcademico && this.usuario.nivelAcademico.length > 0) {
          this.cService.GetNivelAcademico(this.usuario.nivelAcademico).subscribe((r) => {
            if(r.ok && r.json().dato != null){
              this.userNivel = r.json().dato.descripcion;
            }
          });
        }

        if(this.usuario.sector && this.usuario.sector.length > 0){
          this.cService.GetSector(this.usuario.sector).subscribe((r) => {
            if(r.ok && r.json().dato != null){
              this.userSector = r.json().dato.descripcion;
            }
          });
        }

      }
    });

  }

  GetEmployerData(){

    this.eService.GetEmpleadorProfile(this._uid).subscribe((emp) => {

      this.empleador = new Empleador(emp.json());
      this.tipoUsuario = 'empleador';
      this.imageFile = this.baseUrl.concat(this.empleador.logo);

      if (this.empleador.direccion != '' && this.empleador.representante != null && this.empleador.telefono != '') {
        this.sinPerfil = false;
      }

      if(this.empleador.sector && this.empleador.sector.length > 0){
        this.eService.GetSector(this.empleador.sector).subscribe((r) => {
          if(r.ok && r.json().dato != null){
            this.userSector = r.json().dato.descripcion;
          }
        });
      }

    });

  }

  async UserPopover(){
    
    const popover = await this.popoverCtrl.create({
      component:PopoverComponent,
      animated:true,
      keyboardClose:true,
      componentProps:{'tipo':this.tipoUsuario, 'sinPerfil':this.sinPerfil, 'id':this._uid}
    });
    
    popover.onDidDismiss().then((ov) => {
      
      this.On_Popover_Dismiss(ov.data);
    });
    return await popover.present();
  }

  On_Popover_Dismiss(data:any){
    if(data){
      if(data.cerrar){
        this.Cerrar_Cuenta();
      }
    }
  }

  async Cerrar_Cuenta(){

    let mensaje:string = this.tipoUsuario == 'usuario' ? `Si cierra su cuenta de usuario ${this.usuario.email} 
    no recibirá mas notificaciones y borrará de todas las plazas a que haya aplicado.`:`Su cuenta de usuario 
    no será eliminada de nuestra base de datos. Solamente será desactivada. Puede avocarse con el administrador 
    para activarla nuevamente.`;

    const alert = await this.alertCtrl.create({
      header: 'Cerrar Cuenta?',
      subHeader: 'Cerrar cuenta de usuario',
      message: mensaje,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Ok',
          handler: () => {
            if (this.tipoUsuario === 'usuario') {
              this.cService.CloseCandidateProfile(this._uid).subscribe((res) => {
                if(res.ok && res.json()){
                  this.RedirectHome();
                }
              });
            }else if(this.tipoUsuario === 'empleador'){
              this.eService.CerrarPerfilEmpleador(this._uid).subscribe((res) => {
                if (res.ok && res.json()) {
                  
                  this.RedirectHome();
                }
              });
            }
            
          }
        }
      ]
    });

    await alert.present();
  }

  RedirectHome(){
    this.eService.Logout(this._uid);
    this._router.navigateByUrl('/home');
  }

}
