import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as decode from 'jwt-decode';
import { AuthService } from 'src/app/core/services/auth/auth.service';

declare const $: any;

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.css']
})
export class SideNavigationComponent implements OnInit {

  username: string;
  isAdmin: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    $('#side-menu').metisMenu();
    this.username = localStorage.getItem('currentUserName');
    this.isAdmin = this.checkPermission();
  }

  /* check current user permission */
  checkPermission(): boolean {
    const token = localStorage.getItem('currentUserToken');
    const tokenPayload: any = decode(token);
    const role = tokenPayload.userRole;
    return role === 'admin' ? true : false;
  }

  /* verify active route */
  activeRoute(routename: string): boolean {
    return (this.router.url.toString() === routename);
  }

  /* logout */
  logout(): void {
    this.authService.logout();
  }

}
