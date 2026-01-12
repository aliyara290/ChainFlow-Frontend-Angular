import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';

/**
 * Example dashboard component demonstrating authentication usage
 * This is a reference implementation showing how to use the auth service
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <!-- Header with user info -->
      <header class="dashboard-header">
        <div class="user-info">
          <div class="avatar">
            {{ (user()?.username || 'U').charAt(0).toUpperCase() }}
          </div>
          <div class="user-details">
            <h2>{{ user()?.firstName }} {{ user()?.lastName }}</h2>
            <p>{{ user()?.email }}</p>
          </div>
        </div>
        <button class="logout-btn" (click)="logout()">
          Logout
        </button>
      </header>

      <!-- Main content -->
      <main class="dashboard-content">
        <h1>Welcome to Supply Chain System</h1>

        <!-- User roles -->
        <div class="info-card">
          <h3>Your Roles</h3>
          <div class="roles">
            <span
              *ngFor="let role of user()?.roles"
              class="role-badge">
              {{ role }}
            </span>
            <span *ngIf="!user()?.roles?.length" class="no-roles">
              No roles assigned
            </span>
          </div>
        </div>

        <!-- Role-based content -->
        <div class="info-card" *ngIf="isAdmin">
          <h3>Admin Panel</h3>
          <p>You have administrative access to the system.</p>
        </div>

        <!-- Authentication state -->
        <div class="info-card">
          <h3>Authentication Status</h3>
          <div class="status-grid">
            <div class="status-item">
              <span class="label">Authenticated:</span>
              <span class="value" [class.success]="isAuthenticated()">
                {{ isAuthenticated() ? 'Yes' : 'No' }}
              </span>
            </div>
            <div class="status-item">
              <span class="label">Email Verified:</span>
              <span class="value" [class.success]="user()?.emailVerified">
                {{ user()?.emailVerified ? 'Yes' : 'No' }}
              </span>
            </div>
            <div class="status-item">
              <span class="label">User ID:</span>
              <span class="value">{{ user()?.id }}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      padding: 20px 30px;
      border-radius: 12px;
      margin-bottom: 30px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: 700;
    }

    .user-details h2 {
      margin: 0;
      font-size: 18px;
      color: #1a202c;
    }

    .user-details p {
      margin: 4px 0 0 0;
      font-size: 14px;
      color: #718096;
    }

    .logout-btn {
      padding: 10px 24px;
      background: #f56565;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .logout-btn:hover {
      background: #e53e3e;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(245, 101, 101, 0.3);
    }

    .dashboard-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-content h1 {
      color: white;
      font-size: 36px;
      margin-bottom: 30px;
      text-align: center;
    }

    .info-card {
      background: white;
      padding: 24px;
      border-radius: 12px;
      margin-bottom: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .info-card h3 {
      margin: 0 0 16px 0;
      font-size: 20px;
      color: #1a202c;
    }

    .roles {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .role-badge {
      padding: 6px 12px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
    }

    .no-roles {
      color: #a0aec0;
      font-style: italic;
    }

    .status-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
    }

    .status-item {
      display: flex;
      justify-content: space-between;
      padding: 12px;
      background: #f7fafc;
      border-radius: 8px;
    }

    .label {
      font-weight: 600;
      color: #4a5568;
    }

    .value {
      color: #718096;
    }

    .value.success {
      color: #48bb78;
      font-weight: 600;
    }
  `],
})
export class DashboardComponent {
  private readonly authService = inject(AuthService);

  // Expose auth signals to template
  isAuthenticated = this.authService.isAuthenticated;
  user = this.authService.user;
  loading = this.authService.loading;

  // Check if user is admin
  get isAdmin(): boolean {
    return this.authService.hasRole('admin');
  }

  logout(): void {
    this.authService.logout();
  }
}
