const request = require("supertest");
const app = require("../../app");

describe("Test Get /launches", () => {
  test("It should response with 200 success", async () => {
    const response = await request(app).get("/launches").expect(200);
  });

  describe("Test Post /launches", () => {
    test("It should respond with 400 bad request", async () => {
      const response = await request(app).post("/launches").expect(400);
    });

    test("It should respond with 201 created", async () => {
      const completeLaunchData = {
        mission: "New exploration",
        target: "Moon",
        rocket: "Moon wagon",
        launchDate: "January 1, 3030",
      };

      const launchDataWithoutDate = {
        mission: "New exploration",
        target: "Moon",
        rocket: "Moon wagon",
      };

      const response = await request(app)
        .post("/launches")
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();

      expect(requestDate).toBe(responseDate);

      expect(response.body).toMatchObject(launchDataWithoutDate);
    });
  });
});
