import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { PokemonList } from '../../pokemons/components/pokemon-list/pokemon-list';
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonList, PokemonListSkeleton],
  templateUrl: './pokemons-page.html',
})
export default class PokemonsPage implements OnInit, OnDestroy {
  private title = inject(Title);
  private pokemonService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public currentPage = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)), // si no es númerico transformamos
      map((page) => Math.max(1, page)) // minimo 1 como pagina (eliminamos valores negativos y cero)
    )
  );

  // simulamos la carga de datos y loading de componentes mientras
  // la aplicación esta estable (usando ApplicationRef.isStable observable)
  // public isLoading = signal(true);
  // private appRef = inject(ApplicationRef);
  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //   console.log('Application is stable: ', isStable);
  // })

  // simulamos una carga de datos de 5 segundos
  ngOnInit(): void {
    // console.log('Current Page: ', this.currentPage());
    this.loadPokemons();
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 5000);
  }

  public loadPokemons(page = 0) {
    const pageToLoad = this.currentPage()! + page;

    this.pokemonService
      .loadPage(pageToLoad)
      .pipe(
        tap(() => {
          this.router.navigate([], { queryParams: { page: pageToLoad } });
        }),
        tap(() => {
          this.title.setTitle(`Pokemons SSR - Página ${pageToLoad}`);
        })
      )
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }

  // nos desuscribimos del observable para evitar memory leaks
  ngOnDestroy(): void {
    // this.$appState.unsubscribe();
  }
}
