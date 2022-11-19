import request from "supertest"
import app from "../app.js"
import orm_config from "../config/db.js"

describe("Auth API routes", () => {
  let testServer
  let response

  beforeAll(async () => {
    await orm_config()
    testServer = app.listen(5000)
  })
  afterAll((done) => {
    testServer.close(done)
  })

  const userData = {
    email: "janedoe@gmail.com",
    fullname: "Jane",
    lastName: "Doe",
    password: "web1234",
  }
  //sacamos las variables email y password para poder modificarlas y ver que pasa
  const { email, fullname, lastName, password } = userData

  const createAuth = (body) => request(app).post("/api/auth/register").send(body)

  //  1- REGISTRO
  describe("POST /api/auth/register", () => {
    //  1a-CUANDO CREDENCIALES SON VÁLIDAS
    describe("When user credentials are valid", () => {
      beforeAll(async () => {
        response = await createAuth({ email, fullname, lastName, password })
      })

      test("returned userId belongs to an existing user in the db", () => {
        expect(response.body.id).toBeDefined()
      })

      test("user create should respond with a 201 status code", () => {
        expect(response.statusCode).toBe(201)
      })
    })

    //  1b-CUANDO CREDENCIALES SON INVALIDAS
    describe("When user credentials are invalid", () => {
      test("when password is null, responds with 401 status code", async () => {
        response = await createAuth({ email, fullname, lastName, password: null })
        expect(response.status).toBe(400)
      })

      test("when email is not email format , responds with 400 status code", async () => {
        response = await createAuth({ email: "hola", fullname, lastName, password })
        expect(response.status).toBe(400)
      })
    })
  })

  //  2- LOGIN
  describe("POST /api/auth/login", () => {
    const loginAuth = (body) => request(app).post("/api/auth/login").send(body)

    beforeAll(async () => {
      await createAuth({ email, fullname, lastName, password })
    })

    test("when password is correct, responds with unauthorized false", async () => {
      response = await loginAuth({ email, password })
      expect(response.unauthorized).toBe(false)
    })

    test("when password is incorrect, responds with unauthorized true", async () => {
      response = await loginAuth({ email, password: "otherpassword" })
      expect(response.unauthorized).toBe(true)
    })

    test("when email is not registered, responds with 401 status code", async () => {
      response = await loginAuth({ email: "unregistered@gmail.com", password })
      expect(response.status).toBe(401)
    })
  })
})
