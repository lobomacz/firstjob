import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, DatabaseSnapshot, AngularFireAction } from 'angularfire2/database';
import { environment } from '../../environments/environment';
import { User } from 'firebase';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	
  private uid:string;
  baseUrl:string = environment.appUrl;

  constructor(private _auth:AngularFireAuth, private _db:AngularFireDatabase, private http:Http, private _router:Router) {

  }

  GetCurrentUser():Observable<User>{
  	return this._auth.user;
  }

  GetSectores():Observable<Response>{
    return this.http.get(this.baseUrl.concat('/sectores'));
  }

  GetSector(id:string):Observable<Response>{
    return this.http.get(this.baseUrl.concat('/sectores/', id));
  }

  GetEtnias():Observable<Response>{
    return this.http.get(this.baseUrl.concat('/etnias'));
  }

  GetEtnia(id:string):Observable<Response>{
    return this.http.get(this.baseUrl.concat('/etnias/', id));
  }

  IsAdmin(uid:string):Observable<AngularFireAction<DatabaseSnapshot<any>>>{
    return this._db.object('/admins/'.concat(uid)).snapshotChanges();
  }

  IsEmployer(uid:string):Observable<Response>{
    return this.http.get(this.baseUrl.concat("/empleadores/count/", uid));
  }

  IsCandidate(uid:string):Observable<Response>{
    return this.http.get(this.baseUrl.concat("/usuarios/count/", uid));
  }

  AdminAudit(_id:string){
    let date = new Date();
    let fecha = date.toDateString();
    let hora = date.toLocaleTimeString();
    this._db.object('/admins/'.concat(_id)).set({'fecha_ultimo_ingreso':fecha, 'hora_ultimo_ingreso':hora}).then(()=>{});
  }

  LoginEmail(email:string, pass:string):Promise<any>{
  	return this._auth.auth.signInWithEmailAndPassword(email, pass);
  }

  Logout(uid:string):Promise<void>{
    
  	return this._auth.auth.signOut();
  }

  ResetPassword(email:string):Promise<void>{
    return this._auth.auth.sendPasswordResetEmail(email);
  }

  UserAudit(userId:string, accion:string){
  	
  	let headers:Headers = new Headers({
  		'Content-Type':'application/json'
  	});

  	let options:RequestOptions = new RequestOptions({'headers':headers});

  	let datos:any = {
  		'accion':accion,
  		'idUsuario':userId
  	};

  	this.http.post(this.baseUrl.concat('/audit/'), datos, options).subscribe((r) => {
      console.log('auditado');
      /*
      this.IsAdmin(userId).subscribe(u => {

        if(u.key != null){
          this.AdminAudit(userId);

        }

      });
      */

  	});
  }
}
