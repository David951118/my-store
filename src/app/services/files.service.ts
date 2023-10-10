import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(
    private http: HttpClient
  ) { }

  getFile(name: string, url: string, type: string){
    return this.http.get(url, {responseType: 'blob'})
    .pipe(
      tap(content => {
        const blop = new Blob([content], {type})
        saveAs(blop, name);
      }),
      map(()=> true)
    )
  }
}
