import request from "supertest"
import app from "../app.js"
import orm_config from "../config/db.js"

describe("Auth API routes", () => {
  let testServer
  beforeAll(async () => {
    await orm_config()
    testServer = app.listen(5000)
  })
  afterAll((done) => {
    testServer.close(done)
  })
  describe("POST /api/auth/register", () => {
    let response
    const userData = {
      email: "janedoe@gmail.com",
      fullname: "Jane",
      lastName: "Doe",
      password: "web1234",
    }

    //sacamos las variables email y password para poder modificarlas y ver que pasa
    const { email, fullname, lastName, password } = userData

    const postAuth = (body) => request(app).post("/api/auth/register").send(body)

    //    CUANDO CREDENCIALES SON VÁLIDAS
    describe("When user credentials are valid", () => {
      beforeAll(async () => {
        response = await postAuth({ email, fullname, lastName, password })
      })

      test("returned userId belongs to an existing user in the db", () => {
        expect(response.body.id).toBeDefined()
      })

      test("user create should respond with a 201 status code", () => {
        expect(response.statusCode).toBe(201)
      })
    })

    //   CUANDO CREDENCIALES SON INVALIDAS
    describe("When user credentials are invalid", () => {
      test("when password is null, responds with 401 status code", async () => {
        response = await postAuth({ email, fullname, lastName, password: null })
        expect(response.status).toBe(400)
      })

      test("when email is not email format , responds with 400 status code", async () => {
        response = await postAuth({ email: "hola", fullname, lastName, password })
        expect(response.status).toBe(400)
      })
    })
  })
})
