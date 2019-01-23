import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {

	private opciones:any[];

  constructor(private navParams:NavParams, private _router:Router, private popoverCtrl:PopoverController) { }

  ngOnInit() {
  	this.opciones = this.navParams.data.items;
  }

  Dismiss(){
  	this.popoverCtrl.dismiss();
  }

}
