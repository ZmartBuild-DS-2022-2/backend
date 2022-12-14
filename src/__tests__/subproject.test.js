import request from "supertest"
import app from "../app.js"
import orm_config, { Subproject } from "../config/db.js"

describe("Project API routes", () => {
  let response
  let newResponse
  let projectId
  let subprojectId
  let organizationId
  let token
  let newToken
  let invitationResponseId
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

  const newUserData = {
    email: "orlando@gmail.com",
    fullname: "Orli",
    lastName: "West",
    password: "orl123",
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
    title: "subproject",
    description: "subproject descripction",
    images: {},
    gltf_file: {},
    bin_file: {},
  }

  const subprojectDataUpdated = {
    title: "ubproject updated",
    description: "subproject descripction updated",
    images: {},
    gltf_file: {},
    bin_file: {},
  }

  const newSubprojectData = {
    title: "title subproyecto2",
    description: "subproyecto_desc2",
    images: {},
    gltf_file: {},
    bin_file: {},
  }

  const createAuth = (body) => request(app).post("/api/auth/register").send(body)
  const loginAuth = (body) => request(app).post("/api/auth/login").send(body)

  // Organization

  const createOrganization = (body, accessToken) =>
    request(app).post("/api/organizations").send(body).set("Cookie", accessToken)

  // Invitation

  const inviteUserToProject = (body, accessToken) =>
    request(app).post(`/api/invitations`).send(body).set("Cookie", accessToken)

  const respondUserInvitation = (body, invitationId, accessToken) =>
    request(app).patch(`/api/invitations/${invitationId}`).send(body).set("Cookie", accessToken)

  // Projects
  const createProject = (body, orgId, accessToken) =>
    request(app).post(`/api/projects/${orgId}`).send(body).set("Cookie", accessToken)

  // Subprojects
  const authCreateSubproject = (body, projId, accessToken) =>
    request(app).post(`/api/subprojects/${projId}`).send(body).set("Cookie", accessToken)

  const unauthCreateSubproject = (body, projId) =>
    request(app).post(`/api/subprojects/${projId}`).send(body)

  const deleteSubproject = (subprojId, accessToken) =>
    request(app).delete(`/api/subprojects/${subprojId}`).set("Cookie", accessToken)

  const getSubprojectById = (subprojId, accessToken) =>
    request(app).get(`/api/subprojects/${subprojId}`).set("Cookie", accessToken)

  const getUserSubprojects = (accessToken) =>
    request(app).get("/api/subprojects").set("Cookie", accessToken)

  const updateSubproject = (body, subprojId, accessToken) =>
    request(app).patch(`/api/subprojects/${subprojId}`).send(body).set("Cookie", accessToken)

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
    subprojectId = response.body.id
  })

  test("Should be able to create subproject, expect 201 status code", async () => {
    expect(response.status).toBe(201)
  })

  test("Should not be able to create subproject without login token, \
            expect 401 status code", async () => {
    expect(newResponse.status).toBe(401)
  })

  test("Should be able to get subproject BY ID expect 200 status code", async () => {
    response = await getSubprojectById(subprojectId, token)
    expect(response.status).toBe(200)
  })

  test("Should be able to get user subprojects, expect 200 status code", async () => {
    response = await getUserSubprojects(token)
    expect(response.status).toBe(200)
  })

  test("Should be able to update subproject, expect 200 status code", async () => {
    response = await updateSubproject(subprojectDataUpdated, subprojectId, token)
    expect(response.status).toBe(200)
  })

  test("should delete subproject ", async () => {
    // Create new subproject
    const newSubproject = await authCreateSubproject(newSubprojectData, projectId, token)
    const newSubprojectId = newSubproject.body.id

    expect(await Subproject.count()).toBe(2)
    // If we eliminate 1, count should be 1
    await deleteSubproject(newSubprojectId, token)
    expect(await Subproject.count()).toBe(1)
  })

  // Permission testing

  describe("When involves another user authorization", () => {
    beforeAll(async () => {
      // Created another user Permission
      const { email, password } = newUserData
      await createAuth(newUserData)

      const newLoginResponse = await loginAuth({ email, password })
      newToken = await newLoginResponse.get("set-cookie")[0]
    })

    //BEFORE INVITATION ACCESS

    test("Should not see the subproject created from another user", async () => {
      response = await getSubprojectById(subprojectId, newToken)
      expect(response.status).toBe(401)
    })

    test("Should not edit the subproject created from another user", async () => {
      response = await updateSubproject(subprojectDataUpdated, subprojectId, newToken)
      expect(response.status).toBe(401)
    })

    test("Should not delete the subproject created from another user", async () => {
      response = await deleteSubproject(subprojectId, newToken)
      expect(response.status).toBe(401)
    })

    //AFTER INVITATION ACCESS

    describe("Invite user to project", () => {
      // Create an invitation to the new user
      // AccessType is irrelevant here

      test("User received an invitation but it isn't accepted yet", async () => {
        const invitationData = {
          objectiveId: projectId,
          email: newUserData.email,
          type: "project",
          accessType: "a",
        }
        const { objectiveId, email, type, accessType } = invitationData
        const invitationResponse = await inviteUserToProject(
          { objectiveId, email, type, accessType },
          token
        )
        invitationResponseId = await invitationResponse.body.id

        response = await getSubprojectById(subprojectId, newToken)
        expect(response.status).toBe(401)
      })

      test("User accepted the invitation & should be able to get user subprojects,\
         expect 200 status code", async () => {
        // We simulate the new user accepting the invitation
        const updateInvitationData = {
          id: invitationResponseId,
          accessType: "a",
          state: "Accepted",
        }
        await respondUserInvitation(updateInvitationData, updateInvitationData.id, newToken)

        response = await getSubprojectById(subprojectId, newToken)
        expect(response.status).toBe(200)
      })

      test("User accepted the invitation & should be able to edit user subprojects,\
        expect 200 status code", async () => {
        // We simulate the new user accepting the invitation
        const updateInvitationData = {
          id: invitationResponseId,
          accessType: "a",
          state: "Accepted",
        }
        await respondUserInvitation(updateInvitationData, updateInvitationData.id, newToken)

        response = await updateSubproject(subprojectDataUpdated, subprojectId, newToken)
        expect(response.status).toBe(200)
      })

      test("User accepted the invitation & should be able to delete user subprojects,\
       expect 200 status code", async () => {
        // We simulate the new user accepting the invitation
        const updateInvitationData = {
          id: invitationResponseId,
          accessType: "a",
          state: "Accepted",
        }
        await respondUserInvitation(updateInvitationData, updateInvitationData.id, newToken)

        response = await deleteSubproject(subprojectId, newToken)
        expect(response.status).toBe(200)
      })
    })
  })
})
