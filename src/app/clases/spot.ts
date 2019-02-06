export class Spot {

	_id:string;
	bloque:string;
	propietario:string;
	imagen:string;
	activado:boolean;

	constructor(datos?:any){
		if (datos != null) {
			const {_id,bloque,propietario,imagen,activado} = datos;
			this._id = _id;
			this.bloque = bloque;
			this.propietario = propietario;
			this.imagen = imagen;
			this.activado = activado;
		}else {
			this._id = null;
			this.bloque = null;
			this.propietario = '';
			this.imagen = '/spots/img/unknown-logo.jpg';
			this.activado = false;
		}
	}
}
