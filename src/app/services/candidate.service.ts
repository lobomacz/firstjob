import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, DatabaseSnapshot, AngularFireAction } from 'angularfire2/database';
import { Usuario } from '../clases/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService extends UserService {

	_http:Http;

  constructor(_auth:AngularFireAuth, _db:AngularFireDatabase, http:Http, _router:Router) {
  	super(_auth,_db,http,_router);
  	this._http = http;
  }


  GetCandidateProfile(uid:string):Observable<Response>{
    return this._http.get('http://localhost:3000/usuarios/uid/'.concat(uid));
  }

  GetCandidatesBySector(sector:string):Observable<Response>{
  	return this._http.get('http://localhost:3000/usuarios/'.concat(sector));
  }

  InsertCandidate(candidate:Usuario):Observable<Response>{

  	let headers:Headers = new Headers({
  		'Content-Type':'application/json'
  	});

  	let options:RequestOptions = new RequestOptions({'headers':headers});

  	return this._http.post('http://localhost:3000/usuarios/nuevo',candidate,options);
  }

  UpdateCandidate(candidate:Usuario):Observable<Response>{
  	let headers:Headers = new Headers({
  		'Content-Type':'application/json'
  	});

  	let options:RequestOptions = new RequestOptions({'headers':headers});

  	return this._http.post('http://localhost:3000/usuarios/actualizar/',candidate,options);
  }

  DeleteCandidate(uid:string):Observable<Response>{
  	let headers:Headers = new Headers({
  		'Content-Type':'application/json'
  	});

  	let options:RequestOptions = new RequestOptions({'headers':headers});

  	let datos = {'uid':uid};

  	return this._http.post('http://localhost:3000/usuarios/eliminar/',datos,options);
  }

  GetUserFoto(uid:string, foto:string):Observable<Response>{
  	return this._http.get('http://localhost:3000/usuarios/'.concat(uid,'/',foto));
  }

/*
  GetUserResume(uid:string):Observable<Response>{

  }*/

}
