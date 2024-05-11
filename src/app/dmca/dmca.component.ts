import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dmca',
  templateUrl: './dmca.component.html',
  styleUrls: ['./dmca.component.scss']
})
export class DmcaComponent {

  constructor(private router:Router){}
  gotocontactus(){
    this.router.navigateByUrl("اتصل-بنا")
  }

}
