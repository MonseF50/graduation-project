import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { SharedProductsComponent } from "../../shared/components/shared-products/shared-products.component";
@Component({
  selector: 'app-porducts',
  imports: [SharedProductsComponent],
  templateUrl: './porducts.component.html',
  styleUrl: './porducts.component.scss'
})
export class PorductsComponent implements OnInit {
  ngOnInit(): void {
    AOS.init();
  }
}
