# Bean Scout

An app to get coffee recommendations, review and track coffees you've tasted and roasters/coffee shops.

## Back End

Express for now.

### Authentication

Here's how users work.

### Api Endpoints

These are the exposed routes and expected results.

#### POST /auth/register
```
Purpose: Creates a user
req.body => {
    username: String,
    email: String,
    displayName: String
    password String,
}
Returns on failure:
{
    status: 500,
    data: {
        errors: [{
            message: String,
            field: String
        }]
    }
}
Returns on success:
{
    status: 200,
    data: {
        user: {
            username: String,
            email: String
        }
    }
}
```

#### POST /auth/login
```
Purpose: authenticates local users
req.body => {
    username: String,
    password: String
}
Returns on success: {
    status: 200,
    data: {
        user: {
            username: String,
            displayName: String,
            email: String
        }
    }
}
Returns on failure: {
    status: 500,
    data: {
        message: "Invalid Credentials"
    }
}
```

## Front End

This is a component diagram.