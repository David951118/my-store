import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent {
  img: string = '';
  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
  }
  @Input() alt = '';
  @Output() loaded = new EventEmitter<string>();
  imageDefault = 'https://www.m2crowd.com/core/i/placeholder.png';

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    this.loaded.emit(this.img);
  }
}
