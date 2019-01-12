import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
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

  constructor() { 
  	this.tipoUsuario = 'desconocido';
  }

  ngOnInit() {
  }

}
