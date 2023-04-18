import { Component } from '@angular/core';
import { Hero } from '../../core/model/hero';
import { HeroService } from '../../core/service/hero.service';
import { MessageService } from '../../core/service/message.service';

@Component({
  selector: 'app-test-hero-list',
  templateUrl: './test-hero-list.component.html',
  styleUrls: ['./test-hero-list.component.scss']
})
export class TestHeroListComponent {

  public saveUrl = 'http://localhost:3600/api/FileService/Upload/Temp';
  public removeUrl = 'http://localhost:3600/api/FileService/Upload/TempRemove';
  public uploadComplete = false;
  public fileName = '';

  heroes: Hero[] = [];
  selectedHero?: Hero;
  
  constructor(private heroService: HeroService, private messageService: MessageService) {

  }
  public restrictions = {
    allowedExtensions: ['.jpg', '.png', '.gif'],
    maxFileSize: 1000000
  };


  public onRemove(e): void {
    console.log('File removed:', e);
  }

  public onSuccess(e): void {
    console.log('File uploaded:', e);
    this.uploadComplete = true;
    this.fileName = e.files[0].name;
  }

  public onUpload(e): void {
    console.log('File upload initiated:', e);
  }

  public moveFile(): void {
    console.log('Moving file:', this.fileName);
    // make a request to move the file to the specified location
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.Id).subscribe();
  }

}

