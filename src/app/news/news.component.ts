import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewsInterface } from './newsInterface';
import { ServerVariables } from '../Services/ServerVariables';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent {

  constructor(private http: HttpClient,private serverVariables:ServerVariables) {}

  list:NewsInterface[]=[];
  first?:NewsInterface;
  page:number=-1;
  size:number=0;
  seeMore:boolean=false;
  imgUrl=this.serverVariables.ServerIp+"/image/"

  getNewsList(){
    this.page=this.page+1
    interface Myresponse{
      size:number;
      list:NewsInterface[];
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
     this.http.get<Myresponse>(this.serverVariables.ServerIp+'/news/all/'+this.page.toString(),httpOptions)
        .subscribe( response  => {
          if (this.list.length == 0) {
          this.list=this.list.concat(this.changeDate(response.list))
          
            this.first=this.list[0];
            this.list.splice(0, 1); 
          }else{
            this.list=this.list.concat(this.changeDate(response.list))
          }
          this.size=response.size
          if(response.size-(this.page+1)*10>0 ){
            this.seeMore=true
          }else{
            this.seeMore=false
          }
        }, error => {
        });
  }

   changeDate(listToChange : NewsInterface[]): NewsInterface[]{
    const currentDate = new Date();

    listToChange.forEach(item => {
  if (item.date) {
    const itemDate = new Date(item.date.toString());

    if (
      itemDate.getDate() === currentDate.getDate() &&
      itemDate.getMonth() === currentDate.getMonth() &&
      itemDate.getFullYear() === currentDate.getFullYear()
    ) {
      // Same day
      item.date = `اليوم - ${itemDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}`;
    } else {
      // Different day
      item.date = `${itemDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })} - ${itemDate.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}`;
    }
  }
});
  return listToChange;

  }

  ngOnInit(){
    this.getNewsList()
  }



  

}
