import request from "supertest"
import app from "../app.js"
import orm_config, { SubProject } from "../config/db.js"

describe("Project API routes", () => {
    let response
    let response2
    // let userId
    let projectId
    let organizationId
    let subprojectId
    let token
    // let token2
    let testServer

    beforeAll(async () => {
    await orm_config()
    testServer = app.listen(5000)
    })
    afterAll((done) => {
    testServer.close(done)
    })

    //Datos que se usan en general

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

    const projectData2 = {
        name: "proyecto2",
        description: "descripcion_proyecto2",
    }

    const subprojectData = {
        title: "title subproyecto",
        description: "subproyecto_desc",
    }

    const createAuth = (body) => request(app).post("/api/auth/register").send(body)
    const loginAuth = (body) => request(app).post("/api/auth/login").send(body)

    const createOrganization = (body, accessToken) =>
    request(app).post("/api/organizations").send(body).set("Cookie", accessToken)


    //projects

    const createProject = (body, orgId, accessToken) =>
    request(app).post(`/api/projects/${orgId}`).send(body).set("Cookie", accessToken)

    //subprojects

    const authCreateSubproject = (body, projId, accessToken) =>
    request(app).post(`/api/subprojects/${projId}`).send(body).set("Cookie", accessToken)

    const unauthCreateSubproject = (body, projId) =>
    request(app).post(`/api/subprojects/${projId}`).send(body)


    
    beforeAll(async () => {
        //create and login user
        const { email, password } = userData
        await createAuth(userData)
        const login_response = await loginAuth({ email, password })
        token = await login_response.get("set-cookie")[0]
        //create organization
        const organization = await createOrganization(organizationData, token)
        organizationId = await organization.body.id
        //create project
        const project = await createProject(projectData, organizationId, token)
        projectId = project.body.id
        //create subsub project
        console.log("GUAU", projectId, organizationId, token)
        response = authCreateSubproject(subprojectData, projectId, token)
        response2 = unauthCreateSubproject(subprojectData, projectId)
        
    })

    test("Should be able to create subproject, expect 201 status code", async () => {
      expect(response.status).toBe(201)
        
    })

    test("Should not be able to create subproject without login token, \
            expect 401 status code", async () => {
      expect(response2.status).toBe(401)
    })

    // test("User should be able to see organizations created GET  \
    //         /api/projects/:organizationId \
    //          expect organizationData toMatchObject from response ", async () => {
    //   response = await authGetProjects(organizationId, token)
    //   expect(response.body[0]).toMatchObject(projectData)
    // })

    // test("User should be able to see her organizations by id GET \
    //         /api/organizations/:organizationId  expect 200 status response ", async () => {
    //   response = await getProjectById(projectId, token)
    //   expect(response.status).toBe(200)
    // })

    // test("should delete project ", async () => {
    //   //creamos otro projecto, si los contamos serían 2
    //   const project2 = await authCreateProject(projectData2, organizationId, token)
    //   const projectId2 = project2.body.id
    //   expect(await SubProject.count()).toBe(2)
    //   //Si eliminamos a uno, la cuenta sería 1
    //   await deleteProject(projectId2, token)
    //   expect(await SubProject.count()).toBe(1)
    // })

    //ACA HABRÍA QUE HACER TESTING DE LOS PERMISOS
//   })
})
