import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-page',
  imports: [],
  templateUrl: './pricing-page.html',
})
export default class PricingPage implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);
  ngOnInit(): void {
    this.title.setTitle('Pricing Page - Pokemon SSR');
    this.meta.updateTag({name: 'description', content: 'Este es mi Pricing Page de mi pagina de Pokemon SSR'});
    this.meta.updateTag({name: 'og:title', content: 'Pricing - Pokemon SSR'});
    this.meta.updateTag({name: 'keywords', content: 'pricing,pokemon,ssr,Angular,fernando,herrera,curso,seo,PRO'})

  }
}
