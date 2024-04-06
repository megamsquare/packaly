# Assessment Solution
## Description

This is an API base project that has 3 endpoint, and test

## Installation
- Start by installing NodeJS and npm if you haven't already done so. You can download it from [here](https://nodejs.org/en/).
- Install Docker and Docker compose to use the full functionality of the API . You can download it from [here](https://www.docker.com/).

### Running the app

- Start the project using Docker Compose:

```bash
docker-compose up -d
```

*** PS.
- The database image that is used in `docker-compose.yml` file is Mongo latest docker image version. 

### Test
- You can Run tests using the following command:

```bash
# install npm first
npm install

# unit tests
$ npm run test
```

### API Endpoints
#### POST /order
Create new order with dropoff and pickup address. Returns created order object.

Request(application/json): json
- Body
```bash
{
  "dropoff": {
    "address": "Oudenoord 330",
    "city": "Utrecht",
    "country": "Netherlands",
    "email": "example@gmail.com",
    "name": "Name",
    "zipcode": "1234 AB",
    "phonenumber": "+31612795443"
  },
  "pickup": {
    "address": "Oudenoord 330",
    "city": "Utrecht",
    "country": "Netherlands",
    "email": "example@gmail.com",
    "phonenumber": "+31612795443",
    "zipcode": "5678 XZ",
    "name": "Name"
  },
  "packages": [
    {
      "height": 50,
      "length": 20,
      "width": 10,
      "weight": 50
    },
	  {
      "height": 10,
      "length": 10,
      "width": 10,
      "weight": 5
    }
  ]
}
```

Response Status: 201 Created
- Body
```bash
{
  "order_id": "661123215e90b4bec83f91a9",
  "status": "CREATED",
  "price": 8.5
}
```

#### PATCH /order/:id
Update existing order status data by its id and status details

- Path Parameter:
- - `id` (string): Order ID (required)

Request:
- Body 
```bash
{
  "status": "PICKED_UP"
}
```

Response Status: 200 OK
- Body
```bash
{
  "order_id": "661123215e90b4bec83f91a9",
  "new_status": "PICKED_UP",
  "old_status": "CREATED"
}
```

#### GET /orders?address=[string]&zipcode=[string]
Get one specific restaurant by its id. Returns a single restaurant object if found or an error message otherwise

- Path Query:
- - `address` (string): dropoff address (required)
- - `zipcode` (string): dropoff (required)

Request:
- Example 
```bash
GET /orders?address=Oudenoord&zipcode=1234%20AB
```

Response Status: 200 OK
- Body
```bash
[
  {
    "_id": "661123215e90b4bec83f91a9",
    "dropoff": {
      "address": "Oudenoord 330",
      "city": "Utrecht",
      "country": "Netherlands",
      "email": "example@gmail.com",
      "name": "Name",
      "zipcode": "1234 AB",
      "phonenumber": "+31612795443"
    },
    "pickup": {
      "address": "Oudenoord 330",
      "city": "Utrecht",
      "country": "Netherlands",
      "email": "example@gmail.com",
      "name": "Name",
      "zipcode": "5678 XZ",
      "phonenumber": "+31612795443"
    },
    "packages": [
      {
        "height": 50,
        "length": 20,
        "width": 10,
        "weight": 50
      },
      {
        "height": 10,
        "length": 10,
        "width": 10,
        "weight": 5
      }
    ],
    "price": 8.5,
    "status": "PICKED_UP",
    "createdAt": "2024-04-06T10:25:37.685Z",
    "updatedAt": "2024-04-06T10:25:57.822Z",
    "__v": 0
  }
]
```
### Error Codes
#### 400 Bad Request:
- Invalid parameters in the request.
  
#### 404 Not Found:
- No restaurants found for the specified criteria.

#### 500 Internal Server Error:
- An unexpected error occurred on the server.

### Support

For more visual details, I have added swagger.
* Access the Swagger documentation at [http://localhost:3000/swagger](http://localhost:3000/swagger) for detailed information about the available endpoints, request parameters, and responses.

## Stay in touch

- Author - [Michael Mensah](https://github.com/megamsquare)
- Linkedin - [Michael Mensah](https://linkedin.com/in/megamsquare)
