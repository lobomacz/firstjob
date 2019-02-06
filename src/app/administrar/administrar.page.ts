import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController, AlertController, Slides, Slide } from '@ionic/angular';
import { Categoria } from './../clases/categoria';
import { Nivelacademico } from './../clases/nivelacademico';
import { Sectoreconomico } from './../clases/sectoreconomico';
import { Spot } from './../clases/spot';

import { AdminService } from './../services/admin.service';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.page.html',
  styleUrls: ['./administrar.page.scss'],
})
export class AdministrarPage implements OnInit {

	@ViewChild('paginas') paginas:Slides;

	public slideOpts = {
		effect: 'flip',
		lazy: true
	};

	public activeIndex:number;
	public isEnd:boolean;
	public isBeginning:boolean;
	public categoriaTemp:Categoria;
  public nivelTemp:Nivelacademico;
  public sectorTemp:Sectoreconomico;
	public listaCategorias:Categoria[];
  public listaNiveles:Nivelacademico[];
  public listaSectores:Sectoreconomico[];
	public spot1:Spot;
  public spot2:Spot;
  public spot3:Spot;
	public insert:boolean;

  private tempImg1:string;
  private tempImg2:string;
  private tempImg3:string;

  constructor(private aService:AdminService, private toastCtrl:ToastController, private alertCtrl:AlertController) { }

  ngOnInit() {

  	this.insert = true;
  	this.categoriaTemp = new Categoria();
    this.nivelTemp = new Nivelacademico();
    this.sectorTemp = new Sectoreconomico();
    this.spot1 = new Spot();
    this.spot2 = new Spot();
    this.spot3 = new Spot();
    this.spot1.bloque = '1';
    this.spot2.bloque = '2';
    this.spot3.bloque = '3';
    this.tempImg1 = null;
    this.tempImg2 = null;
    this.tempImg3 = null;

  	this.LlenaCategorias();
    this.LlenaNiveles();
    this.LlenaSectores();
    this.LlenaSpots();
  	this.CheckActivePage();

  }

  LlenaCategorias(){

  	this.aService.GetCategorias().subscribe((res) => {
  		
  		if (res.ok && res.json().datos != null) {
  			this.listaCategorias = res.json().datos;
  		}
  	});

  }

  LlenaNiveles(){

    this.aService.GetNivelesAcademicos().subscribe((res) => {
      if (res.ok && res.json().datos != null) {
        this.listaNiveles = res.json().datos;
      }
    });
  }

  LlenaSectores(){

    this.aService.GetSectoresEconomicos().subscribe((res) => {
      if (res.ok && res.json().datos != null) {
        this.listaSectores = res.json().datos;
      }
    });
  }

  LlenaSpots(){
    this.aService.GetSpot('1').subscribe((res) => {
      if (res.ok && res.json() != null) {
        this.spot1 = new Spot(res.json());
      }
    });

    this.aService.GetSpot('2').subscribe((res) => {
      if (res.ok && res.json() != null) {
        this.spot2 = new Spot(res.json());
      }
    });

    this.aService.GetSpot('3').subscribe((res) => {
      if (res.ok && res.json() != null) {
        this.spot3 = new Spot(res.json());
      }
    });
  }

  On_Slide_Changed(){
  	
  	this.CheckActivePage();
    this.ResetFields();
  }

  CheckActivePage(){
  	this.paginas.getActiveIndex().then((val) => {
  		
  		this.activeIndex = val;
  		this.paginas.isEnd().then((end) => {
  			
  			this.isEnd = end;
  		});
  		this.paginas.isBeginning().then((beg) => {
  			
  			this.isBeginning = beg;
  		});
  	});
  }

  ResetFields(){
    this.categoriaTemp = new Categoria();
    this.nivelTemp = new Nivelacademico();
    this.sectorTemp = new Sectoreconomico();
    this.insert = true;
  }

  Move_Next(){
  	this.paginas.slideNext();
  }

  Move_Prev(){
  	this.paginas.slidePrev();
  }

  async ShowToast(mensaje:string){

  	const toast = await this.toastCtrl.create({
  		message: mensaje,
  		duration: 1500,
  		position: 'bottom'
  	});

  	return toast.present();
  }

  On_Categoria_Click(index:number){
  	this.categoriaTemp = this.listaCategorias[index];
  	this.insert = false
  }

  On_Nivel_Click(index:number){
    this.nivelTemp = this.listaNiveles[index];
    this.insert = false;
  }

  On_Sector_Click(index:number){
    this.sectorTemp = this.listaSectores[index];
    this.insert = false;
  }

