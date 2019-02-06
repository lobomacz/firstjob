export class Nivelacademico {

	descripcion:string;
	siglas:string = '';

	constructor(datos?:any){
		if(datos != null){
			const {descripcion, siglas} = datos;

			this.descripcion = descripcion;
			this.siglas = siglas;
		}else{
			this.descripcion = '';
			this.siglas = '';
		}
	}
}
