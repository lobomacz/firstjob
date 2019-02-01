import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';
import { UserService } from './../services/user.service';
import { ConvocatoriasService } from './../services/convocatorias.service';
import { Convocatoria } from './../clases/convocatoria';


@Component({
  selector: 'app-convocatorias',
  templateUrl: './convocatorias.page.html',
  styleUrls: ['./convocatorias.page.scss'],
})
export class ConvocatoriasPage implements OnInit {

	private uid:string;
	private tipo:string;
	private convocatorias:Convocatoria[];


  constructor(
  	private _router:Router,
  	private uService:UserService, 
  	private cService:ConvocatoriasService,
  	private popoverCtrl:PopoverController
  	) { }

  ngOnInit() {

  	this.uService.GetCurrentUser().subscribe((user) => {
  		if(user != null){
  			this.uid = user.uid;

  			this.uService.IsCandidate(this.uid).subscribe((can) => {
  				
  				if (can.ok && can.json().count > 0) {
  					
					this.tipo = 'usuario';
  					
  				}
  			});

  			this.uService.IsEmployer(this.uid).subscribe((res) => {
  				
  				if (res.ok && res.json().count > 0) {
  					this.tipo = 'empleador';
  					
  				}
  			});

  			this.uService.IsAdmin(this.uid).subscribe((u) => {
  				
  				if (u.key != null) {
  					this.tipo = 'admin';
  					
  				}
  			});

  			this.LoadList();
  			

  		}
  	});


  }

  ionViewWillEnter(){
  	this.LoadList();
  }

  GotoDetail(id:string){
  	this._router.navigateByUrl('/convocatorias/ver/'.concat(id));
  }

  On_Nuevo_Click(){
  	this._router.navigateByUrl('/convocatorias/nueva');
  }

  LoadList(){
  	this.cService.GetConvocatorias().subscribe((res) => {
		if (res.ok && res.json().datos) {
			this.convocatorias = res.json().datos;
		}
	});
  }

  async MostrarPopover(){
  	
  	const popover = await this.popoverCtrl.create({
  		component: PopoverComponent,
  		animated: true,
  		keyboardClose: true
  	});

  	await popover.present();
  }

}
