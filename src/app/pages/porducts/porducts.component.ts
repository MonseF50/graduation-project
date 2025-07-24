import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import 'aos/dist/aos.css';
@Component({
  selector: 'app-porducts',
  imports: [],
  templateUrl: './porducts.component.html',
  styleUrl: './porducts.component.scss'
})
export class PorductsComponent implements OnInit {
  ngOnInit(): void {
    AOS.init();
  }
}
