import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imageParent = '';
  showImage = false; // Initialize with a boolean value

  onLoad(img: string) {
    console.log('Log Padre', img);
  }

  toggleImg() {
    this.showImage = !this.showImage;
  }
}
