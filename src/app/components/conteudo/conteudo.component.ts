import { Component, inject } from '@angular/core';
import { Livros } from '../../models/Livros';
import { LivrosServiceService } from '../../service/livros-service.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, } from '@angular/forms';  // Importe o FormsModule
import { CommonModule } from '@angular/common';  // Importar CommonModule para ngIf
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';





@Component({
  selector: 'app-conteudo',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule ,MdbCollapseModule,MdbFormsModule],
  templateUrl: './conteudo.component.html',
  styleUrl: './conteudo.component.scss'
})
export class ConteudoComponent {


  showForm: boolean = false; // Variável para controlar a exibição do formulário


  livros: Livros[]=[];
  livrosEdit: Livros = new Livros(0,"","","");

  livrosService = inject(LivrosServiceService);//@Autowired

  constructor(){

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


}











