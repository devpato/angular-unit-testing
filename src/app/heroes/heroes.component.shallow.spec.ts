import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Input, Component } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";

describe("Heroes Components (shallow test)", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  @Component({
    selector: "app-hero",
    template: "./hero.component.html"
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
    //@Output() delete = new EventEmitter();
  }

  beforeEach(() => {
    //Has the same classes as the original service
    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero"
    ]);

    HEROES = [
      { id: 1, name: "SpiderDule", strength: 8 },
      { id: 2, name: "SpiderDule", strength: 8 },
      { id: 3, name: "SpiderDule", strength: 8 }
    ];

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, FakeHeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }] //Long hand provider sintax by telling angular to mock the provider
      // schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  //Test a component that has a service and a child component
  it("should set heroes correctly from the service", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges(); //run this to trigger the ngOnit()

    expect(fixture.componentInstance.heroes.length).toBe(3);
  });

  //Delign with list elements (integration test)
  it("should create one li fo reach hero", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges(); //run this to trigger the ngOnit()

    let list = fixture.debugElement.queryAll(By.css("li")).length;
    expect(list).toBe(3);
  });
});
