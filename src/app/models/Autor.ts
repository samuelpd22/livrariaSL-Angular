import { Livros } from "./Livros";

export class Autor {
    id!:number;
    nome!:string;
    imageAutorUrl!:string;
    livros: Livros[] = [] // Array de livros
    
    
  
  
    constructor( id:number,nome:string,imageAutorUrl:string,livros:Livros[]){
      this.id = id;
      this.nome = nome;
      this.imageAutorUrl = imageAutorUrl;
      this.livros = livros;
  
  }

}