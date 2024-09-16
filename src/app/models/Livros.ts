export class Livros {
  id!:number;
  titulo!:string;
  imagemUrl!:string;
  sinopse!:string;
  valor!:string;
  linkLivro!:string;
  genero!:string;



  constructor(id:number,titulo:string ,imagemUrl:string, sinopse:string, valor:string  ,linkLivro:string , genero:string){
    this.id = id;
    this.titulo = titulo;
    this.imagemUrl = imagemUrl;
    this.sinopse = sinopse;
    this.valor = valor;
    this.linkLivro = linkLivro;
    this.genero = genero;
  }


}
