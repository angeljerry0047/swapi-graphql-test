Front-End Test Project By Eric Lee
=====================

## Set Up SWAPI GraphQL Wrapper

 1. follow instruction frmo this repo:   https://github.com/graphql/swapi-graphql

 2. after install graphql wrapper on local, you will get endpoint(ex: http://localhost:8080/ or Similar; the actual port number will be printed to the console)

 3. use this endpoint for API integration.

Otherwise, deploy on heroku to get simple endpoint from global server.

## Getting Started

Install dependencies with

```sh
npm install
```

Replace API_End_Point into url from printed on local above(ex: http://localhost:8080/).
Path of file - src/constants.js
```
export const API_End_Point = <your API endpoint>;
```

Run react application

```
npm start
```

## How to use app

1. search function 
   enter any string in searchinput, click search button(icon), app display filtered datas.
   empty searchinput , and click search icon again, app display all datas.

2. click button "Sort By Name"
   rearrange datas by name.

3. favorite button
    clickable favorite buttons to change state.

4. pagination function by 10 rows per page.

5. save favorite data on localstorage(coming soon)

## Unit Test

In package.json, you can see.

```
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.3.2",
    "@testing-library/user-event": "^7.1.2",
```