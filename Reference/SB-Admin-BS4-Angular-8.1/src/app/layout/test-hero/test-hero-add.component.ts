import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from '../../core/service/hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-test-hero-add',
  templateUrl: './test-hero-add.component.html',
  styleUrls: ['./test-hero-add.component.scss']
})
export class TestHeroAddComponent {

  heroAdd: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.heroAdd = new FormGroup({
      Name: new FormControl(''),
      Age: new FormControl(''),
      Address: new FormControl('')
    });
  }


  submitCustomer(): void {
    this.heroService.addHero(this.heroAdd.value)
      .subscribe(rescustomer => {
        this.router.navigate(['/test-hero']);
      });
  }

  goBack(): void {
    this.location.back();
  }
}
