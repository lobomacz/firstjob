export class Empleador {

	logo:string;
	nombreLargo:string;
	nombreCorto:string;
	direccion:string;
	telefono:string;
	email:string;
	web:string;
	representante:any;
	facebook:string;
	twitter:string;
	linkedin:string;
	sector:string;
	_id:string;
	activo:boolean;
	fechaIngreso:string;

	constructor(datos?:any, Logo:string='/empleadores/img/unknown-logo.jpg'){
		if(datos != null){
			const {
				logo,
				nombreLargo,
				nombreCorto,
				direccion,
				telefono,
				email,
				web,
				representante,
				facebook,
				twitter,
				linkedin,
				sector,
				_id,
				activo,
				fechaIngreso
			} = datos;

			this.logo = logo;
			this.nombreLargo = nombreLargo;
			this.nombreCorto = nombreCorto;
			this.direccion = direccion;
			this.telefono = telefono;
			this.email = email;
			this.web = web;
			this.representante = representante;
			this.facebook = facebook;
			this.twitter = twitter;
			this.linkedin = linkedin;
			this.sector = sector;
			this._id = _id;
			this.activo = activo;
			this.fechaIngreso = fechaIngreso;

		}else{

			this.logo = Logo;
			this.nombreLargo = '';
			this.nombreCorto = '';
			this.direccion = '';
			this.telefono = '';
			this.email = '';
			this.web = '';
			this.representante = {'nombre':'', 'telefono': '', 'email': ''};
			this.facebook = '';
			this.twitter = '';
			this.linkedin = '';
			this.sector = '';
			this._id = '';
			this.activo = false;
			this.fechaIngreso = '';

		}
	}
}
