import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { inject } from "@angular/core";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";

describe("HeroService", () => {
  let mockMessagesService = jasmine.createSpyObj(["add"]);
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessagesService }
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController); //get the instance of a service inside of your testing module
    service = TestBed.get(HeroService);
  });

  describe("getHero", () => {
    it("should call get with the correct URL", () => {
      service.getHero(3).subscribe();
      const req = httpTestingController.expectOne("api/heroes/3");
      req.flush({ id: 3, name: "SpiderDule", strength: 8 });
      httpTestingController.verify(); // verifies that we only got one call, what we expected
    });
  });
});
