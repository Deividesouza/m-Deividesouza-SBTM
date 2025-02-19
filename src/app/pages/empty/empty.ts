import { Component } from '@angular/core';

@Component({
    selector: 'app-empty',
    standalone: true,
    template: ` <div class="card">
        <div class="font-semibold text-xl mb-4">Pagina Vazia</div>
        <p>Usar de exemplo para construção.</p>
    </div>`
})
export class Empty {}
