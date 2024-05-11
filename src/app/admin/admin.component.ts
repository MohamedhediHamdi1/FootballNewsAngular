import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ServerVariables } from '../Services/ServerVariables';
import { NewsInterface } from '../news/newsInterface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(private http: HttpClient,private serverVariables:ServerVariables) {}

  list:NewsInterface[]=[];
  first?:NewsInterface;
  page:number=-1;
  size:number=0;
  seeMore:boolean=false;
  imgUrl=this.serverVariables.ServerIp+"/image/"
  isLogin=false

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







  selectedFile?: File;

  title: string = ''
  description: string = ''
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    //this.onSubmit()
  }

  

  postData(x:String) {
    const data = {
      title: this.title,
      description: this.description,
      image: x
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post(this.serverVariables.ServerIp+"/news", data,httpOptions).subscribe(
      (response) => {
        alert("done")
        
      },
      (error) => {
        alert("error")
      }
    );
  }



  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.selectedFile!);

    this.http.post(this.serverVariables.ServerIp+"/image", formData,{ responseType: 'text' }).subscribe(
      (response) => {
        this.postData(response);
      },
      (error) => {
        alert("error uploading image")
      }
    );
  }

username=""
password=""

  login(){
   if(this.password.length>10 && this.username.length>3){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
     this.http.get(this.serverVariables.ServerIp+'/admin/'+this.username+"/"+this.password,httpOptions)
        .subscribe( response  => {
          this.isLogin=true
        }, error => {
          this.isLogin=false
          alert("error")
        });
  }
   }


   delete(id:String){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
     this.http.get<NewsInterface>(this.serverVariables.ServerIp+'/news/delete/'+id,httpOptions)
        .subscribe( response  => {
          alert("Deleted")
        }, error => {
          alert("error")
        });
  }

}
