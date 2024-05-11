import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { NewsComponent } from './news/news.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { ResultesComponent } from './resultes/resultes.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { StandingsComponent } from './standings/standings.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { DmcaComponent } from './dmca/dmca.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { LoadingInterceptorService } from './Services/loading-interceptor.service';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    BodyComponent,
    NewsComponent,
    NewsDetailComponent,
    ResultesComponent,
    FixturesComponent,
    StandingsComponent,
    PrivacyPolicyComponent,
    DmcaComponent,
    ContactComponent,
    AboutUsComponent,
    LoadingScreenComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
