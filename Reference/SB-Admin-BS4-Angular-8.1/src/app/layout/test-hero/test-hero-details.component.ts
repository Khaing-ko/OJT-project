import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../core/model/hero';
import { HeroService } from '../../core/service/hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-test-hero-details',
  templateUrl: './test-hero-details.component.html',
  styleUrls: ['./test-hero-details.component.scss']
})
export class TestHeroDetailsComponent {

  hero: Hero | undefined;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }



  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
}
