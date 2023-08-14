const app = require("../../express/app");
const db = require("../../db/connection");
const request = require("supertest");
const seed = require("../../db/seeds/seed");
const testData = require("../../db/data/test-data/index");

beforeEach(()=> seed(testData));
afterAll(()=> db.end())

describe("nc-news", ()=>{
    describe("GET /api/topics", ()=>{
        test("200: Returns status code", ()=>{
            return request(app).get("/api/topics").expect(200);
        })
        test("200: Returns an array of topics objects", ()=>{
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

    


    describe("GET /api/articles/:article_id", ()=>{
        test("200: Responds with status code", ()=>{
            return request(app).get("/api/articles/1").expect(200);
        })
        test("200: Responds with article object", ()=>{
            return request(app).get("/api/articles/1").expect(200).then(({body})=>{
                const {article} = body;

                
            })
        })
    })
})