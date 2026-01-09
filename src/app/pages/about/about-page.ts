import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-page',
  imports: [],
  templateUrl: './about-page.html',
})
export default class AboutPage implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('About Page - Pokemon SSR');
    this.meta.updateTag({name: 'description', content: 'Este es mi About page de mi pagina de Pokemon SSR'});
    this.meta.updateTag({name: 'og:title', content: 'About - Pokemon SSR'});
    this.meta.updateTag({name: 'keywords', content: 'about,pokemon,ssr,Angular,fernando,herrera,curso,seo,PRO'})
  }
}
