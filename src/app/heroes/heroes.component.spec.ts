import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs";

describe("Heroes component", () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: "SpiderDule", strength: 8 },
      { id: 2, name: "SpiderDule", strength: 8 },
      { id: 3, name: "SpiderDule", strength: 8 }
    ];

    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero"
    ]);

    component = new HeroesComponent(mockHeroService);
  });

  describe("delete", () => {
    it("should remove the indicated hero form the heroes list", () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;
      component.delete(HEROES[2]);

      expect(component.heroes.length).toBe(2);
    });

    it("should deleteHero with correct hero", () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;
      component.delete(HEROES[2]);
      //expect(mockHeroService.deleteHero).toHaveBeenCalled();
      //expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
      expect(mockHeroService.deleteHero(HEROES[2]).subscribre).toHaveBeenCalled;
    });
  });
});
