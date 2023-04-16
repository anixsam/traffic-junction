import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http : HttpClient
  ) { }

  sendImage(image : any) : Observable<any> {
    const blob = this.base64ToBlob(image);
    const file = new File([blob],"image.jpg",{type:'jpg'});
    const formData = new FormData();
    formData.append('data', file);
    
    return this.http.post('http://localhost:4000/recognize',formData);
  }

  private base64ToBlob(image: string)
  {
    const byteString = atob(image.split(',')[1]);
    const array = [];
    for (let i = 0; i < byteString.length; i++) {
      array.push(byteString.charCodeAt(i));
    }

    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  }
}
