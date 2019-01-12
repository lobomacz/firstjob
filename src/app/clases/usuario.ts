export class Usuario {

	foto:string;
	primerNombre:string;
	segundoNombre:string;
	primerApellido:string;
	segundoApellido:string;
	fechaNacimiento:string;
	email:string;
	sexo:string;
	etnia:string;
	telefonos:any[];
	direccion:string;
	profesion:string;
	nivelAcademico:string;
	sector:string;
	facebook:string;
	twitter:string;
	linkedin:string;
	activo:boolean;
	_id:string;

	constructor(datos?:any, Foto:string = 'users_data/img/unknown-user.png'){
		if(datos != null){
			const {
				foto,
				primerNombre,
				segundoNombre,
				primerApellido,
				segundoApellido,
				fechaNacimiento,
				email,
				sexo,
				etnia,
				telefonos,
				direccion,
				profesion,
				nivelAcademico,
				sector,
				facebook,
				twitter,
				linkedin,
				activo,
				_id
			} = datos;

			this.foto = foto;
			this.primerNombre = primerNombre;
			this.segundoNombre = segundoNombre;
			this.primerApellido = primerApellido;
			this.segundoApellido = segundoApellido;
			this.fechaNacimiento = fechaNacimiento;
			this.email = email;
			this.sexo = sexo;
			this.etnia = etnia;
			this.telefonos = telefonos;
			this.direccion = direccion;
			this.profesion = profesion;
			this.nivelAcademico = nivelAcademico;
			this.sector = sector;
			this.facebook = facebook;
			this.twitter = twitter;
			this.linkedin = linkedin;
			this.activo = activo;
			this._id = _id;

		}else{

			this.foto = Foto;
			this.primerNombre = '';
			this.segundoNombre = '';
			this.primerApellido = '';
			this.segundoApellido = '';
			this.fechaNacimiento = '';
			this.email = '';
			this.sexo = '';
			this.etnia = '';
			this.telefonos = null;
			this.direccion = '';
			this.profesion = '';
			this.nivelAcademico = '';
			this.sector = '';
			this.facebook = '';
			this.twitter = '';
			this.linkedin = '';
			this.activo = null;
			this._id = ''; 
			
		}
	}

}
