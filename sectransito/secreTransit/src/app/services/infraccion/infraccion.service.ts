import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InfraccionService {
  private API_SERVER = "http://localhost:8096/api/infraccion"

  constructor(private httpClient: HttpClient) { }

  public getInfracionById(placa: any): Observable<any> {
    return this.httpClient.get(this.API_SERVER + "/" + placa).pipe(catchError(this.manejarError));
  }

  public getInfracionByPropietario(identificacion: any): Observable<any> {
    return this.httpClient.get(this.API_SERVER + "/propietario/" + identificacion).pipe(catchError(this.manejarError));
  }

  public getAllinfracciones(): Observable<any> {
    return this.httpClient.get(this.API_SERVER + "");
  }

  public saveInfraccion(infraccion: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER + "/save", infraccion).pipe(catchError(this.manejarError));
  }

  public updateInfraccion(infraccion: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER + "/actualizar", infraccion).pipe(catchError(this.manejarError));
  }

  private manejarError(error: HttpErrorResponse) {
    let mensajeError = 'Ocurrió un error desconocido';

    if (error.error && error.error.error) {
      mensajeError = error.error.error;
    } else if (error.status === 0) {
      mensajeError = 'No hay conexión con el servidor';
    }

    return throwError(() => new Error(mensajeError));
  }
}
