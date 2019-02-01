import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, DatabaseSnapshot, AngularFireAction } from 'angularfire2/database';
import { environment } from '../../environments/environment';
import { Usuario } from '../clases/usuario';
import { Curriculum } from '../clases/curriculum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService extends UserService {

	_http:Http;
  baseUrl:string = environment.appUrl;

  constructor(_auth:AngularFireAuth, _db:AngularFireDatabase, http:Http, _router:Router) {
  	super(_auth,_db,http,_router);
  	this._http = http;
  }


  GetCandidateProfile(uid:string):Observable<Response>{
    return this._http.get(this.baseUrl.concat('/usuarios/uid/', uid));
  }

  GetCandidatesBySector(sector:string):Observable<Response>{
  	return this._http.get(this.baseUrl.concat('/usuarios/', sector));
  }

  GetCandidatePhoto(uid:string, foto:string):Observable<Response>{
    return this._http.get(this.baseUrl.concat('/usuarios/', uid, '/fotos/', foto));
  }

  GetCandidateGroup(candidates:string[]):Observable<Response>{
    let headers:Headers = new Headers({
      'Content-Type':'application/json'
    });

    let options:RequestOptions = new RequestOptions({'headers':headers});

    return this._http.post(this.baseUrl.concat('/usuarios/aplicantes'),{'aplicantes':candidates},options);
  }

  GetCurriculum(uid:string):Observable<Response>{
    return this._http.get(this.baseUrl.concat('/usuarios/',uid,'/curriculum'));
  }

  InsertCandidate(candidate:Usuario):Observable<Response>{

  	let headers:Headers = new Headers({
  		'Content-Type':'application/json'
  	});

  	let options:RequestOptions = new RequestOptions({'headers':headers});

  	return this._http.post(this.baseUrl.concat('/usuarios/nuevo'),{'usuario':candidate},options);
  }

  InsertCandidateCurriculum(curriculum:Curriculum):Observable<Response>{

    let headers:Headers = new Headers({
      'Content-Type':'application/json'
    });

    let options:RequestOptions = new RequestOptions({'headers':headers});

    return this._http.post(this.baseUrl.concat('/curriculums/nuevo'),{'curriculum':curriculum},options);
  }

  UploadCurriculumDocument(uid:string, file:any):Observable<Response>{

    let headers:Headers = new Headers({
      'Accept': 'multipart/form-data'
    });

    let options:RequestOptions = new RequestOptions({'headers':headers});
    const formData = new FormData();
    formData.append('documento',file);

    return this._http.post(this.baseUrl.concat('/usuarios/', uid, '/curriculum/upload'), formData, options);
  }

  UpdateCandidate(uid:string, candidate:Usuario):Observable<Response>{
  	let headers:Headers = new Headers({
  		'Content-Type':'application/json'
  	});

  	let options:RequestOptions = new RequestOptions({'headers':headers});

  	return this._http.post(this.baseUrl.concat('/usuarios/actualizar/'), {'usuario':candidate, 'uid':uid},options);
  }

  UpdateCandidateCurriculum(uid:string, curriculum:Curriculum):Observable<Response>{
    let headers:Headers = new Headers({
      'Content-Type':'application/json'
    });

    let options:RequestOptions = new RequestOptions({'headers':headers});

    return this._http.post(this.baseUrl.concat('/curriculums/actualizar/'), {'curriculum':curriculum, 'uid':uid},options);
  }

  DeleteCandidate(uid:string):Observable<Response>{
  	let headers:Headers = new Headers({
  		'Content-Type':'application/json'
  	});

  	let options:RequestOptions = new RequestOptions({'headers':headers});

  	let datos = {'uid':uid};

  	return this._http.post(this.baseUrl.concat('/usuarios/eliminar/'),datos,options);
  }

  DeleteCurriculumDocument(uid:string, file:string):Observable<Response>{

    let headers:Headers = new Headers({
      'Content-Type':'application/json'
    });

    let options:RequestOptions = new RequestOptions({'headers':headers});

    let datos = {'documento':file};

    return this._http.post(this.baseUrl.concat('/usuarios/', uid, '/curriculum/delete'), datos, options);
  }

  CloseCandidateProfile(uid:string):Observable<Response>{

    let headers:Headers = new Headers({
      'Content-Type':'application/json'
    });

    let options:RequestOptions = new RequestOptions({'headers':headers});

    let datos = {'uid':uid};

    return this._http.post(this.baseUrl.concat('/usuarios/perfil/cerrar/'),datos,options);

  }

  UploadCandidateFoto(id:string, foto:any):Observable<Response>{
    let headers:Headers = new Headers({
      'Accept': 'multipart/form-data'
    });

    let options:RequestOptions = new RequestOptions({'headers':headers});
    const formData = new FormData();
    formData.append('foto',foto);

    return this._http.post(this.baseUrl.concat('/usuarios/', id, '/img/upload'), formData, options);
  }

  DeleteCandidateFoto(id:string, foto:string):Observable<Response>{
    let headers:Headers = new Headers({
      'Content-Type':'application/json'
    });

    let options:RequestOptions = new RequestOptions({'headers':headers});

    let datos = {'foto':foto};

    return this._http.post(this.baseUrl.concat('/usuarios/', id, '/img/delete'), datos, options);
  }

  GetNivelesAcademicos():Observable<Response>{
    return this._http.get(this.baseUrl.concat('/nivelesacademicos'));
  }

  GetNivelAcademico(id:string):Observable<Response>{
    return this._http.get(this.baseUrl.concat('/nivelesacademicos/', id));
  }

}
