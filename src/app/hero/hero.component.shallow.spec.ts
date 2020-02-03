import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("Hero component (shallow)", () => {
  let fixture: ComponentFixture<HeroComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroComponent);
  });

  it("should have the correct hero", () => {
    fixture.componentInstance.hero = { id: 1, name: "SpiderDule", strength: 8 };

    expect(fixture.componentInstance.hero.name).toEqual("SpiderDule");
  });

  it("should render an anchor tag", () => {
    fixture.componentInstance.hero = { id: 1, name: "SpiderDule", strength: 8 };

    fixture.detectChanges(); //updates any bindings

    const deA = fixture.debugElement.query(By.css("a"));
    expect(deA.nativeElement.textContent).toContain("SpiderDule");
    // expect(fixture.nativeElement.querySelector("a").textContent).toContain(
    //   "SpiderDule"
    // );
  });
});
