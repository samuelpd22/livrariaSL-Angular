import { Autor } from "./Autor";


export class Livros {
  id!:number;
  titulo!:string;
  imagemUrl!:string;
  sinopse!:string;
  valor!:string;
  linkLivro!:string;
  genero!:string;
  autor!:Autor;



  constructor(id:number,titulo:string ,imagemUrl:string, sinopse:string, valor:string  ,linkLivro:string , genero:string, autor:Autor){
    this.id = id;
    this.titulo = titulo;
    this.imagemUrl = imagemUrl;
    this.sinopse = sinopse;
    this.valor = valor;
    this.linkLivro = linkLivro;
    this.genero = genero;
    this.autor = autor
  }


}
