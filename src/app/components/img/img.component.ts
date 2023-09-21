import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent {
  @Input()
  set img(newImg: string) {
    this.img = newImg;
    console.log('change imag');
  }
  @Input() alt = '';
  @Output() loaded = new EventEmitter<string>();
  imageDefault = 'https://www.m2crowd.com/core/i/placeholder.png';

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    console.log('Imagen cargada hijo');
    this.loaded.emit(this.img);
  }
}
