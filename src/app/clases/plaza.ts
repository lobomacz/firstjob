export class Plaza {

	idEmpleador:string;
	titulo:string;
	sector:string;
	descripcion:string;
	categoria:number;
	fechaPublicacion:string;
	emailPublicador:string;
	fechaLimite:string;
	contacto:any;
	documento:string;
	abierta:boolean;
	aplicantes:string[];

	constructor(datos?:any){
		if(datos != null){
			const {
				idEmpleador,
				titulo,
				descripcion,
				sector,
				categoria,
				fechaPublicacion,
				emailPublicador,
				fechaLimite,
				contacto,
				documento,
				abierta,
				aplicantes
			} = datos;

			this.idEmpleador = idEmpleador;
			this.titulo = titulo;
			this.descripcion = descripcion;
			this.categoria = categoria;
			this.fechaPublicacion = fechaPublicacion;
			this.emailPublicador = emailPublicador;
			this.contacto = contacto;
			this.documento = documento;
			this.abierta = abierta;
			this.aplicantes = aplicantes;

		}else{

			this.idEmpleador = '';
			this.titulo = '';
			this.descripcion = '';
			this.categoria = null;
			this.fechaPublicacion = '';
			this.emailPublicador = '';
			this.contacto = {
				'nombre':'',
				'telefono':'',
				'email': ''
			};
			this.documento = '';
			this.abierta = null;
			this.aplicantes = [];

		}
	}

}
