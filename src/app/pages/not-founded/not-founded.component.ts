import { Component } from '@angular/core';
import { NavbarComponent } from "../../layouts/navbar/navbar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-founded',
  imports: [NavbarComponent, RouterLink],
  templateUrl: './not-founded.component.html',
  styleUrl: './not-founded.component.scss'
})
export class NotFoundedComponent {

}
