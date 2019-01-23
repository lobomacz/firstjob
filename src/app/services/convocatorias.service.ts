import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Plaza } from './../clases/plaza';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriasService {

	private baseUrl:string = environment.appUrl;

  constructor(private _router:Router, private _http:Http) { }

  GetPlazas():Observable<Response>{
  	return this._http.get(this.baseUrl.concat('/plazas/todas'));
  }

  GetPlazasAbiertas():Observable<Response>{
  	return this._http.get(this.baseUrl.concat('/plazas/abiertas'));
  }

  GetEmployerPlazasAbiertas(uid:string):Observable<Response>{
  	return this._http.get(this.baseUrl.concat('/plazas/', uid, '/abiertas'));
  }

  GetEmployerPlazas(uid:string):Observable<Response>{
  	return this._http.get(this.baseUrl.concat('/plazas/', uid));
  }

  GetUserApplyPlazas(uid:string):Observable<Response>{
  	return this._http.get(this.baseUrl.concat('/plazas/usuario/', uid));
  }

  GetUserApplied(id:string, uid:string):Observable<Response>{
  	return this._http.get(this.baseUrl.concat('/plazas/', id, '/usuario/', uid));
  }

  UnapplyUser(id:string, uid:string):Observable<Response>{

  	let headers:Headers = new Headers({
  		'Content-Type': 'application/json'
  	});

  	let options:RequestOptions = new RequestOptions({'headers': headers});

  	let datos = {'uid':uid};

  	return this._http.post(this.baseUrl.concat('/plazas/', id, '/retirar'), datos, options);

  }

  ApplyPlaza(id:string, uid:string):Observable<Response>{

  	let headers:Headers = new Headers({
  		'Content-Type': 'application/json'
  	});

  	let options:RequestOptions = new RequestOptions({'headers': headers});

  	let datos = {'uid':uid};

  	return this._http.post(this.baseUrl.concat('/plazas/', id, '/aplicar'), datos, options);

  }


  InsertPlaza(uid:string, plaza:Plaza):Observable<Response>{

  	let headers:Headers = new Headers({
  		'Content-Type': 'application/json'
  	});

  	let options:RequestOptions = new RequestOptions({'headers': headers});

  	let datos = {'plaza':plaza};

  	return this._http.post(this.baseUrl.concat('/plazas/nueva'), datos, options);
  }

  UpdatePlaza(id:string, plaza:Plaza):Observable<Response>{

  	let headers:Headers = new Headers({
  		'Content-Type': 'application/json'
  	});

  	let options:RequestOptions = new RequestOptions({'headers': headers});

  	let datos = {'plaza':plaza};

  	return this._http.post(this.baseUrl.concat('/plazas/', id, '/actualizar'), datos, options);

  }

  ClosePlaza(id:string):Observable<Response>{

  	let headers:Headers = new Headers({
  		'Content-Type': 'application/json'
  	});

  	let options:RequestOptions = new RequestOptions({'headers': headers});

  	let datos = {'id':id};

  	return this._http.post(this.baseUrl.concat('/plazas/cerrar'), datos, options);

  }

  

}
