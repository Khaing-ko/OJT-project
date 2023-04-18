import { Component } from '@angular/core';
import { Hero } from '../../core/model/hero';
import { HeroService } from '../../core/service/hero.service';
import { MessageService } from '../../core/service/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent {
  heroes: Hero[] = [];
  selectedHero?: Hero;
  
  constructor(private heroService: HeroService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    const HeroName = name.trim();
    if (!HeroName) { return; }
    this.heroService.addHero({ Name: HeroName } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.Id).subscribe();
  }

  search(name: string): void {
    if (!name) { return this.getHeroes(); }
    this.heroService.searchHero(name)    
        .subscribe(heroes => this.heroes = heroes);
  }

}
