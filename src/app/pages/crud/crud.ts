import { Component, OnInit, signal } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table'; // Importando o módulo da tabela
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Importando o módulo HttpClientModule

interface Product {
  id: string;
  name: string;
}

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    TableModule, // Corrigido para importar o módulo
    HttpClientModule // Corrigido para importar o módulo HttpClientModule
  ],
  template: `
    <p-toolbar styleClass="mb-6">
      <ng-template #start>
        <p-button label="Novo" icon="pi pi-plus" severity="secondary" class="mr-2"  />
      </ng-template>
    </p-toolbar>

    <p-table #dt [value]="products()" [rows]="20" [paginator]="true" [globalFilterFields]="['name']">
      <ng-template #header>
        <tr>
          <th style="min-width: 1rem">ID</th>
          <th style="min-width: 12rem">Nome</th>
          <th style="min-width: 12rem">CPF</th>
          <th style="min-width: 16rem">Logradouro</th>
          <th style="min-width: 5rem">Numero da Casa</th>
          <th style="min-width: 5rem">Perfil de Acesso</th>
          <th style="min-width: 5rem">Status</th>
        </tr>
      </ng-template>
      <ng-template #body let-product>
        <tr>
          <td>{{ product.id }}</td>
          <td>{{ product.pessoa.nome }}</td>
          <td>{{ product.cpf }}</td>
          <td>{{ product.pessoa.endereco.logradouro }}</td>
          <td>{{ product.pessoa.endereco.numeroCasa }}</td>
          <td>{{ product.perfilAcesso.descricao }}</td>
          <td>{{ product.pessoa.pessoaStatus.descricao }}</td>
        </tr>
      </ng-template>
    </p-table>
  `,
  providers: [MessageService, ConfirmationService]
})
export class Crud implements OnInit {
  products = signal<Product[]>([]);

  constructor(private http: HttpClient, private messageService: MessageService) {}

  ngOnInit() {
    this.loadDemoData();
  }

  loadDemoData() {
    this.http.get<Product[]>('http://10.112.61.74:9090/pessoas/fisicas').subscribe(
      (data) => {
        this.products.set(data); // Aqui você define os dados que virão da API.
        this.messageService.add({
          severity: 'success',
          summary: 'Dados carregados',
          detail: 'A lista de produtos foi carregada com sucesso',
          life: 3000
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar os dados da API',
          life: 3000
        });
      }
    );
  }
}
