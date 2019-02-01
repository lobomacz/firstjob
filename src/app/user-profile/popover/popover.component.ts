import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
import { PopoverController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {

	options:any[];
	tipo:string;
	sinPerfil:boolean;
	uid:string;

  constructor(private navParams:NavParams, private popoverCtrl:PopoverController) { 
  }

  ngOnInit() {
  	this.tipo = this.navParams.data.tipo;
  	this.sinPerfil = this.navParams.data.sinPerfil;
  	this.uid = this.navParams.data.id;
    

  	if(this.sinPerfil){

  		this.options = [
    		{
    			title:'Crear',
    			link: '/userProfile/nuevo/'.concat(this.tipo, '/', this.uid),
          icon: 'add'
    		}
    	];

  	}else if(!this.sinPerfil){
  		this.options = [
  		{
  			title: 'Editar',
  			link: '/userProfile/actualizar/'.concat(this.tipo, '/', this.uid),
        icon: 'create'
  		},
  		]
  	}

  }

  async Close(){
  	await this.popoverCtrl.dismiss();
  }

  On_Cerrar_Cuenta_Click(){
  	this.popoverCtrl.dismiss({'cerrar':true});
  }

}
