import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Autor } from '../../models/Autor';
import { AutorService } from '../../service/autor.service';
import { CommonModule } from '@angular/common'; // Importa o CommonModule
import { Livros } from '../../models/Livros';
import { LivrosServiceService } from '../../service/livros-service.service';


@Component({
  selector: 'app-autores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './autores.component.html',
  styleUrl: './autores.component.scss'
})
export class AutoresComponent {

  livros: Livros[]=[];
  livrosEdit: Livros = new Livros(0,"","","","","","", new Autor(0,"","",[]));

  
  autors: Autor[]=[];
  autorsEdit: Autor = new Autor(0,"","",[])

  autorService = inject(AutorService);//@Autowired
  livroService = inject(LivrosServiceService); // Certifique-se de que este serviço é injetado corretamente

  @Output() autorSelecionado = new EventEmitter<string>(); // Emitindo o nome do autor


  constructor(){

    this.listAll();



   }

   listAll() {
    this.autorService.listAll().subscribe({
        next: (lista) => {
            if (Array.isArray(lista)) {
                this.autors = lista;
            } else {
                console.error("O retorno não é um array:", lista);
            }
        },
        error: (err) => {
            console.error("Erro ao listar autores: ", err);
        }
    });
  }

  mostrarLivros(nome: string) {
    const autorSelecionado = this.autors.find(autor => autor.nome === nome);
    if (autorSelecionado) {
        console.log(  autorSelecionado.livros); // Exibe os livros do autor selecionado
        this.livros = autorSelecionado.livros; // Atualiza a lista de livros
        this.autorSelecionado.emit(nome); // Emitindo o evento

    } else {
        console.error("Autor não encontrado");
    }
}



}
