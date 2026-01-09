import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-page',
  imports: [],
  templateUrl: './contact-page.html',
})
export default class ContactPage implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Contact Page - Pokemon SSR');
    this.meta.updateTag({name: 'description', content: 'Este es mi Contact Page de mi pagina de Pokemon SSR'});
    this.meta.updateTag({name: 'og:title', content: 'Contact - Pokemon SSR'});
    this.meta.updateTag({name: 'keywords', content: 'contact,pokemon,ssr,Angular,fernando,herrera,curso,seo,PRO'})
  }
}
