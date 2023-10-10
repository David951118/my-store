import { Component } from '@angular/core';

import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  activeMenu = false;
  counter = 0;
  token = '';
  profile: User | null = null;

  constructor(
    private storeService: StoreService,
    private AuthService: AuthService
  ) {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {
    this.storeService.mYCart$.subscribe((products) => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.AuthService.logIn('mor_2314', '83r5^_').subscribe((rta) => {
      console.log('token',rta.token);
      this.token = rta.token;
      this.getProfile()
    });
  }

  getProfile() {
    this.AuthService.profile(this.token).subscribe((profile) => {
      this.profile = profile;
    });
  }
}
