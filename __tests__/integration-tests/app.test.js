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
                        expect(value).toHaveProperty("exampleBody", expect.any(Object))
                    }
                }
            })
        })
    })

    describe("GET /api/articles/:article_id", ()=>{
        test("200: Responds with status code", ()=>{
            return request(app).get("/api/articles/1").expect(200);
        })
        test("200: Responds with article object", ()=>{
            return request(app).get("/api/articles/1").then(({body})=>{
                const {article} = body;
                const expected =   {
                    article_id: 1,
                    title: 'Living in the shadow of a great man',
                    topic: 'mitch',
                    author: 'butter_bridge',
                    body: 'I find this existence challenging',
                    created_at: '2020-07-09T20:11:00.000Z',
                    votes: 100,
                    article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
                };
                  
                expect(article).toMatchObject(expected);
            })
        })
        test("404: Responds with not found", ()=>{
            return request(app).get("/api/articles/999999").expect(404).then(({body}) =>{
                const {message} = body;

                expect(message).toEqual("Not Found");
            })
        })
        test("400: Responds with bad request", ()=>{
            return request(app).get("/api/articles/hello").expect(400).then(({body}) =>{
                const {message} = body;

                expect(message).toEqual("Bad Request");
            })
        })
    })

    describe("GET /api/articles", ()=>{
        test("200: Responds with status code", ()=>{
            return request(app).get("/api/articles").expect(200);
        })
        test("200: Responds with array of article objects", ()=>{
            return request(app).get("/api/articles").then(({body}) =>{
                const {articles} = body;
                const expected = {
                article_id: expect.any(Number),
                title: expect.any(String),
                topic: expect.any(String),
                author: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                article_img_url:  expect.any(String),
                comment_count: expect.any(Number)
                }
    
                expect(articles).toBeSortedBy("created_at",{descending: true});
    
                articles.forEach(article =>{
                    expect(article).toMatchObject(expected);
                })
            })
        })    
    })

    describe("GET /api/articles/:article_id/comments", ()=>{
        test("200: Responds with status code", ()=>{
            return request(app).get("/api/articles/1/comments").expect(200);
        })
        test("200: Responds with array of comments when given article_id", ()=>{
            return request(app).get("/api/articles/1/comments").then(({body}) =>{
                const {comments} = body;
             
                expect(comments).toBeSortedBy("created_at", {descending: true});
                expect(comments).toHaveLength(11);

                comments.forEach(comment =>{
                    expect(comment).toHaveProperty("comment_id", expect.any(Number));
                    expect(comment).toHaveProperty("votes", expect.any(Number));
                    expect(comment).toHaveProperty("created_at", expect.any(String));
                    expect(comment).toHaveProperty("author", expect.any(String));
                    expect(comment).toHaveProperty("body", expect.any(String));
                    expect(comment).toHaveProperty("article_id", expect.any(Number));
                })
            })
        })
        test("404: Responds with not found if given invalid int article_id", ()=>{
            return request(app).get("/api/articles/9999/comments").expect(404).then(({body}) =>{
                const {message} = body;
                expect(message).toEqual("Not Found");
            })
        }) 
        test("400: Responds with bad request when given invalid article_id", ()=>{
            return request(app).get("/api/articles/HELLO/comments").expect(400).then(({body}) =>{
                const {message} = body;
                expect(message).toEqual("Bad Request");
            })
        })
        test("200: Responds with empty array when given valid article_id with no article", ()=>{
            return request(app).get("/api/articles/4/comments").expect(200).then(({body}) =>{
                const {comments} = body;
                expect(comments).toEqual([]);
            })
        })
        test("200: Responds with empty array when given valid article_id with no comments", ()=>{
            return request(app).get("/api/articles/7/comments").expect(200).then(({body}) =>{
                const {comments} = body;
                expect(comments).toEqual([]);
            })
        })
    })
    
    describe("POST /api/articles/:article_id/comments", ()=>{
        test("201: Responds with newly added comment", ()=>{
            const newComment = {
                username: "ronaldb123",
                body: "test comment"
            }
            return request(app).post("/api/articles/1/comments").send(newComment).expect(201).then(({body})=>{
                const {comment} = body;
                const expected = {
                    comment_id: expect.any(Number),
                    article_id: 1,
                    author: "ronaldb123",
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                    body: "test comment"
                }
                
                expect(comment).toHaveLength(1);
                expect(comment[0]).toMatchObject(expected);
            })
        })
        test("400: Responds with bad requests for invalid article_id", ()=>{
            const newComment = {
                username: "ronaldb123",
                body: "test comment"
            }
            return request(app).post("/api/articles/hello/comments").send(newComment).expect(400).then(({body}) =>{
                const {message} = body;

                expect(message).toEqual("Bad Request");
            })
        })
        test("404: Responds with not found for invalid body", ()=>{
            const newComment = {
                username: "",
                body: "",
                name: ""
            }
            return request(app).post("/api/articles/1/comments").send(newComment).expect(404).then(({body}) =>{
                const {message} = body;

                expect(message).toEqual("Not Found");
            })
        })
    })
})
