import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { NewsComponent } from './news/news.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { ResultesComponent } from './resultes/resultes.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { StandingsComponent } from './standings/standings.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { DmcaComponent } from './dmca/dmca.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path:"",component:NewsComponent},
  {path:"news",children:[
    {path:":id",component:NewsDetailComponent},
  ]},
  {path:"نتائج",component:ResultesComponent},
  {path:"مباريات",component:FixturesComponent},
  {path:"الترتيب",component:StandingsComponent},
  {path:"الخصوصية",component:PrivacyPolicyComponent},
  {path:"اتصل-بنا",component:ContactComponent},
  {path:"من-نحن",component:AboutUsComponent},
  {path:"حقوق-الملكية",component:DmcaComponent},
  {path:"owner",component:AdminComponent},
  { path: "**", redirectTo:"" },
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
