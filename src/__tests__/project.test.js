import request from "supertest"
import app from "../app.js"
import ormConfig, { Project } from "../config/db.js"

describe("Project API routes", () => {
  let response
  let response2
  let organizationId
  let projectId
  let token
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

  const organizationData = {
    email: "organization@gmail.com",
    name: "organizacion",
    description: "descripcion",
    websiteUrl: "google.cl",
    imgUrl: null,
  }

  const createAuth = (body) => request(app).post("/api/auth/register").send(body)

  const loginAuth = (body) => request(app).post("/api/auth/login").send(body)

  const createOrganization = (body, accessToken) =>
    request(app).post("/api/organizations").send(body).set("Cookie", accessToken)

  describe("POST GET /api/projects/:organizationId", () => {
    const authCreateProject = (body, orgId, accessToken) =>
      request(app).post(`/api/projects/${orgId}`).send(body).set("Cookie", accessToken)

    const unauthCreateProject = (body, orgId) =>
      request(app).post(`/api/projects/${orgId}`).send(body)

    const authGetProjects = (orgId, accessToken) =>
      request(app).get("/api/projects").set("Cookie", accessToken).query({ organizationId: orgId })

    const getProjectById = (projectId, accessToken) =>
      request(app).get(`/api/projects/${projectId}`).set("Cookie", accessToken)

    const deleteProject = (projectId, accessToken) =>
      request(app).delete(`/api/projects/${projectId}`).set("Cookie", accessToken)

    const projectData = {
      name: "proyecto",
      description: "descripcion_proyecto",
    }

    const projectData2 = {
      name: "proyecto2",
      description: "descripcion_proyecto2",
    }

    beforeAll(async () => {
      // Create and login user
      const { email, password } = userData
      await createAuth(userData)
      const login_response = await loginAuth({ email, password })
      token = await login_response.get("set-cookie")[0]

      // Create organization
      const organization = await createOrganization(organizationData, token)
      organizationId = await organization.body.id

      // Create project
      response = await authCreateProject(projectData, organizationId, token)
      response2 = await unauthCreateProject(projectData, organizationId)
      projectId = response.body.id
    })

    test("Should be able to create project, expect 201 status code", async () => {
      expect(response.status).toBe(201)
    })

    test("Should not be able to create project without login token, \
            expect 401 status code", async () => {
      expect(response2.status).toBe(401)
    })

    test("User should be able to see organizations created GET  \
            /api/projects/:organizationId \
             expect organizationData toMatchObject from response ", async () => {
      response = await authGetProjects(organizationId, token)
      expect(response.body[0]).toMatchObject(projectData)
    })

    test("User should be able to see her organizations by id GET \
            /api/organizations/:organizationId  expect 200 status response ", async () => {
      response = await getProjectById(projectId, token)
      expect(response.status).toBe(200)
    })

    test("should delete project ", async () => {
      // Create project 2
      const newProject = await authCreateProject(projectData2, organizationId, token)
      const newProjectId = newProject.body.id

      expect(await Project.count()).toBe(2)
      // If we eliminate 1, count should be 1
      await deleteProject(newProjectId, token)
      expect(await Project.count()).toBe(1)
    })

    // Remains permissions testing
  })
})
