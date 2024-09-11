import { Component, inject } from '@angular/core';
import { Livros } from '../../models/Livros';
import { LivrosServiceService } from '../../service/livros-service.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, } from '@angular/forms';  // Importe o FormsModule
import { CommonModule } from '@angular/common';  // Importar CommonModule para ngIf



@Component({
  selector: 'app-conteudo',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule ],
  templateUrl: './conteudo.component.html',
  styleUrl: './conteudo.component.scss'
})
export class ConteudoComponent {


  showForm: boolean = false; // Variável para controlar a exibição do formulário


  livros: Livros[]=[];
  livrosEdit: Livros = new Livros(0,"","");

  livrosService = inject(LivrosServiceService);//@Autowired

  constructor(){

    this.listAll();


     let livroNovo = history.state.livroNovo;
     let livroEditado = history.state.livroEditado;

     if(livroNovo){
      livroNovo.id = 555;
       this.livros.push(livroNovo);

     }
     if(livroEditado){
       let indice = this.livros.findIndex(x => {return x.id == livroEditado.id});
       this.livros[ indice ] = livroEditado;
     }

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
}











