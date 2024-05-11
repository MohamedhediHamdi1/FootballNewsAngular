import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ServerVariables } from '../Services/ServerVariables';
import { Standing_Interface } from './Standing_Interface';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent {

  constructor(private http: HttpClient,private serverVariables:ServerVariables) {}
  list:Standing_Interface[]=[];

  getResults(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
     this.http.get<Standing_Interface[]>(this.serverVariables.ServerIp+'/all/standings',httpOptions)
        .subscribe( response  => {
          console.log(response)
         this.list=response
        }, error => {
        });
  }
  ngOnInit(){
    this.getResults()
  }


}
