import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalonesService {

  private API_SERVER = "http://localhost:9000/api/salones/"

  constructor(private httpClient: HttpClient) { }

  public getsalonById(documento: any): Observable<any> {
    return this.httpClient.get(this.API_SERVER + documento);
  }

  public getAllsalones(): Observable<any> {
    return this.httpClient.get(this.API_SERVER + "salones");
  }

  public savesalon(salon: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER + "guardar", salon);
  }

  public deletesalon(id: any): Observable<any> {
    return this.httpClient.delete(this.API_SERVER + "eliminarsalon/" + id);
  }

  public updatesalon(salon: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER + "salon/actualizar", salon);
  }

}
