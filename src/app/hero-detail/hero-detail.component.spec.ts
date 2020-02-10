import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
  flush,
  async
} from "@angular/core/testing"; // for integration test
import { HeroDetailComponent } from "./hero-detail.component";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { Location } from "@angular/common";
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

describe(`Hero Detail Component`, () => {
  let mockActivateRoute, mockHeroService, mockLocation;
  let fixture: ComponentFixture<HeroDetailComponent>;

  mockActivateRoute = {
    snapshot: {
      paramMap: {
        get: () => {
          return "3";
        }
      }
    }
  };
  mockHeroService = jasmine.createSpyObj(["getHero", "updateHero"]);
  mockLocation = jasmine.createSpyObj(["back"]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivateRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation }
      ]
    });
    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService.getHero.and.returnValue(
      of({ id: 3, name: "SpiderDulez", strength: 8 })
    );
  });

  it(`should render hero name in a h2 tag`, () => {
    fixture.detectChanges(); //at

    expect(fixture.nativeElement.querySelector("h2").textContent).toContain(
      "SPIDERDULEZ"
    ); //assert;
  });

  // it(`should call updateHero when save is called`, done => {
  //   //now the test will wait until the async code its called
  //   mockHeroService.updateHero.and.returnValue(of({}));

  //   fixture.detectChanges(); //at

  //   fixture.componentInstance.save();

  //   setTimeout(() => {
  //     //bacause we set 250 on the heroDeatails deboucen cal function
  //     expect(mockHeroService.updateHero).toHaveBeenCalled();
  //     done();
  //   }, 300);
  // });

  // it("should call updateHero when save is called", fakeAsync(() => {
  //   //now the test will wait until the async code its called
  //   mockHeroService.updateHero.and.returnValue(of({}));

  //   fixture.detectChanges(); //at

  //   fixture.componentInstance.save();
  //   //bacause we set 250 on the heroDeatails deboucen cal function

  //   flush(); //look at the zone to see if there any task waiting

  //   //tick(250); //control of zone.js can be manipulate the time inside of it thanks to thick
  //   expect(mockHeroService.updateHero).toHaveBeenCalled();
  // }));

  it("should call updateHero when save is called", async(() => {
    //now the test will wait until the async code its called
    mockHeroService.updateHero.and.returnValue(of({}));

    fixture.detectChanges(); //at

    fixture.componentInstance.save();

    fixture.whenStable().then(() => {
      //checks for promises if they are all resolve
      expect(mockHeroService.updateHero).toHaveBeenCalled();
    });
  }));
});
