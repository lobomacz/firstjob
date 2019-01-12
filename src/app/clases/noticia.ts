export class Noticia {

	titulo:string;
	descripcion:string;
	idAutor:string;
	fechaPublicacion:string;
	etiquetas:string[];

	constructor(datos?:any){
		if(datos != null){
			const {
				titulo,
				descripcion,
				idAutor,
				fechaPublicacion,
				etiquetas
			} = datos;

			this.titulo = titulo;
			this.descripcion = descripcion;
			this.idAutor = idAutor;
			this.fechaPublicacion = fechaPublicacion;
			this.etiquetas = etiquetas;

		}else{

			this.titulo = '';
			this.descripcion = '';
			this.idAutor = '';
			this.fechaPublicacion = '';
			this.etiquetas = [];
		}
	}
}
