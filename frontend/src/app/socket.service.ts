import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  
  socket: any;
  constructor() { 
    this.socket = io.connect('http://localhost:5000');
  }

  listen(Eventname: string)
  {
    return new Observable((subscriber)=>{
      this.socket.on(Eventname, (data: any)=>{
        subscriber.next(data);
      })
    })
  }

}
