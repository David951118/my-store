import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imageParent = '';
  showImage = false; // Initialize with a boolean value
  token = '';

  constructor(
    private AuthService: AuthService,
    private UsersService: UsersService,
    private FilesService: FilesService,
  ) {}

  onLoad(img: string) {
    console.log('Log Padre', img);
  }

  toggleImg() {
    this.showImage = !this.showImage;
  }

  createUser() {
    this.UsersService.create({
      name: 'David',
      email: 'david@gmail.com',
      password: 'sodsd',
    }).subscribe((rta) => {
      console.log(rta);
    });
  }

  dowloadPdf(){
    this.FilesService.getFile('newFile', 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf', 'application/pdf')
    .subscribe()
  }

}
