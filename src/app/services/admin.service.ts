import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

import { Categoria } from './../clases/categoria';
import { Nivelacademico } from './../clases/nivelacademico';
import { Sectoreconomico } from './../clases/sectoreconomico';
import { Spot } from './../clases/spot';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

	private baseUrl:string = environment.appUrl;

  constructor(private _http:Http) { }

  GetCategorias():Observable<Response>{
  	return this._http.get(this.baseUrl.concat('/categorias'));
  }

  IngresarCategoria(categoria:Categoria):Observable<Response>{

  	let headers:Headers = new Headers({
  		'Content-Type': 'application/json'
  	});

  	let options:RequestOptions = new RequestOptions({'headers': headers});

  	let datos = {'categoria':categoria};

  	return this._http.post(this.baseUrl.concat('/categorias/nueva'), datos, options);

  }

  UpdateCategoria(categoria:Categoria):Observable<Response>{

  	let headers:Headers = new Headers({
  		'Content-Type': 'application/json'
  	});

  	let options:RequestOptions = new RequestOptions({'headers': headers});

  	let datos = {'categoria':categoria};

  	return this._http.post(this.baseUrl.concat('/categorias/actualizar'), datos, options);
  }

  DeleteCategoria(categoria:Categoria):Observable<Response>{

    let headers:Headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options:RequestOptions = new RequestOptions({'headers': headers});

    let datos = {'categoria':categoria};

    return this._http.post(this.baseUrl.concat('/categorias/eliminar'), datos, options);
  }

  GetNivelesAcademicos():Observable<Response>{
    return this._http.get(this.baseUrl.concat('/nivelesacademicos'));
  }

  IngresaNivelAcademico(nivel:Nivelacademico):Observable<Response>{

    let headers:Headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options:RequestOptions = new RequestOptions({'headers': headers});

    let datos = {'nivel':nivel};

    return this._http.post(this.baseUrl.concat('/nivelesacademicos/nuevo'), datos, options);

  }

  UpdateNivelAcademico(nivel:Nivelacademico):Observable<Response>{

    let headers:Headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options:RequestOptions = new RequestOptions({'headers': headers});

    let datos = {'nivel':nivel};

    return this._http.post(this.baseUrl.concat('/nivelesacademicos/actualizar'), datos, options);
  }

  DeleteNivelAcademico(nivel:Nivelacademico):Observable<Response>{

    let headers:Headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options:RequestOptions = new RequestOptions({'headers': headers});

    let datos = {'nivel':nivel};

    return this._http.post(this.baseUrl.concat('/nivelesacademicos/eliminar'), datos, options);
  }

  GetSectoresEconomicos():Observable<Response>{
    return this._http.get(this.baseUrl.concat('/sectores'));
  }

  IngresaSectorEconomico(sector:Sectoreconomico):Observable<Response>{

    let headers:Headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options:RequestOptions = new RequestOptions({'headers': headers});

    let datos = {'sector':sector};

    return this._http.post(this.baseUrl.concat('/sectores/nuevo'), datos, options);

  }

  UpdateSectorAcademico(sector:Sectoreconomico):Observable<Response>{

    let headers:Headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options:RequestOptions = new RequestOptions({'headers': headers});

    let datos = {'sector':sector};

    return this._http.post(this.baseUrl.concat('/sectores/actualizar'), datos, options);

  }

  DeleteSectorEconomico(sector:Sectoreconomico):Observable<Response>{

    let headers:Headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options:RequestOptions = new RequestOptions({'headers': headers});

    let datos = {'sector':sector};

    return this._http.post(this.baseUrl.concat('/sectores/eliminar'), datos, options);

  }

  GetSpots():Observable<Response>{
    return this._http.get(this.baseUrl.concat('/spots'));
  }

  GetSpot(bloque:string):Observable<Response>{
    return this._http.get(this.baseUrl.concat('/spots/bloque/',bloque));
  }

  UpdateSpot(spot:Spot):Observable<Response>{

    let headers:Headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options:RequestOptions = new RequestOptions({'headers': headers});

    let datos = {'spot':spot};

    return this._http.post(this.baseUrl.concat('/spots/actualizar'), datos, options);

  }

  UploadSpotImage(bloque:string, foto:any):Observable<Response>{
    let headers:Headers = new Headers({
      'Accept': 'multipart/form-data'
    });

    let options:RequestOptions = new RequestOptions({'headers':headers});
    const formData = new FormData();
    formData.append('foto',foto);

    return this._http.post(this.baseUrl.concat('/spots/', bloque, '/img/upload'), formData, options);
  }

  DeleteSpotImage(bloque:string, foto:string):Observable<Response>{
    let headers:Headers = new Headers({
      'Content-Type':'application/json'
    });

    let options:RequestOptions = new RequestOptions({'headers':headers});

    let datos = {'foto':foto};

    return this._http.post(this.baseUrl.concat('/spots/', bloque, '/img/delete'), datos, options);
  }

}