  async On_Guardar_Categoria_Click(){

  	const alert = await this.alertCtrl.create({
      header: 'Guardar Registro',
      subHeader: 'Guardar Categoria',
      message: 'Se guardarán los cambios en la base de datos. Por favor verifique. ¿Desea Continuar?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Si',
          cssClass: 'primary',
          handler: () => {
            this.GuardarCategoria();
          }
        }
      ]
    });

    await alert.present();

  }

  async On_Guardar_Nivel_Click(){

    const alert = await this.alertCtrl.create({
      header: 'Guardar Registro',
      subHeader: 'Guardar Nivel Acad.',
      message: 'Se guardarán los cambios en la base de datos. Por favor verifique. ¿Desea Continuar?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Si',
          cssClass: 'primary',
          handler: () => {
            this.GuardarNivel();
          }
        }
      ]
    });

    await alert.present();

  }

  async On_Guardar_Sector_Click(evento:Event){

    evento.stopPropagation();

    const alert = await this.alertCtrl.create({
      header: 'Guardar Registro',
      subHeader: 'Guardar Sector Ec.',
      message: 'Se guardarán los cambios en la base de datos. Por favor verifique. ¿Desea Continuar?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Si',
          cssClass: 'primary',
          handler: () => {
            this.GuardarSector();
          }
        }
      ]
    });

    await alert.present();

  }

  async On_Eliminar_Categoria_Click(){

    const alert = await this.alertCtrl.create({
      header: 'Eliminar Registro',
      subHeader: 'Eliminar Categoria',
      message: 'Se eliminará el registro de la base de datos. Por favor verifique. ¿Desea Continuar?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Si',
          cssClass: 'primary',
          handler: () => {
            this.EliminarCategoria();
          }
        }
      ]
    });

    await alert.present();

  }

  async On_Eliminar_Nivel_Click(){

    const alert = await this.alertCtrl.create({
      header: 'Eliminar Registro',
      subHeader: 'Eliminar Nivel Acad.',
      message: 'Se eliminará el registro de la base de datos. Por favor verifique. ¿Desea Continuar?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Si',
          cssClass: 'primary',
          handler: () => {
            this.EliminarNivel();
          }
        }
      ]
    });

    await alert.present();

  }

  async On_Eliminar_Sector_Click(){

    const alert = await this.alertCtrl.create({
      header: 'Eliminar Registro',
      subHeader: 'Eliminar Sector Ec.',
      message: 'Se eliminará el registro de la base de datos. Por favor verifique. ¿Desea Continuar?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Si',
          cssClass: 'primary',
          handler: () => {
            this.EliminarSector();
          }
        }
      ]
    });

    await alert.present();

  }

  GuardarCategoria(){

    if (this.insert) {

      this.aService.IngresarCategoria(this.categoriaTemp).subscribe((res) => {
        
        if (res.ok && res.json().count > 0) {

          let mensaje = 'Registro Ingresaso.';
          this.ShowToast(mensaje).then(() => {
            this.categoriaTemp = new Categoria();
            this.insert = true;
            this.LlenaCategorias();
          });

        }
      });

    }else{

      this.aService.UpdateCategoria(this.categoriaTemp).subscribe((res) => {

        if (res.ok && res.json().count > 0) {

          let mensaje = 'Cambios Aplicados.';
          this.ShowToast(mensaje).then(() => {
            this.categoriaTemp = new Categoria();
            this.insert = true;
            this.LlenaCategorias();
          });
        }
      });

    }

  }

  GuardarNivel(){

    if (this.insert) {

      this.aService.IngresaNivelAcademico(this.nivelTemp).subscribe((res) => {
        
        if (res.ok && res.json().count > 0) {

          let mensaje = 'Registro Ingresaso.';

          this.ShowToast(mensaje).then(() => {
            this.nivelTemp = new Nivelacademico();
            this.insert = true;
            this.LlenaNiveles();
          });

        }
      });

    }else{

      this.aService.UpdateNivelAcademico(this.nivelTemp).subscribe((res) => {

        if (res.ok && res.json().count > 0) {

          let mensaje = 'Cambios Aplicados.';
          this.ShowToast(mensaje).then(() => {
            this.nivelTemp = new Nivelacademico();
            this.insert = true;
            this.LlenaNiveles();
          });
        }
      });

    }

  }

  GuardarSector(){

    if (this.insert) {

      this.aService.IngresaSectorEconomico(this.sectorTemp).subscribe((res) => {
        
        if (res.ok && res.json().count > 0) {

          let mensaje = 'Registro Ingresaso.';

          this.ShowToast(mensaje).then(() => {
            this.sectorTemp = new Sectoreconomico();
            this.insert = true;
            this.LlenaSectores();
          });

        }
      });

    }else{

      this.aService.UpdateSectorAcademico(this.sectorTemp).subscribe((res) => {

        if (res.ok && res.json().count > 0) {

          let mensaje = 'Cambios Aplicados.';
          this.ShowToast(mensaje).then(() => {
            this.sectorTemp = new Sectoreconomico();
            this.insert = true;
            this.LlenaSectores();
          });
        }
      });

    }

  }

  EliminarCategoria(){
    this.aService.DeleteCategoria(this.categoriaTemp).subscribe((res) => {
      if (res.ok && res.json().count > 0) {

          let mensaje = 'Registro Eliminado.';
          this.ShowToast(mensaje).then(() => {
            this.categoriaTemp = new Categoria();
            this.insert = true;
            this.LlenaCategorias();
          });
        }
    });
  }

  EliminarNivel(){
    this.aService.DeleteNivelAcademico(this.nivelTemp).subscribe((res) => {
      if (res.ok && res.json().count > 0) {

          let mensaje = 'Registro Eliminado.';
          this.ShowToast(mensaje).then(() => {
            this.nivelTemp = new Nivelacademico();
            this.insert = true;
            this.LlenaNiveles();
          });
        }
    });
  }

  EliminarSector(){
    this.aService.DeleteSectorEconomico(this.sectorTemp).subscribe((res) => {
      if (res.ok && res.json().count > 0) {

          let mensaje = 'Registro Eliminado.';
          this.ShowToast(mensaje).then(() => {
            this.sectorTemp = new Sectoreconomico();
            this.insert = true;
            this.LlenaSectores();
          });
        }
    });
  }

  On_Foto_Change(foto:any, bloque:string){

    this.aService.UploadSpotImage(bloque, foto.files[0]).subscribe((res) => {

      if (res.ok && res.json().count > 0) {
        switch (bloque) {
          case "1":
            this.tempImg1 = foto.files[0].name;
            break;
          case "2":
            this.tempImg2 = foto.files[0].name;
            break;
          default:
            this.tempImg3 = foto.files[0].name;
            break;
        }
      }

      let mensaje = 'Imagen Cargada. Presione Guardar.';
      this.ShowToast(mensaje);

    });

  }

  On_Guardar_Spot_Click(evento:Event, bloque:string){
    
    let mensaje = '';
    evento.stopPropagation();

    switch (bloque) {
      case "1":
        if (this.tempImg1 != null) {
          this.spot1.imagen = '/spots/'.concat(bloque,'/img/',this.tempImg1);
        }

        this.aService.UpdateSpot(this.spot1).subscribe((res) => {
          
          if (res.ok && res.json().count > 0) {
            mensaje = 'Bloque '.concat(bloque, ' Guardado');
            this.ShowToast(mensaje).then(() => {
              this.tempImg1 = null;
              this.LlenaSpots();
            });
          }
        });
        break;
      case "2":
        if (this.tempImg2 != null) {
          this.spot2.imagen = '/spots/'.concat(bloque,'/img/',this.tempImg2);
        }

        this.aService.UpdateSpot(this.spot2).subscribe((res) => {
          if (res.ok && res.json().count > 0) {
            mensaje = 'Bloque '.concat(bloque, ' Guardado');
            this.ShowToast(mensaje).then(() => {
              this.tempImg2 = null;
              this.LlenaSpots();
            });
          }
        });
        break;
      
      default:
          if (this.tempImg3 != null) {
            this.spot3.imagen = '/spots/'.concat(bloque,'/img/',this.tempImg3);
          }

          this.aService.UpdateSpot(this.spot3).subscribe((res) => {
            if (res.ok && res.json().count > 0) {
              mensaje = 'Bloque '.concat(bloque, ' Guardado');
              this.ShowToast(mensaje).then(() => {
                this.tempImg3 = null;
                this.LlenaSpots();
              });
            }
          });
        break;
    }

  }

  On_Desactivar_Spot_Click(evento:Event, bloque:string){

    switch (bloque) {
      case "1":
        this.spot1.activado = false;
        break;
      case "2":
        this.spot2.activado = false;
        break;
      default:
        this.spot3.activado = false;
        break;
    }

    let mensaje = 'Spot '.concat(bloque, ' Desactivado. Presione Guardar');

    this.ShowToast(mensaje);

    evento.stopPropagation();

  }

  On_Activar_Spot_Click(evento:Event, bloque:string){

    switch (bloque) {
      case "1":
        this.spot1.activado = true;
        break;
      case "2":
        this.spot2.activado = true;
        break;
      default:
        this.spot3.activado = true;
        break;
    }

    let mensaje = 'Spot '.concat(bloque, ' Activado. Presione Guardar');

    this.ShowToast(mensaje);

    evento.stopPropagation();

  }

}
