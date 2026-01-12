import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Unauthorized page component
 */
@Component({
    selector: 'app-unauthorized',
    standalone: true,
    imports: [RouterLink],
    template: `
    <div class="unauthorized-container">
      <div class="content">
        <div class="icon">🔒</div>
        <h1>Access Denied</h1>
        <p>You don't have permission to access this resource.</p>
        <p class="subtitle">Please contact your administrator if you believe this is an error.</p>
        <a routerLink="/" class="home-button">Go to Home</a>
      </div>
    </div>
  `,
    styles: [`
    .unauthorized-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      padding: 20px;
    }

    .content {
      text-align: center;
      color: white;
      max-width: 500px;
    }

    .icon {
      font-size: 80px;
      margin-bottom: 24px;
    }

    h1 {
      margin: 0 0 16px 0;
      font-size: 36px;
      font-weight: 700;
    }

    p {
      margin: 0 0 8px 0;
      font-size: 18px;
      opacity: 0.9;
    }

    .subtitle {
      font-size: 14px;
      opacity: 0.7;
      margin-bottom: 32px;
    }

    .home-button {
      display: inline-block;
      padding: 12px 32px;
      background: white;
      color: #f5576c;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .home-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
  `],
})
export class UnauthorizedComponent { }
