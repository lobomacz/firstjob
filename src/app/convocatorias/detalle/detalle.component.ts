import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { UserService } from './../../services/user.service';
import { ConvocatoriasService } from './../../services/convocatorias.service';
import { Convocatoria } from './../../clases/convocatoria';
import { Nl2BrPipe } from 'nl2br-pipe';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

	private id:string;
	private convocatoria:Convocatoria;
	private descripcion:string;

  constructor(
  	private _route:ActivatedRoute,
  	private cService:ConvocatoriasService
  	) { }

  ngOnInit() {
  	this._route.paramMap.subscribe((params) => {
  		if (params != null && params.get('id')) {
  			this.id = params.get('id');

  			this.cService.GetConvocatoria(this.id).subscribe((res) => {

  				if (res.ok && res.json()) {
  					this.convocatoria = new Convocatoria(res.json());

  				}
  			});
  		}
  	});
  }

}
