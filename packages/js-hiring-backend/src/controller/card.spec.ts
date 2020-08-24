import request from "supertest";
import { createApp } from "../app";

let TEST_CARD = {
    _id: "",
    title: "Great Title",
    description: "Even better description",
    status: "in_progress",
    story_points: 8
};

beforeAll(done => {
    request.agent(createApp())
    .post("/api/card")
    .send(TEST_CARD)
    .expect(200, done)

    // TODO set _id on response
});

describe("Card Controller Nominal", () => {
  it("returns 200 on GET /", done => {
    request(createApp())
    .get("/api/card")
    .expect(200, done);
  });

  it("returns 200 on POST /", done => {
    request(createApp())
    .post("/api/card")
    .send(TEST_CARD)
    .expect(200, done);
  });

  it("returns 200 on PATCH /", done => {
    TEST_CARD.title = "Even greater title";
    request(createApp())
    .patch("/api/card")
    .send(TEST_CARD)
    .expect(200, done);
  });

  it("returns 200 on DELETE /", done => {
    request(createApp())
    .delete(`/api/card/${TEST_CARD._id}`)
    .send(TEST_CARD)
    .expect(200, done);
  });
});

describe("Card Controller Off Nominal", () => {
    it("returns 400 on blank POST body", done => {
        request(createApp())
        .post("/api/card")
        .send({})
        .expect(404, done);
    });

    it("returns 400 on improperly formatted POST body", done => {
        request(createApp())
        .post("/api/card")
        .send({
            name: "batman"
        })
        .expect(404, done);
    });

    it("returns 400 on non JSON POST body", done => {
        request(createApp())
        .post("/api/card")
        .send("batman was here")
        .expect(404, done);
    });
});
