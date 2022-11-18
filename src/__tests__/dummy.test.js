import request from "supertest"
import app from "../app.js"
import orm_config from "../config/db.js"

describe("TEST 1", () => {
  let testServer
  beforeAll(async () => {
    await orm_config()
    testServer = app.listen(5000)
  })

  afterAll((done) => {
    testServer.close(done)
  })

  it("Dummy endpoint", async () => {
    const response = await request(app).get("/api/dummy/ping")
    expect(response.error).toBe(false) // esperamos que no existe error, o sea sea false
    expect(response.status).toBe(200)
    expect(response.body.body).not.toBeNull()
  })
  // describe('GET /api/subproject', () => {
  //   it('Debería retornar todos los subproyectos', async () => {
  //     const response = await request(app).get("/api/subproject")

  //     expect(response.error).toBe(false) // esperamos que no existe error, o sea sea false
  //     expect(response.status).toBe(200)
  //     expect(response.body.body).not.toBeNull()
  //     expect(Array.isArray(response.body.body)).toBe(true)  //permite saber si es un arreglo
  //     //expect(response.body.body.length).toBe(2)
  //   })
  // })
})
