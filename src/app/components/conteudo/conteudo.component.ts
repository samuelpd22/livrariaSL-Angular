import { Component, inject } from '@angular/core';
import { Livros } from '../../models/Livros';
import { LivrosServiceService } from '../../service/livros-service.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, } from '@angular/forms';  // Importe o FormsModule
import { CommonModule } from '@angular/common';  // Importar CommonModule para ngIf
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { Autor } from '../../models/Autor';
import { AutoresComponent } from "../autores/autores.component";
import { AutorService } from '../../service/autor.service';
import { ChangeDetectorRef } from '@angular/core';








@Component({
  selector: 'app-conteudo',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule, MdbCollapseModule, MdbFormsModule,  MdbCarouselModule, AutoresComponent],
  templateUrl: './conteudo.component.html',
  styleUrl: './conteudo.component.scss'
})
export class ConteudoComponent {

  autors: Autor[]=[];
  autorsEdit: Autor = new Autor(0,"","",[])


  selectedBook: any = null; // Livro selecionado para mostrar detalhes

  showForm = false; // Controle do formulário para adicionar livro


  livros: Livros[]=[];
  livrosEdit: Livros = new Livros(0,"","","","","","", new Autor(0,"","",[]));

  livrosService = inject(LivrosServiceService);//@Autowired
  autorService = inject(AutorService);//@Autowired


  constructor(private cdr: ChangeDetectorRef){

    this.listAll();


    const livroNovo = history.state?.livroNovo; // Use o operador de encadeamento opcional
    const livroEditado = history.state?.livroEditado; // Use o operador de encadeamento opcional


     if(livroNovo){
      livroNovo.id = 555;
       this.livros.push(livroNovo);

     }
     if(livroEditado){
       let indice = this.livros.findIndex(x => {return x.id == livroEditado.id});
       this.livros[ indice ] = livroEditado;
     }

     this.livrosService.livros$.subscribe((livros) => {
      this.livros = livros; // Atualiza a lista de livros com os livros do autor
  });

   }

   listAll(){          //ESTRUTURA PARA METODOD GET RETORNAR
     this.livrosService.listAll().subscribe({
       next:lista => { //QUANDO DER CERTO
         this.livros = lista;

       },
       error: err => { //QUANDO OCORRER ERRO


       }
     });
  };

  listGenero(genero:string){
    this.livrosService.listGender(genero).subscribe({
      next:lista => { //QUANDO DER CERTO
        this.livros = lista;
        console.log(lista)

      },
      error: err => { //QUANDO OCORRER ERRO

        console.log("erro de depuração");
      }
    });
 };

  enviarLivro() {
    this.showForm = true; // Exibe o formulário
  }

  salvarLivro() {
    if (this.livrosEdit.titulo && this.livrosEdit.imagemUrl) {
      this.livrosService.save(this.livrosEdit).subscribe({
        next: mensagem => {
          alert("Salvo com sucesso");
          this.showForm = false; // Oculta o formulário
          this.listAll();
        },
        error: erro => {
          alert("Ocorreu algum erro");
        }
      });
    } else {
      alert("Por favor, preencha todos os campos");
    }
  }


//
// Função para mostrar detalhes do livro
showBookDetails(livroId: number) {
  this.livrosService.getById(livroId).subscribe(data => {
    this.selectedBook = data;
  });
}

// Função para fechar o card de detalhes
closeBookDetails() {
  this.selectedBook = null;
}


  listarLivrosPorAutor(nome: string) {
    this.autorService.listAll().subscribe({
        next: (autores: Autor[]) => {
            const autorSelecionado = autores.find(autor => autor.nome === nome);
            if (autorSelecionado) {
                this.livros = autorSelecionado.livros; // Atualiza a lista de livros
                this.livrosService.setLivros(this.livros); // Atualiza o BehaviorSubject
                console.log("Livros recebidos:", this.livros);
            } else {
                console.error("Autor não encontrado");
            }
        },
        error: (err) => {
            console.error("Erro ao listar autores:", err);
        }
    });
  }
}








