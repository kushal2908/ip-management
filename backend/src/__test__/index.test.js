const axios = require("axios");
const url = "http://127.0.0.1:8000/api";

// SIGNUP
describe("POST /auth/signup", () => {
  test("New Signup", async () => {
    const res = await axios.post(url + "/auth/signup", {
      name: "test1",
      password: "123456",
    });
    expect(res.status).toBe(201);
  });

  test("Failed signup", async () => {
    try {
      const res = await axios.post(url + "/auth/signup", {
        name: "test",
        password: "123456",
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });
});

// SIGNIN
describe("POST /auth/signin", () => {
  test("SUCCESS Signin", async () => {
    const res = await axios.post(url + "/auth/signin", {
      name: "test",
      password: "123456",
    });
    expect(res.status).toBe(200);
  });

  test("Failed signin", async () => {
    try {
      const res = await axios.post(url + "/auth/signin", {
        name: "failed",
        password: "failed",
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });
});
