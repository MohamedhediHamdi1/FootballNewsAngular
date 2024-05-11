import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  private myList: any[] = [];

  getList(): any[] {
    return this.myList;
  }

  setList(list: any[]): void {
    this.myList = list;
  }
  

  constructor() { }
}
