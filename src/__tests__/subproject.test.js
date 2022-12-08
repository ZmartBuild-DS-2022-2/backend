import request from "supertest"
import app from "../app.js"
import orm_config from "../config/db.js"

describe("Project API routes", () => {
  let response
  let newResponse
  let projectId
  let organizationId
  let token
  let testServer

  beforeAll(async () => {
    await orm_config()
    testServer = app.listen(5001)
  })
  afterAll((done) => {
    testServer.close(done)
  })

  // General data
  const userData = {
    email: "janedoe@gmail.com",
    fullname: "Jane",
    lastName: "Doe",
    password: "web1234",
  }

  //   const userData2 = {
  //     email: "orlando@gmail.com",
  //     fullname: "Orli",
  //     lastName: "West",
  //     password: "orl123",
  //   }

  const organizationData = {
    email: "organization@gmail.com",
    name: "organizacion",
    description: "descripcion",
    websiteUrl: "google.cl",
    imgUrl: null,
  }

  const projectData = {
    name: "proyecto",
    description: "descripcion_proyecto",
  }

  // const projectData2 = {
  //     name: "proyecto2",
  //     description: "descripcion_proyecto2",
  // }

  const subprojectData = {
    title: "title subproyecto",
    description: "subproyecto_desc",
    images: {},
    gltf_file: {},
    bin_file: {},
  }

  const createAuth = (body) => request(app).post("/api/auth/register").send(body)
  const loginAuth = (body) => request(app).post("/api/auth/login").send(body)

  const createOrganization = (body, accessToken) =>
    request(app).post("/api/organizations").send(body).set("Cookie", accessToken)

  // Projects
  const createProject = (body, orgId, accessToken) =>
    request(app).post(`/api/projects/${orgId}`).send(body).set("Cookie", accessToken)

  // Subprojects
  const authCreateSubproject = (body, projId, accessToken) =>
    request(app).post(`/api/subprojects/${projId}`).send(body).set("Cookie", accessToken)

  const unauthCreateSubproject = (body, projId) =>
    request(app).post(`/api/subprojects/${projId}`).send(body)

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
    const project = await createProject(projectData, organizationId, token)
    projectId = project.body.id

    // Create subsub project
    response = await authCreateSubproject(subprojectData, projectId, token)
    newResponse = await unauthCreateSubproject(subprojectData, projectId)
  })

  test("Should be able to create subproject, expect 201 status code", async () => {
    expect(response.status).toBe(201)
  })

  test("Should not be able to create subproject without login token, \
            expect 401 status code", async () => {
    expect(newResponse.status).toBe(401)
  })

  // Remains permission testing
})
