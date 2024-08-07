import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new BehaviorSubject<string>('');
  message$ = this.messageSubject.asObservable();

  showMessage(message: string, duration: number = 3000): void {
    this.messageSubject.next(message);
    setTimeout(() => this.messageSubject.next(''), duration);
  }
}
