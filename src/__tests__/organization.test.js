import request from "supertest"
import app from "../app.js"
import orm_config from "../config/db.js"
 
describe("Organization API routes", () => {
   let response
   let organizationId
   let token
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
    const { email, password } = userData
    const createAuth = (body) => request(app).post("/api/auth/register").send(body)
    const loginAuth = (body) => request(app).post("/api/auth/login").send(body)


    //1- CREAR y VER ORGANIZACIONES /api/organizations/

    describe('POST GET /api/organizations/', () => {
        const organizationData = {
            email: "organization@gmail.com",
            name: "organizacion",
            description: "descripcion",
            websiteUrl: "google.cl",
            imgUrl: null,
            }

        const unauthCreateOrganization = (body) => request(app)
            .post('/api/organizations')
            .set('Content-type', 'application/json')
            .send(body)


        const authCreateOrganization = (body, accessToken) => request(app)
          .post('/api/organizations')
          .send(body)
          .set( "Cookie", accessToken)

        const authGetOrganization = (accessToken) => request(app)
          .get('/api/organizations')
          .set( "Cookie", accessToken)

        const getOrganizationById = (id, accessToken) => request(app)
          .get(`/api/organizations/${id}`)
          .set( "Cookie", accessToken)


            // SE REGISTRA AL USUARIO
            beforeAll(async () => {
            await createAuth(userData)
            })

            // 1- SIN LOGEAR A USUARIO - NO AUTORIZADO
            describe('When user is not authorized', () => {
            beforeAll(async () => {
                response = await unauthCreateOrganization(organizationData)
            })
    
            it('should return a 401 status code', () => {
                expect(response.status).toBe(401)
            })
    
            // it('should not have created an organization', async () => {
            //     const organizationCount = await app.context.orm.organization.count()
            //     expect(organizationCount).toBe(1)
            // })

            it('should not have permission to create organization, \
            expect unauthorized true', async () => {
                expect(response.unauthorized).toBe(true)
            })

            })


            // 2- CON LOGEAR A USUARIO - AUTORIZADO
            describe('When user is authorized with token', () => {
                beforeAll(async () => {
                    const login_response = await loginAuth({ email, password })
                    token = await login_response.get("set-cookie")[0]
                    // const l = await login_response.get("set-cookie")[0]
                    // token = l.substr(13).split(";")[0]
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
                    console.log("WA",organizationId)
                    response = await getOrganizationById(organizationId, token)
                    expect(response.body).toMatchObject(organizationData)
              })



                })
    


        })

 
 
 
 
 
 
 })

