import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  public headers = new HttpHeaders({​​​​ 'Content-Type': 'text/xml' }​​​​).set('Accept', 'text/xml');

  constructor(private https: HttpClient) { }
  pushFileToStorage(file: File, fileName:string): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();

    data.append('file', file);
    data.append('fileName', fileName)

    const newRequest = new HttpRequest('POST', 'http://ec2-52-14-55-223.us-east-2.compute.amazonaws.com:8080/cars.svc/savefile', data, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.https.request(newRequest);
  }
  getMetadata(){
    return this.https.get("http://ec2-52-14-55-223.us-east-2.compute.amazonaws.com:8080/cars.svc/metadataFetch",{responseType:'text'});
   
  }
  getProducts(){
    return this.https.get("http://ec2-52-14-55-223.us-east-2.compute.amazonaws.com:8080/cars.svc/urls");

  }
}
