export class Livros {
  id!:number;
  titulo!:string;
  imagemUrl!:string;



  constructor(id:number,titulo:string ,imagemUrl:string){
    this.id = id;
    this.titulo = titulo;
    this.imagemUrl = imagemUrl;
  }


}
