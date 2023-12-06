const expect = require("chai").expect;
const request = require("supertest");
const app = require("../main");

describe("Routes for Blog", () => {
  it("1. Create Blog", async () => {
    const loginToken = await request(app)
      .post("/auth/login")
      .send({ email: "ng15@gmail.com", password: "naman" });
    const token = loginToken.body.Data.meta.token;

    const response = await request(app)
      .post("/auth/blog/")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Blog", content: "This is a test blog." });

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("id");
    expect(response.body).to.have.property("timestamp");
    expect(response.body).to.have.property("title", "Test Blog");
    expect(response.body).to.have.property("content", "This is a test blog.");
  });

  it("2. Get All blogs", async () => {
    const response = await request(app).get("/auth/blog/blogs"); 

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
  });
});
