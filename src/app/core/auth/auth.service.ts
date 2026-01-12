import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { from, Observable, catchError, of, tap, switchMap } from 'rxjs';
import { UserProfile, AuthState } from './auth.models';

/**
 * Authentication service using Keycloak's built-in token management
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly keycloak = inject(KeycloakService);
  private readonly router = inject(Router);

  // Authentication state signals
  private _isAuthenticated = signal<boolean>(false);
  private _user = signal<UserProfile | null>(null);
  private _loading = signal<boolean>(false);

  // Public computed signals
  public isAuthenticated = this._isAuthenticated.asReadonly();
  public user = this._user.asReadonly();
  public loading = this._loading.asReadonly();

  // Computed auth state
  public authState = computed<AuthState>(() => ({
    isAuthenticated: this._isAuthenticated(),
    user: this._user(),
    loading: this._loading(),
  }));

  constructor() {
    // Initialize auth state on service creation
    this.initializeAuthState();
  }

  /**
   * Initiate login flow via Keycloak
   */
  async login(redirectUri?: string): Promise<void> {
    const uri = redirectUri || window.location.origin;
    await this.keycloak.login({
      redirectUri: uri,
    });
  }

  /**
   * Logout user and clear session
   */
  async logout(): Promise<void> {
    this._loading.set(true);

    try {
      // Clear local state
      this._isAuthenticated.set(false);
      this._user.set(null);

      // Logout from Keycloak
      await this.keycloak.logout(window.location.origin);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      this._loading.set(false);
    }
  }

  /**
   * Get user profile from Keycloak
   */
  getUserProfile(): Observable<UserProfile> {
    return from(this.keycloak.loadUserProfile()).pipe(
      switchMap((profile) => {
        const userProfile: UserProfile = {
          id: profile.id || '',
          username: profile.username || '',
          email: profile.email || '',
          firstName: profile.firstName,
          lastName: profile.lastName,
          emailVerified: profile.emailVerified,
          roles: this.getUserRoles(),
        };
        return of(userProfile);
      })
    );
  }

  /**
   * Get user roles from Keycloak token
   */
  getUserRoles(): string[] {
    try {
      return this.keycloak.getUserRoles();
    } catch (error) {
      console.error('Failed to get user roles:', error);
      return [];
    }
  }

  /**
   * Check if user has a specific role
   */
  hasRole(role: string): boolean {
    return this.keycloak.isUserInRole(role);
  }

  /**
   * Check if user has any of the specified roles
   */
  hasAnyRole(roles: string[]): boolean {
    return roles.some((role) => this.hasRole(role));
  }

  /**
   * Get access token from Keycloak
   */
  async getAccessToken(): Promise<string> {
    try {
      return await this.keycloak.getToken();
    } catch (error) {
      console.error('Failed to get access token:', error);
      return '';
    }
  }

  /**
   * Update access token (refresh if needed)
   */
  async updateToken(minValidity: number = 30): Promise<boolean> {
    try {
      return await this.keycloak.updateToken(minValidity);
    } catch (error) {
      console.error('Token update failed:', error);
      await this.logout();
      return false;
    }
  }

  /**
   * Check if user is logged in
   */
  async isLoggedIn(): Promise<boolean> {
    return await this.keycloak.isLoggedIn();
  }

  /**
   * Initialize authentication state on app startup
   */
  private async initializeAuthState(): Promise<void> {
    try {
      const isLoggedIn = await this.keycloak.isLoggedIn();
      this._isAuthenticated.set(isLoggedIn);

      if (isLoggedIn) {
        this.loadUserProfile().subscribe();
      }
    } catch (error) {
      console.error('Failed to initialize auth state:', error);
      this._isAuthenticated.set(false);
    }
  }

  /**
   * Load user profile from Keycloak
   */
  private loadUserProfile(): Observable<boolean> {
    return this.getUserProfile().pipe(
      tap((profile) => this._user.set(profile)),
      switchMap(() => of(true)),
      catchError((error) => {
        console.error('Failed to load user profile:', error);
        return of(false);
      })
    );
  }
}
