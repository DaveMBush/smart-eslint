import {
  NgDocSidebarComponent,
  NgDocNavbarComponent,
  NgDocRootComponent,
  NgDocThemeToggleComponent,
} from '@ng-doc/app';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgDocThemeService } from '@ng-doc/app/services/theme';
import { NgDocIconComponent } from '@ng-doc/ui-kit';
import { NgDocTooltipDirective } from '@ng-doc/ui-kit';
import { NgDocButtonIconComponent } from '@ng-doc/ui-kit';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [
    NgDocRootComponent,
    NgDocNavbarComponent,
    RouterLink,
    NgDocThemeToggleComponent,
    NgDocButtonIconComponent,
    NgDocTooltipDirective,
    NgDocIconComponent,
    NgDocSidebarComponent,
    RouterOutlet,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  themeService = inject(NgDocThemeService);

  setTheme() {
    this.themeService.set('auto');
  }
}
