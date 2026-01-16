import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Package, ShoppingCart, Box, Settings, FileText, Users, User, ShoppingBag, Car, Truck } from 'lucide-angular';

interface NavItem {
  label: string;
  icon: any;
  route?: string;
  children?: NavItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  navItems: NavItem[] = [
    {
      label: 'Supply',
      icon: Package,
      expanded: false,
      children: [
        { label: 'List', icon: FileText, route: '/supply/list' },
        { label: 'Orders', icon: ShoppingCart, route: '/supply/orders' },
        { label: 'Raw Material', icon: Box, route: '/supply/raw-material' }
      ]
    },
    {
      label: 'Production',
      icon: Settings,
      expanded: false,
      children: [
        { label: 'Products', icon: Package, route: '/production/products' },
        { label: 'Production Orders', icon: FileText, route: '/production/orders' },
        { label: 'BOM', icon: FileText, route: '/production/bom' }
      ]
    },
    {
      label: 'Customer',
      icon: Users,
      expanded: false,
      children: [
        { label: 'Customers', icon: User, route: '/customer/customers' },
        { label: 'Orders', icon: ShoppingBag, route: '/customer/orders' }
      ]
    },
    {
      label: 'Drivers',
      icon: Car,
      route: '/drivers'
    },
    {
      label: 'Vehicles',
      icon: Truck,
      route: '/vehicles'
    }
  ];

  toggleExpand(item: NavItem): void {
    if (item.children) {
      item.expanded = !item.expanded;
    }
  }
}
