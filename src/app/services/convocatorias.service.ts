import { Injectable } from '@angular/core';
import { RequestOptions, Http, Headers, Response } from '@angular/http';
import { Convocatoria } from './../clases/convocatoria';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriasService {

	private baseUrl:string = environment.appUrl;

  constructor(private _http:Http) { }

  GetConvocatorias():Observable<Response>{
  	return this._http.get(this.baseUrl.concat('/convocatorias/todas'));
  }

  GetPorFechas(inicio:string, final:string):Observable<Response>{
  	return this._http.get(this.baseUrl.concat('/convocatorias/fechas/',inicio,'/',final));
  }

  GetConvocatoria(id:string):Observable<Response>{
  	return this._http.get(this.baseUrl.concat('/convocatorias/', id));
  }

  InsertConvocatoria(obj:Convocatoria):Observable<Response>{

  	const headers:Headers = new Headers({
  		'Content-Type': 'application/json'
  	});

  	let options:RequestOptions = new RequestOptions({'headers':headers});

  	let datos = {'convocatoria':obj};

  	return this._http.post(this.baseUrl.concat('/convocatorias/nueva'), datos, options);
  }

  UpdateConvocatoria(id:string, obj:Convocatoria):Observable<Response>{

  	const headers:Headers = new Headers({
  		'Content-Type': 'application/json'
  	});

  	let options:RequestOptions = new RequestOptions({'headers':headers});

  	let datos = {'convocatoria':obj};

  	return this._http.post(this.baseUrl.concat('/convocatorias/', id, '/actualizar'), datos, options);
  }

}
