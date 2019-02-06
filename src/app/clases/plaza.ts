export class Plaza {

	idEmpleador:string;
	titulo:string;
	sector:string;
	descripcion:string;
	categoria:string;
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
			this.sector = sector;
			this.categoria = categoria;
			this.fechaPublicacion = fechaPublicacion;
			this.emailPublicador = emailPublicador;
			this.fechaLimite = fechaLimite;
			this.contacto = contacto;
			this.documento = documento;
			this.abierta = abierta;
			this.aplicantes = aplicantes;

		}else{

			this.idEmpleador = '';
			this.titulo = '';
			this.descripcion = '';
			this.sector = '';
			this.categoria = '';
			this.fechaPublicacion = '';
			this.emailPublicador = '';
			this.fechaLimite = '';
			this.contacto = {
				'nombre':'',
				'telefono':'',
				'email': ''
			};
			this.documento = '';
			this.abierta = true;
			this.aplicantes = [];

		}
	}

}
