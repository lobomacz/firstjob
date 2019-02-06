import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {

	public opciones:any[];
	public detalle:boolean;

  constructor(private navParams:NavParams, private _router:Router, private popoverCtrl:PopoverController) { }

  ngOnInit() {
  	this.opciones = this.navParams.data.items;
  	this.detalle = this.navParams.data.detalle;
  }

  Dismiss(){
  	this.popoverCtrl.dismiss();
  }

  On_Cerrar_Plaza(){
  	this.popoverCtrl.dismiss({'cerrar':true});
  }

}
