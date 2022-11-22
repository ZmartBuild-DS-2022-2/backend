import request from "supertest"
import app from "../app.js"
import orm_config from "../config/db.js"

describe("Organization API routes", () => {
  let response
  let organizationId
  let token
  let token2
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

  const userData2 = {
    email: "orlando@gmail.com",
    fullname: "Orli",
    lastName: "West",
    password: "orl123",
  }
  const createAuth = (body) => request(app).post("/api/auth/register").send(body)
  const loginAuth = (body) => request(app).post("/api/auth/login").send(body)

  //1- CREAR y VER ORGANIZACIONES /api/organizations/

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
    
    // const addUserToOrganization = (orgId, emailUser, accessToken) =>
    //   request(app).post(`/api/organizations/${orgId}/${emailUser}`).set("Cookie", accessToken)

    // SE REGISTRA AL USUARIO
    beforeAll(async () => {
      await createAuth(userData)
    })

    // 1- SIN LOGEAR A USUARIO - NO AUTORIZADO
    describe("When user is not authorized", () => {
      beforeAll(async () => {
        response = await unauthCreateOrganization(organizationData)
      })

      it("should return a 401 status code", () => {
        expect(response.status).toBe(401)
      })

      // it('should not have created an organization', async () => {
      //     const organizationCount = await app.context.orm.organization.count()
      //     expect(organizationCount).toBe(1)
      // })

      it("should not have permission to create organization, \
            expect unauthorized true", async () => {
        expect(response.unauthorized).toBe(true)
      })
    })

    // 2- CON LOGEAR A USUARIO - AUTORIZADO
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
                /api/organizations/:organizationId  expect organizationData toMatchObject from \
                response ", async () => {
        response = await getOrganizationById(organizationId, token)
        expect(response.body).toMatchObject(organizationData)
      })

})


        describe('When involves another user authorization', () => {
            beforeAll(async () => {
            //como ya tenemos la información de usuario 1: token y organizationId
            //Crearemos el segundo usuario y haremos log in

            const { email, password } = userData2
            
            await createAuth(userData2)
            const login_response2 = await loginAuth( { email, password } )
            // user2Id = login_response2.body.id
            token2 = await login_response2.get("set-cookie")[0]

              })
    

            test('Should not see the organization created from another user', async () => {
                //User 2-Token 2 no debiera ver la organización 
                //del user 1 - token 1 sin autorización
                response = await getOrganizationById(organizationId, token2)
                expect(response.status).toBe(401)
            })

            // describe('Invite user to organization', () => {
            //   beforeAll(async () => {
            //     const {email} = userData2
            //      await addUserToOrganization(organizationId, email, token)    
            //       })

            //   test('Should see the organization created from another user when is \
            //   invited to participate in', async () => {
            //       //Token 2  debiera ver la organización del token 1 porque fue invitado por éste
            //       //token 1 invita a token 2
            //       //ahora vemos si puede acceder a la misma ruta que no podía en el test anterior
            //       response = await getOrganizationById(organizationId, token2)
            //       expect(response.status).toBe(200)
                  
            //   })


            // })
            

        })

                
        
        // organizationId = await authCreateOrganization(organizationData, token).body.id
                // console.log(organizationId)
                //.get("set-cookie")[0]
                
                // crear organiz = await authCreateOrganization(organizationData, token)
                // organizationId = await response.body.id







  })
})
