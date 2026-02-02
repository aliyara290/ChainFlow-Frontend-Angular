import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, User, Settings, LogOut, ChevronDown } from 'lucide-angular';
import {AuthService} from '../../auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isDropdownOpen = false;
  userName = 'Ali Yara';
  userRole = 'Administrator';

  constructor(private authService: AuthService) {
  }

  userIcon = User;
  settingsIcon = Settings;
  logOutIcon = LogOut;
  chevronDownIcon = ChevronDown;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  onUpdateProfile(): void {
    this.closeDropdown();
    console.log('Update profile clicked');
  }

  onSettings(): void {
    this.closeDropdown();
    console.log('Settings clicked');
  }

  onLogout(): void {
    this.closeDropdown();
    this.authService.logout();
  }

  getWelcomeMessage(): string {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Good Morning';
    } else if (hour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }
}
