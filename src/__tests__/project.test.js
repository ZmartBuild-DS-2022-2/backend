import request from "supertest"
import app from "../app.js"
import ormConfig, { Project } from "../config/db.js"

describe("Project API routes", () => {
  let response
  let newResponse
  let organizationId
  let projectId
  let token
  let newToken
  let testServer

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

  const inviteUserToProject = (body, accessToken) =>
    request(app).post(`/api/invitations`).send(body).set("Cookie", accessToken)

  const respondUserInvitation = (body, invitationId, accessToken) =>
    request(app).patch(`/api/invitations/${invitationId}`).send(body).set("Cookie", accessToken)

  beforeAll(async () => {
    await ormConfig()
    testServer = app.listen(5001)
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
    const projectData = {
      name: "proyecto",
      description: "descripcion_proyecto",
    }

    const newProjectData = {
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
      newResponse = await unauthCreateProject(projectData, organizationId)
      projectId = response.body.id
    })

    test("Should be able to create project, expect 201 status code", async () => {
      expect(response.status).toBe(201)
    })

    test("Should not be able to create project without login token, \
            expect 401 status code", async () => {
      expect(newResponse.status).toBe(401)
    })

    test("User should be able to see organizations created GET  \
            /api/projects/:organizationId \
             expect organizationData toMatchObject from response ", async () => {
      response = await authGetProjects(organizationId, token)
      expect(response.body[0]).toMatchObject(projectData)
    })

    test("User should be able to see her proyects by id GET \
            /api/proyects/:proyectId  expect 200 status response ", async () => {
      response = await getProjectById(projectId, token)
      expect(response.status).toBe(200)
    })

    test("should delete project ", async () => {
      // Create project 2
      const newProject = await authCreateProject(newProjectData, organizationId, token)
      const newProjectId = newProject.body.id

      expect(await Project.count()).toBe(2)
      // If we eliminate 1, count should be 1
      await deleteProject(newProjectId, token)
      expect(await Project.count()).toBe(1)
    })
  })
  describe("When involves another user authorization", () => {
    let invitationResponseId
    let newProjectPermissionId

    const newProjectDataPermission = {
      name: "proyecto3",
      description: "descripcion_proyecto3",
    }

    beforeAll(async () => {
      // Created another user
      const { email, password } = newUserData
      await createAuth(newUserData)

      const newLoginResponse = await loginAuth({ email, password })
      newToken = await newLoginResponse.get("set-cookie")[0]
    })

    test("User should not be able to see a proyect not invited", async () => {
      const newProjectPermission = await authCreateProject(
        newProjectDataPermission,
        organizationId,
        token
      )
      newProjectPermissionId = newProjectPermission.body.id

      response = await getProjectById(newProjectPermissionId, newToken)
      expect(response.status).toBe(401)
    })

    test("User received an invitation but it isn't accepted yet", async () => {
      const invitationData = {
        objectiveId: newProjectPermissionId,
        email: newUserData.email,
        type: "project",
        accessType: "a",
      }

      const { objectiveId, email, type, accessType } = invitationData
      const invitationResponse = await inviteUserToProject(
        { objectiveId, email, type, accessType },
        token
      )

      invitationResponseId = invitationResponse.body.id

      response = await getProjectById(newProjectPermissionId, newToken)
      expect(response.status).toBe(401)
    })

    test("User accepted the invitation", async () => {
      // We simulate the user accepting the invitation
      const updateInvitationData = {
        id: invitationResponseId,
        accessType: "a",
        state: "Accepted",
      }

      await respondUserInvitation(updateInvitationData, updateInvitationData.id, newToken)

      response = await getProjectById(newProjectPermissionId, newToken)
      expect(response.status).toBe(200)
    })
  })
})
