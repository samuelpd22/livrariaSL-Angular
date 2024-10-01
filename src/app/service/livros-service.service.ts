import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Livros } from '../models/Livros';
import { HttpClient } from '@angular/common/http';
import { Autor } from '../models/Autor';

@Injectable({
  providedIn: 'root'
})
export class LivrosServiceService {

   //@Autowired
   http = inject(HttpClient); //FAZ REQUISIÇÕES

   API = "http://localhost:8080/livros";

   APIAuth = "http://localhost:8080/autor";



   constructor() { }

   listAll(): Observable<Livros[]>{ //Metodo @GETMapping
     return this.http.get<Livros[]>(this.API);
   }
   listGender(genero:string): Observable<Livros[]>{ //Metodo @GETMapping
    return this.http.get<Livros[]>(this.API +"/genero/" + genero);
  }

  getById(id:number): Observable<Livros>{
    return this.http.get<Livros>(this.API + "/pegar/"+ id );
  }


   save(livro:Livros): Observable<string>{ //Metodo @PostMapping
     return this.http.post<string>(this.API+"/enviar", livro  ,{ responseType: 'text' as 'json'})//Retorno string? Sempre usar responseType

   }

   //armazena livro clicado

   private livrosSubject = new BehaviorSubject<Livros[]>([]);
    livros$ = this.livrosSubject.asObservable();

    setLivros(livros: Livros[]) {
        this.livrosSubject.next(livros);
    }



}
