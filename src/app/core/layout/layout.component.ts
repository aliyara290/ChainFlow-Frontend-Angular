import { Component } from '@angular/core';
import {SidebarComponent} from './sidebar/sidebar.component';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './header/header.component';

@Component({
  selector: 'app-layout',
  imports: [
    SidebarComponent,
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {

}
