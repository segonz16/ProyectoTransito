import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PropietarioService {
  private API_SERVER = "http://localhost:8096/api/propietario"

  constructor(private httpClient: HttpClient) { }

  public getPropietarioById(identificacion: any): Observable<any> {
    return this.httpClient.get(this.API_SERVER + "/" + identificacion).pipe(catchError(this.manejarError));
  }

  public getAllPropietario(): Observable<any> {
    return this.httpClient.get(this.API_SERVER + "").pipe(catchError(this.manejarError));
  }

  public savePropietario(propietario: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER + "/save", propietario).pipe(catchError(this.manejarError));
  }

  public updatePropietario(propietario: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER + "/actualizar", propietario).pipe(catchError(this.manejarError));
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
