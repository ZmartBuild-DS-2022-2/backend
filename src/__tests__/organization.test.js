import request from "supertest"
import app from "../app.js"
import ormConfig from "../config/db.js"

describe("Organization API routes", () => {
  let response
  let organizationId
  let token
  let newToken
  let testServer

  beforeAll(async () => {
    await ormConfig()
    testServer = app.listen(5000)
  })
  afterAll((done) => {
    testServer.close(done)
  })

  // General Data
  const userData = {
    email: "janedoe@gmail.com",
    fullname: "Jane",
    lastName: "Doe",
    password: "web1234",
  }

  const newUserData = {
    email: "orlando@gmail.com",
    fullname: "Orli",
    lastName: "West",
    password: "orl123",
  }
  const createAuth = (body) => request(app).post("/api/auth/register").send(body)
  const loginAuth = (body) => request(app).post("/api/auth/login").send(body)

  describe("POST GET /api/organizations/", () => {
    const organizationData = {
      email: "organization@gmail.com",
      name: "organizacion",
      description: "descripcion",
      websiteUrl: "google.cl",
      imgUrl: null,
    }

    const unauthCreateOrganization = (body) =>
      request(app).post("/api/organizations").set("Content-type", "application/json").send(body)

    const authCreateOrganization = (body, accessToken) =>
      request(app).post("/api/organizations").send(body).set("Cookie", accessToken)

    const authGetOrganization = (accessToken) =>
      request(app).get("/api/organizations").set("Cookie", accessToken)

    const getOrganizationById = (id, accessToken) =>
      request(app).get(`/api/organizations/${id}`).set("Cookie", accessToken)

    const addUserToOrganization = (body, orgId, accessToken) =>
      request(app).post(`/api/organizations/${orgId}/user`).send(body).set("Cookie", accessToken)

    // User must register first
    beforeAll(async () => {
      await createAuth(userData)
    })

    describe("When user is not authorized", () => {
      beforeAll(async () => {
        response = await unauthCreateOrganization(organizationData)
      })

      it("should return a 401 status code", () => {
        expect(response.status).toBe(401)
      })

      it("should not have permission to create organization, \
            expect unauthorized true", async () => {
        expect(response.unauthorized).toBe(true)
      })
    })

    describe("When user is authorized with token", () => {
      beforeAll(async () => {
        const { email, password } = userData
        const login_response = await loginAuth({ email, password })

        token = await login_response.get("set-cookie")[0]
        response = await authCreateOrganization(organizationData, token)
        organizationId = await response.body.id
      })

      test("Should be able to create organization, expect 201 status code", async () => {
        expect(response.status).toBe(201)
      })

      test("User should be able to see organizations created GET /api/organizations/ \
                  expect organizationData toMatchObject from response ", async () => {
        response = await authGetOrganization(token)
        expect(response.body[0]).toMatchObject(organizationData)
      })

      test("User should be able to see her organizations by id GET \
                /api/organizations/:organizationId | expect organizationData toMatchObject from \
                response ", async () => {
        response = await getOrganizationById(organizationId, token)
        expect(response.body).toMatchObject(organizationData)
      })
    })

    describe("When involves another user authorization", () => {
      beforeAll(async () => {
        // Created another user
        const { email, password } = newUserData
        await createAuth(newUserData)

        const newLoginResponse = await loginAuth({ email, password })
        newToken = await newLoginResponse.get("set-cookie")[0]
      })

      test("Should not see the organization created from another user", async () => {
        response = await getOrganizationById(organizationId, newToken)
        expect(response.status).toBe(401)
      })

      describe("Invite user to organization", () => {
        beforeAll(async () => {
          const { email } = newUserData
          await addUserToOrganization({ userEmail: email }, organizationId, token)
        })

        test("Should see the organization created from another user when is \
        invited to participate in", async () => {
          response = await getOrganizationById(organizationId, newToken)
          expect(response.status).toBe(200)
        })
      })
    })
  })
})
