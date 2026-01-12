import {Component, inject} from '@angular/core';
import {AuthService} from '../../../../../core/auth';

@Component({
  selector: 'app-auth-card',
  imports: [],
  templateUrl: './auth-card.component.html',
  styleUrl: './auth-card.component.css',
})
export class AuthCardComponent {
  private readonly authService = inject(AuthService);

  loading = this.authService.loading;

  login(): void {
    // Store current URL for redirect after login
    const currentUrl = window.location.pathname;
    if (currentUrl !== '/login') {
      sessionStorage.setItem('auth_redirect_url', currentUrl);
    }

    this.authService.login();
  }
}
