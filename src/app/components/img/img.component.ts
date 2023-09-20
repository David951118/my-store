import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  AfterViewInit,
  OnInit,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() img: string = 'texto aleatorio';
  @Output() loaded = new EventEmitter<string>();
  imageDefault = 'https://www.m2crowd.com/core/i/placeholder.png';
  counter = 0;

  constructor() {
    console.log('constructor,', 'imgValue=>', this.img);
  }

  ngOnChanges() {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log('onChanges,', 'imgValue=>', this.img);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('onInit,', 'imgValue=>', this.img);
    window.setInterval(() => {
      this.counter += 1;
      console.log('run counter')
    }, 1000)
  }

  ngAfterViewInit(): void {
    console.log('AfterViewInit,', 'imgValue=>', this.img);
  }

  ngOnDestroy(): void {
    console.log('Destroy,', 'imgValue=>', this.img);
  }

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    console.log('Imagen cargada hijo');
    this.loaded.emit(this.img);
  }
}
