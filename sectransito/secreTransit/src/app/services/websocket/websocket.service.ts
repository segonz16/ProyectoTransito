import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient!: Client;
  private vehiculoSubject = new Subject<any>();
  private propietarioSubject = new Subject<any>();
  private infraccionSubject = new Subject<any>();

  constructor() {
    this.connect();
  }

  private connect() {
    const socket = new SockJS('http://localhost:8096/transit-socket');
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('Conectado a WebSocket');

        this.stompClient.subscribe('/topic/vehiculos', message => {
          this.vehiculoSubject.next(JSON.parse(message.body));

        });

        this.stompClient.subscribe('/topic/propietarios', message => {
          this.propietarioSubject.next(JSON.parse(message.body));
        });

        this.stompClient.subscribe('/topic/infracciones', message => {
          this.infraccionSubject.next(JSON.parse(message.body));
        });
      }
    });

    this.stompClient.activate();
  }

  getVehiculoObservable() {
    return this.vehiculoSubject.asObservable();
  }

  getPropietarioObservable() {
    return this.propietarioSubject.asObservable();
  }

  getInfraccionObservable() {
    return this.infraccionSubject.asObservable();
  }
}
