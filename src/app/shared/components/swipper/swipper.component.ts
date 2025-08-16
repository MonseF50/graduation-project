import { Slider } from 'primeng/slider';
import { Autoplay } from 'swiper/modules';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { register, SwiperContainer } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';
register();

@Component({
  selector: 'app-swipper',
  standalone: true,
  templateUrl: './swipper.component.html',
  styleUrls: ['./swipper.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SwipperComponent implements AfterViewInit {
  @ViewChild('swiperRef') swiperRef!: ElementRef<SwiperContainer>;

  ngAfterViewInit() {
    const swiperEl = this.swiperRef.nativeElement;
    swiperEl.initialize();
  }

  slidePrev() {
    this.swiperRef.nativeElement.swiper.slidePrev();
  }

  slideNext() {
    this.swiperRef.nativeElement.swiper.slideNext();
  }
}
