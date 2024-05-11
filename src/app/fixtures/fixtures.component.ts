import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ServerVariables } from '../Services/ServerVariables';
import { Fixtures_Interface } from './Fixtures_Interface';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.scss']
})
export class FixturesComponent {
  constructor(private http: HttpClient,private serverVariables:ServerVariables) {}
  list:Fixtures_Interface[]=[];

  getResults(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
     this.http.get<Fixtures_Interface[]>(this.serverVariables.ServerIp+'/all/fixtures',httpOptions)
        .subscribe( response  => {
         this.list=response
        }, error => {
        });
  }
  ngOnInit(){
    this.getResults()
  }
}
