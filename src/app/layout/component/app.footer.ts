import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        SBTM
        <a href="https://intranet.6rm.eb.mil.br" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">6RM</a>
    </div>`
})
export class AppFooter {}
