export class Livros {
  id!:number;
  titulo!:string;
  imagemUrl!:string;
  genero!:string;



  constructor(id:number,titulo:string ,imagemUrl:string, genero:string){
    this.id = id;
    this.titulo = titulo;
    this.imagemUrl = imagemUrl;
    this.genero = genero;
  }


}
