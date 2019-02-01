import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-detalle-popover',
  templateUrl: './detalle-popover.component.html',
  styleUrls: ['./detalle-popover.component.scss']
})
export class DetallePopoverComponent implements OnInit {

	private idPlaza:string;
	private idEmpleador:string;
	private hasAplicantes:boolean;

  constructor(
  	private navParams:NavParams, 
  	private popoverCtrl:PopoverController, 
  	private _router:Router, 
  	) { }

  ngOnInit() {
  	this.idPlaza = this.navParams.data.idPlaza;
  	this.idEmpleador = this.navParams.data.idEmpleador;
  	this.hasAplicantes = this.navParams.data.aplicantes;
  }

  On_Cerrar_Plaza(){
  	this.Dismiss({'opcion':'cerrar'});
  }

  On_Editar_Plaza(){
  	this._router.navigateByUrl('/plazas/editar/'.concat(this.idEmpleador, '/', this.idPlaza)).then(() => {
  		this.Dismiss()
  	});
  }

  Dismiss(dato?:any){
  	this.popoverCtrl.dismiss(dato);
  }

}
