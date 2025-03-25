import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private API_SERVER = "http://localhost:8096/api/"

  constructor(private httpClient: HttpClient) { }

  public getVehiculoById(placa: any): Observable<any> {
    return this.httpClient.get(this.API_SERVER + "matricula/" + placa).pipe(catchError(this.manejarError));
  }

  public getAllVehiculos(): Observable<any> {
    return this.httpClient.get(this.API_SERVER + "vehiculos").pipe(catchError(this.manejarError));
  }

  public getAllMatricula(): Observable<any> {
    return this.httpClient.get(this.API_SERVER + "matricula").pipe(catchError(this.manejarError));
  }

  public saveVehiculo(reserva: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER + "matricula/save", reserva).pipe(catchError(this.manejarError));
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
