# Ron-News

This is the backend project API for the purpose of accessing and providing news data.

## Description

This API project is part of the NorthCoders course backend project phase with making an entire backend service for information on news data that will provide the information for the frontend project phase.

Link to the hosted API [Ron-News](https://ron-news.onrender.com);

## Getting started

### Cloning Repository

If you want to commit and make changes then fork before cloning.

Run the following to terminal:

```
git clone https://github.com/RonaldB123/Ron-News.git
```

### Dependencies

Run the following in terminal: 

```
npm install
```

Node and Postgres versions:

The Node version used in project *v20.2.0*. 

The Postgres version used in project *v14.9*. 

### Environment variable:

- To access the database, first run `npm setup-dbs` to create the databases
- Create two files, `.env.development` and `.env.test`
- Write inside .env.development, `PGDATABASE = nc_news`
- Write inside .env.test, `PGDATABASE = nc_news_test`

### Seeding database

Run the following in terminal:

```
npm run seed
```

### Running tests

In order to run tests you will need to have [jest](https://jestjs.io/docs/getting-started),  [supertest](https://www.npmjs.com/package/supertest) and [jest-sorted](https://www.npmjs.com/package/jest-sorted).

Run the following in terminal to run tests:

```
npm test app.test.js
```