import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';
import { EmployerService } from './../services/employer.service';
import { ConvocatoriasService } from './../services/convocatorias.service';
import { Empleador } from '../clases/empleador';
import { Plaza } from '../clases/plaza';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-plazas',
  templateUrl: './plazas.page.html',
  styleUrls: ['./plazas.page.scss'],
})
export class PlazasPage implements OnInit {

	private uid:string;
	private tipo:string;
	private empleador:Empleador;
	private empleadores:any[];
	private plazasSubject:BehaviorSubject<string>;
	private plazas:Plaza[];
	private filtroPlazas:boolean;


  constructor(private _router:Router, private eService:EmployerService, private cService:ConvocatoriasService, private popoverCtrl:PopoverController) { }

  ngOnInit() {

  	this.eService.GetCurrentUser().subscribe((user) => {
  		if(user != null){
  			this.uid = user.uid;
  			
  			this.eService.IsAdmin(this.uid).subscribe((admin) => {
  				if(admin.key === null){
  					this.eService.IsCandidate(this.uid).subscribe((res) => {
  						
  						if(res.ok && res.json().count > 0){
  							this.tipo = 'usuario';
  							this.LlenaPlazas();
  						}else{
  							this.eService.IsEmployer(this.uid).subscribe((r) => {
  								if (r.ok && r.json().count > 0) {
  									
  									this.tipo = 'empleador';
  									this.eService.GetEmpleadorProfile(this.uid).subscribe(e => this.empleador = new Empleador(e.json()));
  									this.LlenaPlazas();
  								}else{
  									this.Redirect('/error');
  								}
  							});
  						}
  					});
  				}else{
  					this.tipo = 'admin';
  					this.LlenaPlazas();
  				}
  			});
  		}else{
  			this.Redirect('/error');
  		}
  	});
  	
  }

  LlenaEmpleadores(){
  	this.eService.GetNombresEmpleadores().subscribe((res) => {
  		if(res.ok && res.json()){
  			this.empleadores = res.json().datos;
  		}
  	});
  }

  LlenaPlazas(){
  	if(this.tipo === 'usuario'){
  		this.cService.GetPlazasAbiertas().subscribe((res) => {
  			if(res.ok && res.json()){
  				this.plazas = res.json().datos;
  				this.LlenaEmpleadores();
  			}
  		});
  	}else if(this.tipo === 'empleador'){
  		this.plazasSubject = new BehaviorSubject('abiertas');
  		this.plazasSubject.subscribe((val) => {
  			if(val === 'todas'){
  				this.cService.GetEmployerPlazas(this.uid).subscribe((res) => {
					if(res.ok && res.json()){
						this.plazas = res.json().datos;
						this.LlenaEmpleadores();
					}
				});
  			}else {
  				this.cService.GetEmployerPlazasAbiertas(this.uid).subscribe((res) => {
  					if(res.ok && res.json()){
  						this.plazas = res.json().datos;
  						this.LlenaEmpleadores();
  					}
  				});
  			}
  		});

  	}else{
  		this.plazasSubject = new BehaviorSubject('abiertas');
  		this.plazasSubject.subscribe((val) => {
  			if(val === 'todas'){
  				this.cService.GetPlazas().subscribe((res) => {
  					if(res.ok && res.json()){
  						this.plazas = res.json().datos;
  						this.LlenaEmpleadores();
  					}
  				});
  			}else{
  				this.cService.GetPlazasAbiertas().subscribe((res) => {
  					if(res.ok && res.json()){
  						this.plazas = res.json().datos;
  						this.LlenaEmpleadores();
  					}
  				});
  			}
  		});
  	}
  }

  On_Item_Click(idPlaza:string){
  	
  }

  On_Toggle_Change(){

  	if(this.filtroPlazas){
  		this.plazasSubject.next('todas');
  	}else{
  		this.plazasSubject.next('abiertas');
  	}
  	
  }

  GetNombreEmpleador(uid:string):string{
  	let nombre = '';
  	this.empleadores.forEach((val) => {
  		if (val._id == uid) {
  			nombre = val.nombreLargo;
  		}
  	});

  	return nombre;
  }

  async PlazaPopover(){

  	let items = [
  		{
  			title: 'Crear',
  			link: '/plazas/nuevo'
  		}
  	];

  	const popover = await this.popoverCtrl.create({
  		component: PopoverComponent,
  		animated: true,
  		keyboardClose: true,
  		componentProps: { 'items':items }
  	});

  	return await popover.present();

  }

  Redirect(ruta:string){
  	this._router.navigateByUrl(ruta);
  }

}
