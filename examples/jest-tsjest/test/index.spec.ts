import { app } from "../src";
const supertest = require('supertest')
const request = supertest(app)

describe("meaning of life", () => {

    afterAll(async done => {
        app.close()
        done()
    })
    it("should access server and receive JSON",  async () => {
      // Sends GET Request to /test endpoint
        return request
            .get('/xxx')
            .send()
            .expect(302)
            .expect('Location', 'https://bit.ly/xxx'o)
  
  });
});
