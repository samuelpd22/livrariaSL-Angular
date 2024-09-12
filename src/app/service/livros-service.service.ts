import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livros } from '../models/Livros';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LivrosServiceService {

   //@Autowired
   http = inject(HttpClient); //FAZ REQUISIÇÕES

   API = "http://localhost:8080/livros";



   constructor() { }

   listAll(): Observable<Livros[]>{ //Metodo @GETMapping
     return this.http.get<Livros[]>(this.API);
   }
   listGender(genero:string): Observable<Livros[]>{ //Metodo @GETMapping
    return this.http.get<Livros[]>(this.API +"/genero/" + genero);
  }


   save(livro:Livros): Observable<string>{ //Metodo @PostMapping
     return this.http.post<string>(this.API+"/enviar", livro  ,{ responseType: 'text' as 'json'})//Retorno string? Sempre usar responseType

   }


}
