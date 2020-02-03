import { MessageService } from "./message.service";

describe(`Message Service`, () => {
  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
  });

  it("should have no message to start", () => {
    expect(service.messages.length).toBe(0);
  });

  it("should add a message when it's called", () => {
    service.add("message 1");
    expect(service.messages.length).toBe(1);
  });

  it("should add a message when it's called", () => {
    service.add("message 1");
    service.clear();
    expect(service.messages.length).toBe(0);
  });
});
