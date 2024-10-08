import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autor } from '../models/Autor';
import { Livros } from '../models/Livros';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

 //@Autowired
 http = inject(HttpClient); //FAZ REQUISIÇÕES

 API = "https://backend-livrariasl.onrender.com/autor";
 //API = "http://localhost:8080/autor";



 constructor() { }

 listAll(): Observable<Autor[]>{ //Metodo @GETMapping
   return this.http.get<Autor[]>(this.API);
 }
 

 listLivroPorAutor(nome:string): Observable<Livros[]>{ //Metodo @GETMapping
  return this.http.get<Livros[]>(this.API +"/" + nome);
}
  
}
