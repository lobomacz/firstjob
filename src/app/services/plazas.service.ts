import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Plaza } from './../clases/plaza';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlazasService {

	private baseUrl:string = environment.appUrl;

  constructor(private _router:Router, private _http:Http) { }

  GetPlazas():Observable<Response>{
  	return this._http.get(this.baseUrl.concat('/plazas/todas'));
  }

  GetPlazasAbiertas():Observable<Response>{
  	return this._http.get(this.baseUrl.concat('/plazas/abiertas'));
  }

  GetEmployerPlazasAbiertas(uid:string):Observable<Response>{
  	return this._http.get(this.baseUrl.concat('/plazas/empleador/', uid, '/abiertas'));
  }

  GetEmployerPlazas(uid:string):Observable<Response>{
  	return this._http.get(this.baseUrl.concat('/plazas/empleador/', uid));
  }

  GetUserApplyPlazas(uid:string):Observable<Response>{
  	return this._http.get(this.baseUrl.concat('/plazas/usuario/', uid));
  }

  GetUserApplied(id:string, uid:string):Observable<Response>{
  	return this._http.get(this.baseUrl.concat('/plazas/', id, '/usuario/', uid));
  }

  GetAplicantes(id:string):Observable<Response>{
    return this._http.get(this.baseUrl.concat('/plazas/', id, '/aplicantes'));
  }

  UnapplyUser(idPlaza:string, uid:string):Observable<Response>{

  	let headers:Headers = new Headers({
  		'Content-Type': 'application/json'
  	});

  	let options:RequestOptions = new RequestOptions({'headers': headers});

  	let datos = {'uid':uid};

  	return this._http.post(this.baseUrl.concat('/plazas/', idPlaza, '/retirar'), datos, options);

  }

  ApplyPlaza(idPlaza:string, uid:string):Observable<Response>{

  	let headers:Headers = new Headers({
  		'Content-Type': 'application/json'
  	});

  	let options:RequestOptions = new RequestOptions({'headers': headers});

  	let datos = {'uid':uid};

  	return this._http.post(this.baseUrl.concat('/plazas/', idPlaza, '/aplicar'), datos, options);

  }

  GetPlaza(id:string):Observable<Response>{
  	return this._http.get(this.baseUrl.concat('/plazas/', id));
  }

  InsertPlaza(plaza:Plaza):Observable<Response>{

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

  UploadDocument(id:string, file:any):Observable<Response>{

  	let headers:Headers = new Headers({
  		'Accept':'multipart/form-data'
  	});

  	let options:RequestOptions = new RequestOptions({'headers':headers});

  	const formData = new FormData();
  	formData.append('documento', file);

  	return this._http.post(this.baseUrl.concat('/empleadores/', id, '/documento/upload'),formData,options);
  }

  DeleteDocument(id:string, file:string):Observable<Response>{
  	let headers:Headers = new Headers({
  		'Content-Type': 'application/json'
  	});

  	let options:RequestOptions = new RequestOptions({'headers': headers});

  	let datos = {'documento':file};

  	return this._http.post(this.baseUrl.concat('/empleadores/',id,'/documento/delete'),datos,options);

  }


}
