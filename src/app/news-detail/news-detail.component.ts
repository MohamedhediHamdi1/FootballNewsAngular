import { Component } from '@angular/core';
import { NewsComponent } from '../news/news.component';
import { NewsInterface } from '../news/newsInterface';
import { ServerVariables } from '../Services/ServerVariables';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss'],
})
export class NewsDetailComponent {
  constructor(private serverVariables:ServerVariables,private http: HttpClient,private route: ActivatedRoute,private router:Router){}
  list:NewsInterface[]=[];
  news?:NewsInterface;
  imgUrl=this.serverVariables.ServerIp+"/image/"


  navigation(x:String){
    this.router.navigateByUrl("news/"+x.toString())
  }


  getOne(id:String){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
     this.http.get<NewsInterface>(this.serverVariables.ServerIp+'/news/'+id,httpOptions)
        .subscribe( response  => {
          this.news=response
        }, error => {
          this.router.navigateByUrl("")
        });
  }


  getNewsList(){
    interface Myresponse{
      size:number;
      list:NewsInterface[];
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
     this.http.get<Myresponse>(this.serverVariables.ServerIp+'/news/all/0',httpOptions)
        .subscribe( response  => {
          this.list=this.list.concat(response.list)
          this.changeDate()
          
          
        }, error => {
        });
  }

  changeDate(){
    const currentDate = new Date();

this.list.forEach(item => {
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

  }

  ngOnInit(){
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.getOne(id);
    });
    this.getNewsList()
  }


}
