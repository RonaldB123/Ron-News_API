const app = require("../../express/app");
const db = require("../../db/connection");
const request = require("supertest");
const seed = require("../../db/seeds/seed");
const testData = require("../../db/data/test-data/index");

beforeEach(()=> seed(testData));
afterAll(()=> db.end())

describe("nc-news", ()=>{
    describe("GET /api/topics", ()=>{
        test("200: Responds with status code", ()=>{
            return request(app).get("/api/topics").expect(200);
        })
        test("200: Responds with an array of topics objects", ()=>{
            return request(app).get("/api/topics").expect(200).then(({body})=>{
                const {topics} = body;
                
                expect(topics.length === 3).toBe(true);
                topics.forEach(topic =>{
                    expect(topic).toHaveProperty('slug', expect.any(String));
                    expect(topic).toHaveProperty('description', expect.any(String));

                })
            })
        })
    })

    describe("GET /api", ()=>{
        test("200: Responds with status code", ()=>{
            return request(app).get("/api").expect(200);
        })
        test("200: Responds with a JSON object of all endpoints", ()=>{
            return request(app).get("/api").expect(200).then(({body}) =>{
                const {endpoints} = body;
                const parsedEndpoints = JSON.parse(endpoints);

                for(let [key, value] of Object.entries(parsedEndpoints)){

                    expect(key.includes("api")).toBe(true);
                    expect(value).toHaveProperty("description", expect.any(String));
                    expect(value).toHaveProperty("queries", expect.any(Array));
                    expect(value).toHaveProperty("exampleResponse", expect.any(Object));
                    
                    if(key.includes("POST") || key.includes("PATCH") || key.includes("DELETE")){
                        expect(value.toHaveProperty("exampleBody", expect.any(Object)))
                    }
                }
            })
        })
    })
})