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

  it(`should call heroSerivice.deleteHero when hero component delete button is clicked`, () => {
    spyOn(fixture.componentInstance, "delete"); //find the delete method and watch it
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );

    // (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined); //tell the child component to emit the delete event
    heroComponents[0].triggerEventHandler("delete", null);
    // heroComponents[0]
    //   .query(By.css("button"))
    //   .triggerEventHandler("click", { stopPropagation: () => {} });

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it(`should add a new hero to the list when the add button is clicked`, () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const name = "Mr.Hero";

    mockHeroService.addHero.and.returnValue(of({ id: 4, name, strength: 4 }));
    const inputElement = fixture.debugElement.query(By.css("input"))
      .nativeElement;

    const addButton = fixture.debugElement.queryAll(By.css("button"))[0];

    inputElement.value = name;

    addButton.triggerEventHandler("click", null);

    fixture.detectChanges();

    const heroText = fixture.debugElement.query(By.css("ul")).nativeElement
      .textContent;

    expect(heroText).toContain(name);
  });
});
