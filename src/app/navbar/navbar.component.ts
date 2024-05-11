import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router : Router) {
    document.addEventListener('click', (event) => this.closeMenu(event));
}
  menu: boolean = false;
  closeMenu(event: Event) {
    if (!(event.target as HTMLElement).closest('.menu_content') && this.menu) {
        this.menu = false;
    }
}
openMenu(){
  setTimeout(() => {
    this.menu = true;
}, 500);
}



ngOnDestroy() {
  document.removeEventListener('click', this.closeMenu);
}


}
