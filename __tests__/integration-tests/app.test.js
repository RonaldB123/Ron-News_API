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
        test("200: Responds with an object of all endpoints", ()=>{
            return request(app).get("/api").expect(200).then(({body}) =>{
                const {endpoints} = body;
                
                for(let [key, value] of Object.entries(endpoints)){

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











describe("GET /api/articles", ()=>{
    test("200: Responds with status code", ()=>{
        return request(app).get("/api/articles").expect(200);
    })
    test("200: Responds with array of article objects", ()=>{
        return request(app).get("/api/articles").expect(200).then(({body}) =>{
            const {articles} = body;

            expect(articles).toBeSortedBy("created_at",{decending: false})

            articles.forEach(article =>{
                console.log(article)
                expect(article).toHaveProperty("author", expect.any(String));
                expect(article).toHaveProperty("title", expect.any(String));
                expect(article).toHaveProperty("article_id", expect.any(Number));
                expect(article).toHaveProperty("topic", expect.any(String));
                expect(article).toHaveProperty("created_at", expect.any(String));
                expect(article).toHaveProperty("votes", expect.any(Number));
                expect(article).toHaveProperty("article_img_url", expect.any(String)); 
                expect(article).toHaveProperty("comment_count", expect.any(Number)); 
                expect(article).not.toHaveProperty("body"); 
            })
        })
    })
})