import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Input, Component } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

describe("Heroes Components (deep test)", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    //Has the same classes as the original service
    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero"
    ]);

    HEROES = [
      { id: 1, name: "SpiderDule", strength: 8 },
      { id: 2, name: "SpiderDulex", strength: 8 },
      { id: 3, name: "SpiderDulez", strength: 8 }
    ];

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }], //Long hand provider sintax by telling angular to mock the provider
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it("should render each hero as a HeroComponent", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges(); //this will run on all child components

    let childsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

    //expect(childsDEs.length).toEqual(3);

    //expect(childsDEs[0].componentInstance.hero.name).toEqual(HEROES[0].name);
    for (let i = 0; i < childsDEs.length; i++) {
      expect(childsDEs[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });
});