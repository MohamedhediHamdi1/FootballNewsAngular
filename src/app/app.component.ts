import { Component } from '@angular/core';
import { LoadingServiceService } from './Services/loading-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ريال مدريد سباي';
  constructor(public loadingService: LoadingServiceService){}
}
