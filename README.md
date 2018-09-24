# Tax App

---

### Simple tax app with MKRN(Mongo, Koa, React, Node) stack.

---

Redux structure is based on the "[Redux Ducks](https://github.com/erikras/ducks-modular-redux)" style.

#### Motivation

As a freelancer, it is annoying to keep track on expense, income, who paid or not, and so forth. An Excel file is a simple solution, but it doesn't look nice...right? I would like to make a nice and simple app for my tax declaration.

#### Libraries

To make Redux more readable and concise, I used some helpful libraries.

- [Normalizr](https://github.com/paularmstrong/normalizr)
  &nbsp;
  APIs sometimes return nested objects, which asks you extra steps to copy them with the spread oerator, `Array.concat`, or `Object.assign`. With Normalizr, your data look like a relational database.
  &nbsp;
  A tipical nested data

  ```javascript
  {
    "id": "123",
    "author": {
      "id": "1",
      "name": "Paul"
    },
    "title": "My awesome blog post",
    "comments": [
      {
        "id": "324",
        "commenter": {
          "id": "2",
          "name": "Nicole"
        }
      }
    ]
  }
  ```

  This turns into like this:

  ```javascript
  {
    result: "123",
    entities: {
      "articles": {
        "123": {
          id: "123",
          author: "1",
          title: "My awesome blog post",
          comments: [ "324" ]
        }
      },
      "users": {
        "1": { "id": "1", "name": "Paul" },
        "2": { "id": "2", "name": "Nicole" }
      },
      "comments": {
        "324": { id: "324", "commenter": "2" }
      }
    }
  }
  ```

  Although this already looks much more organized, `articles, users, comments` are still objects. To make this even better, I use Immutable-js
  &nbsp;

- [Immutable-js](https://github.com/facebook/immutable-js)
  &nbsp;
  Immutable returns a new copy of object. For instance `Immutable.List().push()` returns a copy of List, and doesn't mutate the original List. This is very useful when dealing with nested objects.
  &nbsp;

  With Immutable, your reduer would look like:

  ```javascript
  return state.mergeIn(['first', 'second', action.someId], {
    forth: action.someValue
  })
  ```

  Instead of

  ```javascript
  return {
    ...state,
    first: {
      ...state.first,
      second: {
        ...state.first.second,
        [action.someId]: {
          ...state.first.second[action.someId],
          fourth: action.someValue
        }
      }
    }
  }
  ```

  On top of that, it has a nice memoization feature, with which you don't copy whole nested object. Please check the officia docs.

  &nbsp;
