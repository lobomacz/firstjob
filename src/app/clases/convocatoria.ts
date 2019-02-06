export class Convocatoria {

	titulo:string;
	descripcion:string;
	idAutor:string;
	fechaPublicacion:string;
	timeStamp:number;
	etiquetas:string[];

	constructor(datos?:any){
		if(datos != null){
			const {
				titulo,
				descripcion,
				idAutor,
				fechaPublicacion,
				timeStamp,
				etiquetas
			} = datos;

			this.titulo = titulo;
			this.descripcion = descripcion;
			this.idAutor = idAutor;
			this.fechaPublicacion = fechaPublicacion;
			this.timeStamp = timeStamp;
			this.etiquetas = etiquetas;

		}else{

			this.titulo = '';
			this.descripcion = '';
			this.idAutor = '';
			this.fechaPublicacion = '';
			this.timeStamp = new Date().getTime();
			this.etiquetas = [];
		}
	}
}
