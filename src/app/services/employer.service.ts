import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Empleador } from '../clases/empleador';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployerService extends UserService {

	baseUrl:string = environment.appUrl;
	_http:Http;

  constructor(_auth:AngularFireAuth, _db:AngularFireDatabase, _router:Router, http:Http) { 
  	super(_auth, _db, http, _router);
  	this._http = http;
  }

  GetNombresEmpleadores():Observable<Response>{
    return this._http.get(this.baseUrl.concat('/empleadores/nombres'));
  }

  GetEmpleadorProfile(uid:string):Observable<Response>{
    return this._http.get(this.baseUrl.concat('/empleadores/uid/', uid));
  }

  InsertaEmpleador(empleador:Empleador):Observable<Response>{

  	let headers:Headers = new Headers({
  		'Content-Type':'application/json'
  	});

  	let options:RequestOptions = new RequestOptions({'headers':headers});

  	return this._http.post(this.baseUrl.concat('/empleadores/nuevo'), {'empleador':empleador}, options);
  }

  ActualizarEmpleador(uid:string, empleador:Empleador):Observable<Response>{
    let headers:Headers = new Headers({
      'Content-Type':'application/json'
    });

    let options:RequestOptions = new RequestOptions({'headers':headers});

    return this._http.post(this.baseUrl.concat('/empleadores/actualizar/'), {'empleador':empleador, 'uid':uid}, options);
  }

  EliminarEmpleador(uid:string):Observable<Response>{
    let headers:Headers = new Headers({'Content-Type':'application/json'});

    let options:RequestOptions = new RequestOptions({'headers':headers});

    return this._http.post(this.baseUrl.concat('/empleadores/eliminar'), {'uid':uid}, options);
  }

  CerrarPerfilEmpleador(uid:string):Observable<Response>{
    let headers:Headers = new Headers({'Content-Type':'application/json'});

    let options:RequestOptions = new RequestOptions({'headers':headers});

    return this._http.post(this.baseUrl.concat('/empleadores/perfil/cerrar'), {'uid':uid}, options);
  }

  UploadEmployerLogo(uid:string, foto:any):Observable<Response>{

    let headers:Headers = new Headers({
      'Accept': 'multipart/form-data'
    });

    let options:RequestOptions = new RequestOptions({'headers':headers});

    const formData:FormData = new FormData();
    formData.append('foto', foto);

    return this._http.post(this.baseUrl.concat('/empleadores/', uid, '/img/upload'), formData, options);
  }

  DeleteEmployerLogo(uid:string, foto:string):Observable<Response>{

    let headers:Headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options:RequestOptions = new RequestOptions({'headers':headers});

    let datos = {'foto':foto};

    return this._http.post(this.baseUrl.concat('/empleadores/', uid, '/img/delete'), datos, options);
  }

}
