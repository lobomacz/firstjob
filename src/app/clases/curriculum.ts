export class Curriculum {

	_id:string;
	documento:boolean;
	objeto:boolean;
	documentoUrl:string;
	documentoJson:any;
	fechaCreacion:string;
	fechaActualizacion:string;


	constructor(datos?:any){
		if(datos != null){

			const {
				_id,
				documento,
				objeto,
				documentoUrl,
				documentoJson,
				fechaCreacion,
				fechaActualizacion
			} = datos;

			this._id = _id;
			this.documento = documento;
			this.objeto = objeto;
			this.documentoUrl = documentoUrl;
			this.documentoJson = documentoJson;
			this.fechaCreacion = fechaCreacion;
			this.fechaActualizacion = fechaActualizacion;

		}else {

			this._id = ''; 
			this.documento = false;
			this.objeto = false;
			this.documentoUrl = '';
			this.documentoJson = null;
			this.fechaCreacion = '';
			this.fechaActualizacion = '';
			
		}
	}
}
