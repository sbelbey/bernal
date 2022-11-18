# Baterias Bernal e-Commerce

> Jira: https://sbelbey.atlassian.net/jira/software/projects/DECB/boards/1

> OneDrive: https://onedrive.live.com/?authkey=%21AMlUtg7hmY6yhCY&id=7D7742697C67D2BE%21309553&cid=7D7742697C67D2BE

> Figma: https://www.figma.com/file/Qb2QDOdtcfpyZoO0eDSjwQ/Web-bernal?node-id=0%3A1&t=DvZuhnbo0T68Dacm-0

## Introduction

> Baterías Bernal is a battery store for all types of vehicles, which has been leading the market in the city of Corrientes for more than 50 years, and is currently undergoing a modernization process. Therefore, e-commerce will be an important part of this process and the owners expect this project to open up new markets and reach new customers.

> It requires a user to be able to register, upload their data, select and store it in a cart, and then purchase the product. It is also required to be able to make the purchase process as a guest user, i.e. without prior registration.

> During the search process, it is necessary to be able to filter by vehicle brand, model and motorization; by vehicle type; or by amperage, capacity or battery brand.

## Endpoints

### Bernal API has this endpoints:

#### Users endpoints:

> POST /api/v1/users/register to create a new user account. This endpoint requires a json object:

> > {
> >
> > > "email": "user@gmail.com",
> > > "emailConfirm": "user@hotmail.com",
> > > "password": "Qwerty123!",
> > > "passwordConfirm": "Qwerty123!"
> >
> > }
> >
> > > This user will be actived by default and will not be an administrator account.
> > > Password minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1,

> POST /api/v1/users/login to login to a user account. This endpoint requires a json object:

> > {
> >
> > > "email": "lisaSimpson@gmail.com",
> > > "password": "Qwerty123!",
> > > "rememberMe": true
> >
> > }

> PUT /api/v1/users to update an user information. This endpoint requires a token that have to be provided by the client through the request header, it is a Bearer Token, and accepts a json object with the following fields, which are not requires anyone:

> > {
> >
> > > "avatar": "IMG_2197.jpg",
> > > "email": "user@gmail.com",
> > > "password": "Qwerty123!",
> > > "name": "User",
> > > "middleName": "Jay",
> > > "lastName": "Simpson",
> > > "phoneNumber": "3624444544",
> > > "cellphone" : "3624123456",
> > > "address": "Av. Siempreviva 742",
> > > "postalCode": "3500"
> > > "city": "Springfield",
> > > "province": "Texas",
> > > "isActive": "true",
> >
> > }

> GET /api/v1/users/all to get all users who are register. This endpoint requires a token that have to be provided by the client through the request header, it is a Bearer Token and it will be used by admin users only.

> GET /api/v1/users/ to get an user who are register. This endpoint requires a token that have to be provided by the client through the request header, it is a Bearer Token.

#### Products endpoints:

> POST /api/v1/products to create a new product. This endpoint requires a token that have to be provided by the client through the request header, it is a Bearer Token and it will be used by admin users only. Also it need a json with the following fields:

> > {
> >
> > > "name": "Batería 12x65", (Required)
> > > "brand": "Bernal", (Required)
> > > "model": "M28Kd", (Optional)
> > > "price": 12.50, (Required)
> > > "description": "Lorem ipsum dolor sit amet, consect", (Required)
> > > "origin": "Argentina", (Required)
> > > "maintenanceFree": false, (Optional)
> > > "waranty": 6, (Required)
> > > "voltage":12, (Optional)
> > > "capacity": 75, (Optional)
> > > "height": 17.6, (Optional)
> > > "width": 17.5, (Optional)
> > > "length": 27.7, (Optional)
> > > "stock": 10, (Required)
> > > "isActive": true, (Optional)
> > > "images": [ (Optional)
> > >
> > > > "images.jpg",
> > > > "images1.jpg",
> > > > "images2.jpg"
> > >
> > > ],
> > >
> > > > "categories": "Autos", (Required)
> > > > "Vehicles": [ (Optional)
> > >
> > > > "e3fb9c95-3f15-4f95-9e82-22f87d64d3d8",
> > > > "fd00dd96-e4a5-4960-b21b-58c1abec636a",
> > > > "f1016823-f699-4340-8040-bb407d73962c"
> > >
> > > ]
> >
> > }

> PUT /api/v1/products to update a new product. This endpoint requires a token that have to be provided by the client through the request header, it is a Bearer Token and it will be used by admin users only. Also it need a json with the following fields:

> > {
> >
> > > "name": "Batería 12x65", (Required)
> > > "brand": "Bernal", (Required)
> > > "model": "M28Kd", (Optional)
> > > "price": 12.50, (Required)
> > > "description": "Lorem ipsum dolor sit amet, consect", (Required)
> > > "origin": "Argentina", (Required)
> > > "maintenanceFree": false, (Optional)
> > > "waranty": 6, (Required)
> > > "voltage":12, (Optional)
> > > "capacity": 75, (Optional)
> > > "height": 17.6, (Optional)
> > > "width": 17.5, (Optional)
> > > "length": 27.7, (Optional)
> > > "stock": 10, (Required)
> > > "isActive": true, (Optional)
> > > "images": [ (Optional)
> > >
> > > > "images.jpg",
> > > > "images1.jpg",
> > > > "images2.jpg"
> > >
> > > ],
> > >
> > > > "categories": "Autos", (Required)
> > > > "Vehicles": [ (Optional)
> > >
> > > > "e3fb9c95-3f15-4f95-9e82-22f87d64d3d8",
> > > > "fd00dd96-e4a5-4960-b21b-58c1abec636a",
> > > > "f1016823-f699-4340-8040-bb407d73962c"
> > >
> > > ]
> >
> > }

> DELETE /api/v1/products/:id delete the product by id. This endpoint requires a token that have to be provided by the client through the request header, it is a Bearer Token.

> GET /api/v1/products/:id search an specific product in the DB, this endpoint can be use with a Bearer Token wich show the product with all it properties.

> GET /api/v1/products/ show all products in the DB paging, this endpoint can be use with a Bearer Token wich show the product with all it properties. Also, this endpoint accepts a param which is: ?page= to get an specific page.
