export class Categoria {
	descripcion:string;
	descripcion_corta:string = '';

	constructor(datos?:any){

		if (datos != null) {
			
			const {descripcion, descripcion_corta} = datos;

			this.descripcion = descripcion;
			this.descripcion_corta = descripcion_corta;

		}else{

			this.descripcion = '';
			this.descripcion_corta = '';

		}
	}
}
