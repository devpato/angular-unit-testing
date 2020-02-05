import { TestBed } from "@angular/core/testing";
import { HeroService } from "../hero.service";
import { MessageService } from "../message.service";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

describe("", () => {
  let mockMessagesService = jasmine.createSpyObj(["add"]);
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessagesService }
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController); //get the instance of a service inside of your testing module
  });

  it("", () => {});
});
