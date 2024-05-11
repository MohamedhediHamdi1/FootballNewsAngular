import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerVariables {
  //ServerIp="http://4.204.236.10/api"
  ServerIp="https://api.realmadridspy.com"
  //ServerIp="http://localhost:8083"

  constructor() { }
}
