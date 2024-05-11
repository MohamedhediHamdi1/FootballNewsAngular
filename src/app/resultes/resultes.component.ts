import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ServerVariables } from '../Services/ServerVariables';
import { Results_Interface } from './Results_Interface';

@Component({
  selector: 'app-resultes',
  templateUrl: './resultes.component.html',
  styleUrls: ['./resultes.component.scss']
})
export class ResultesComponent {
  constructor(private http: HttpClient,private serverVariables:ServerVariables) {}
  list:Results_Interface[]=[];

  getResults(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
     this.http.get<Results_Interface[]>(this.serverVariables.ServerIp+'/all/results',httpOptions)
        .subscribe( response  => {
         this.list=response
        }, error => {
        });
  }
  ngOnInit(){
    this.getResults()
  }
}
