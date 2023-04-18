import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { HeroService } from '../../core/service/hero.service';
import { Hero } from '../../core/model/hero';

@Component({
  selector: 'app-test-hero-search',
  templateUrl: './test-hero-search.component.html',
  styleUrls: ['./test-hero-search.component.scss']
})
export class TestHeroSearchComponent {

  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}
  
  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHero(term)),
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}
