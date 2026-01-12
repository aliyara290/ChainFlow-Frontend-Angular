import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';

/**
 * Login page component
 */
@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="login-container">
      <div class="login-card">
        <h1>Supply Chain System</h1>
        <p class="subtitle">Secure Authentication with Keycloak</p>

        <button
          class="login-button"
          (click)="login()"
          [disabled]="loading()">
          {{ loading() ? 'Redirecting...' : 'Sign In' }}
        </button>

        <p class="info-text">
          You will be redirected to Keycloak for secure authentication
        </p>
      </div>
    </div>
  `,
    styles: [`
    .login-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .login-card {
      background: white;
      border-radius: 16px;
      padding: 48px 40px;
      max-width: 400px;
      width: 100%;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      text-align: center;
    }

    h1 {
      margin: 0 0 8px 0;
      font-size: 28px;
      font-weight: 700;
      color: #1a202c;
    }

    .subtitle {
      margin: 0 0 32px 0;
      font-size: 14px;
      color: #718096;
    }

    .login-button {
      width: 100%;
      padding: 14px 24px;
      font-size: 16px;
      font-weight: 600;
      color: white;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-bottom: 16px;
    }

    .login-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
    }

    .login-button:active:not(:disabled) {
      transform: translateY(0);
    }

    .login-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .info-text {
      margin: 0;
      font-size: 12px;
      color: #a0aec0;
    }
  `],
})
export class LoginComponent {
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
