import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, ChartLine, Package, ShoppingCart, Box, Settings, FileText, Users, User, ShoppingBag, Car, Truck } from 'lucide-angular';
import {
  SupplierListComponent
} from '../../../features/supply/suppliers/components/supplier-list/supplier-list.component';

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
      label: 'Dashboard',
      icon: ChartLine,
      expanded: false,
      route: '/dashboard'
    },
    {
      label: 'Supply',
      icon: Package,
      expanded: false,
      children: [
        { label: 'Suppliers', icon: Users, route: '/dashboard/suppliers' },
        { label: 'Materials', icon: Box, route: '/dashboard/supply/materials' },
        { label: 'Orders', icon: ShoppingCart, route: '/dashboard/supply/orders' }
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
        { label: 'Customers', icon: User, route: '/dashboard/customer/customers' },
        { label: 'Orders', icon: ShoppingBag, route: '/dashboard/customer/orders' },
        { label: 'Deliveries', icon: Package, route: '/dashboard/customer/deliveries' },
        { label: 'Drivers', icon: User, route: '/dashboard/customer/drivers' },
        { label: 'Vehicles', icon: Truck, route: '/dashboard/customer/vehicles' }
      ]
    }
  ];

  toggleExpand(item: NavItem): void {
    if (item.children) {
      item.expanded = !item.expanded;
    }
  }
}
