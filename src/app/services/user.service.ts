import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, DatabaseSnapshot, AngularFireAction } from 'angularfire2/database';
//import { HTTP } from '@ionic-native/http/ngx';
import { User } from 'firebase';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	public userSubject:Subject<User | null>;
  private uid:string;

  constructor(private _auth:AngularFireAuth, private _db:AngularFireDatabase, private http:Http, private _router:Router) {
  	this.userSubject = new Subject();
  }

  GetCurrentUser():Observable<User>{
  	return this._auth.user;
  }

  public SetUid(uid:string){
    this.uid = uid;
  }

  public GetUid(){
    return this.uid;
  }

  IsAdmin(uid:string):Observable<AngularFireAction<DatabaseSnapshot<any>>>{
    return this._db.object('/admins/'.concat(uid)).snapshotChanges();
  }

  IsEmployer(uid:string):Observable<Response>{
    return this.http.get("http://localhost:3000/empleadores/count/".concat(uid));
  }

  IsCandidate(uid:string):Observable<Response>{
    return this.http.get("http://localhost:3000/usuarios/count/".concat(uid));
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

  Logout(uid:string){
    
  	this._auth.auth.signOut().then(() => {
  		this.UserAudit(uid,'logout');
  	}).catch((err) => {
  		
  	});
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

  	this.http.post('http://localhost:3000/audit/', datos, options).subscribe((r) => {

      this.IsAdmin(userId).subscribe(u => {
        if(u != null){
          this.AdminAudit(userId);
        }
      });
  	});
  }

  GoHome(){
  	this._router.navigateByUrl('/home');
  }
}
