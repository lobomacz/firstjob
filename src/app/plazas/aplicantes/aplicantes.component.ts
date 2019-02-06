import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlazasService } from './../../services/plazas.service';
import { CandidateService } from './../../services/candidate.service';
import { Usuario } from '../../clases/usuario';
import { environment } from '../../../environments/environment'; 


@Component({
  selector: 'app-aplicantes',
  templateUrl: './aplicantes.component.html',
  styleUrls: ['./aplicantes.component.scss']
})
export class AplicantesComponent implements OnInit {

  public aplicantes:Usuario[];

	private aplicantesPlaza:string[];
	private baseUrl:string = environment.appUrl;

  constructor(

  	private _route:ActivatedRoute, 
  	private cService:PlazasService, 
  	private uService:CandidateService) { }

  ngOnInit() {

  	this._route.paramMap.subscribe((params) => {
  		
  		if(params != null && params.get('id')){
  			this.cService.GetAplicantes(params.get('id')).subscribe((res) => {
  				if (res.ok && res.json().datos) {
  					
  					this.aplicantesPlaza = res.json().datos.aplicantes;
  					this.uService.GetCandidateGroup(this.aplicantesPlaza).subscribe((r) => {
  						if (r.ok && r.json().datos) {
  							
  							this.aplicantes = r.json().datos;
  						}
  					});
  				}
  			});
  		}
  	});

  }

}
