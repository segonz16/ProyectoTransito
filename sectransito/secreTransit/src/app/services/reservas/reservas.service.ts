import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private API_SERVER = "http://localhost:9000/api/gestionreserva/"

  constructor(private httpClient: HttpClient) { }

  public getreservaById(documento: any): Observable<any> {
    return this.httpClient.get(this.API_SERVER + documento);
  }

  public getAllreservas(): Observable<any> {
    return this.httpClient.get(this.API_SERVER + "reservas");
  }

  public savereserva(reserva: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER + "guardar", reserva);
  }

  public deletereserva(id: any): Observable<any> {
    return this.httpClient.delete(this.API_SERVER + "eliminarreserva/" + id);
  }

  public updatereserva(reserva: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER + "reservas/actualizar", reserva);
  }


}
