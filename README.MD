# Baterias Bernal e-Commerce

## Introduction

> Baterías Bernal is a battery store for all types of vehicles, which has been leading the market in the city of Corrientes for more than 50 years, and is currently undergoing a modernization process. Therefore, e-commerce will be an important part of this process and the owners expect this project to open up new markets and reach new customers.

> It requires a user to be able to register, upload their data, select and store it in a cart, and then purchase the product. It is also required to be able to make the purchase process as a guest user, i.e. without prior registration.

> During the search process, it is necessary to be able to filter by vehicle brand, model and motorization; by vehicle type; or by amperage, capacity or battery brand.

## Endpoints

### Bernal API has this endpoints:

> POST /api/v1/users/register to create a new user account. This endpoint requires a json object: {
>
> > "email": "user@gmail.com",
> > "emailConfirm": "user@hotmail.com",
> > "password": "Qwerty123!",
> > "passwordConfirm": "Qwerty123!"
> > }
> > This user will be actived by default and will not be an administrator account.
> > Password minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1,

> POST /api/v1/users/login to login to a user account. This endpoint requires a json object: {
>
> > "email": "lisaSimpson@gmail.com",
> > "password": "Qwerty123!",
> > "rememberMe": true
> > }

> PUT /api/v1/users to update an user information. This endpoint requires a token that have to be provided by the client through the request header, it is a Bearer Token, and accepts a json object with the following fields, which are not requires anyone: {
>
> > "avatar": "IMG_2197.jpg",
> > "email": "user@gmail.com",
> > "password": "Qwerty123!",
> > "name": "User",
> > "middleName": "Jay",
> > "lastName": "Simpson",
> > "phoneNumber": "3624444544",
> > "cellphone" : "3624123456",
> > "address": "Av. Siempreviva 742",
> > "postalCode": "3500"
> > "city": "Springfield",
> > "province": "Texas",
> > "isActive": "true",
> > }

> GET /api/v1/users/all to get all users who are register. This endpoint requires a token that have to be provided by the client through the request header, it is a Bearer Token and it will be used by admin users only.

> GET /api/v1/users/ to get an user who are register. This endpoint requires a token that have to be provided by the client through the request header, it is a Bearer Token.

> GET /v1/products search every product in the DB, this endpoint is ideal for list al the products with a specificate order.
