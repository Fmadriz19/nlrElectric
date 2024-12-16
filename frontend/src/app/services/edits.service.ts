import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditsService {
  private idSource = new BehaviorSubject<number>(0); 
  currentId = this.idSource.asObservable();

  changeId(id: number) {
    this.idSource.next(id); // Emitir el nuevo ID
  }
}
