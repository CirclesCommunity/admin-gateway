# admin-gateway

## Overview
This is the Circles API gateway. It is written in typescript using the NestJS framework. The endpoints are mainly GraphQL endpoints, but there are also a few REST endpoints. All GraphQL requests go to `/graphql`. The gateway communicates with a set of microservices using REST APIs.

The gateway integrates a number of third party services:
- [Stripe](https://stripe.com) for handling payment webhook callbacks
- [Sentry](https://sentry.io) for error and exception logging
- [Google Passport OAuth2](https://www.passportjs.org/packages/passport-google-oauth20) for login with Google functionality

## Installation
Install the required dependencies

    npm i

Create a `.env` file in the project's root directory.

Create a `PORT` variable and set its value to the desired server port.

Create the following variables and set each to the corresponding microservice URL:

- `CIRCLE_USERS`
- `APPOINTMENT`
- `PATIENT`
- `ORGANIZATION`
- `INSURANCE`
- `MEDICAL`
- `NOTIFICATION`
- `WAREHOUSE`
- `PAYMENT`

Create a `JWT_SECRET` variable and populate it with a fairly strong JWT secret (a 64-character long secret is apprporiate)

You will need to obtain OAuth2 credentials (see [Setting up OAuth 2.0](https://support.google.com/cloud/answer/6158849)). Once you have the credentials, fill in the following variables in the `.env` file you created eariler:

- `CLIENT_ID`: The OAuth2 client ID
- `CLIENT_SECRET`: The OAuth2 client secret
- `CALLBACK_URL`: The URL to redirect to after logging in with google

You will also need to set up Sentry (follow this [quickstart guide](https://docs.sentry.io/product/sentry-basics/integrate-backend/getting-started)). After that you should have the Sentry datasource name (DSN). Create a `SENTRY_DSN` variable with the DSN value.

Finally, you need to set up Stripe. After creating an account, navigate to the "Webhooks" tab in the [Stripe Dashboard](https://dashboard.stripe.com/test/webhooks) and create a webhook for the `checkout.session.completed` event with the following configuration:

- Endpoint URL: `hms.circles.clinic/stripe/checkout-completed`
- Events: `checkout.session.completed`

Create a `STRIPE_PAYMENT_SUCCESS_WEBHOOK_SECRET` environment variable with the signing secret value.

## Documentation

This project uses the [code-first approach](https://docs.nestjs.com/graphql/quick-start#code-first) for laying out GraphQL schemas.

### Code structure

    + .github
      + workflows
        - main.yml ---------------- GitHub actions deployment workflow file
    + gateway-http
      - auth.controller.ts -------- auth controller
      - auth.controller.spec.ts --- unit tests for auth controller
    + src ------------------------- business logic
      - app.module.ts ------------- the main app module
      - app.controller.ts --------- the top-level controller
      - app.controller.spec.ts ---- tests for the top-level controller
      - app.service.ts ------------ the main app service
      - main.ts ------------------- the app entry point
      - sentry.filter.ts ---------- Sentry exception filter
    + test
      - app.e2e-spec.ts ----------- end-to-end tests
      - jest-e2e.json ------------- jest config
    - .eslintrc.js ---------------- ESLint config
    - .gitignore                    
    - .prettierrc ----------------- prettier config
    - nest-cli.json --------------- NestJS CLI config
    - package.json                  
    - package-lock.json
    - README.md ------------------- this README file
    - tsconfig.build.json --------- typescript config wrapper
    - tsconfig.json --------------- typescript config

All business logic lies inside the `src` directory. A module exists for every microservice, each of which contains a resolver file and a service file. All resolvers reside in their respective microservice's directory inside the `src` directory. For example, the appointment resolver resides in the `src/appointment` directory.

GraphQL methods are defined in the resolvers. Input-type objects reside in `src/<microservice_name>/dto`, while output-type objects reside in `src/<microservice_name>/entities`.

#### Authentication

The gateway uses JWTs for authenticating users.

### Naming conventions
The following naming conventions have been adopted:

#### Files

- Modules: `<module_name>.module.ts`, for example, `appointment.module.ts`
- Resolvers: `<resolver_name>.resolver.ts`, for example, `appointment.resolver.ts`
- Services: `<service_name>.service.ts`, for example, `appointment.service.ts`
- Output-type object files: `<object_name>.ts`, for example, `entry.ts`
- Input-type object files for "create" mutations: `<object_name>.input.ts`, for example `entry.input.ts`
- Input-type object files for "update" mutations: `update-<object_name>.input.ts`, for example, `update-entry.input.ts`

#### GraphQL object classes

- Resolvers: `<resolver_name>Resolver`, for example, `AppointmentResolver`
- Services: `<service_name>Service`, for example, `AppointmentService`
- Output-type object classes: `<object_name>`, for example, `Entry`
- Input-type object classes for "create" mutations: `<object_name>Input`, for example `EntryInput`
- Input-type object classes for "update" mutations: `Update<object_name>Input`, for example, `UpdateEntryInput`

### Coding conventions

#### GraphQL output-type objects

The following fields are common to most GraphQL output types:

- `tenantId:`: the ID of the organization to which the object belongs
- `createdBy`: the user ID of the user who created the object
- `status`: used to tell if the object is disabled (`"ENABLED"` | `"DISABLED"`)
- `isDeleted`: used to mark objects as deleted (`true` | `false`)
- `createdAt`: the time at which the object was created
- `updatedAt`: the time at which the object was last updated

#### GraphQL input types

Most GraphQL input types contain a `tenantId` field and a `createdBy` field. In mutations, these fields are always initialized with a default value `""` (empty string). The reason is that they are added automatically, and by simply omitting them the helper function used to populate them will not be able to find them in the object. Both fields are populated from the JWT auth token included in the request.

#### GraphQL request flow

All GraphQL requests are handled in their respective resolvers. The resolver passes the request to the service, which calls the corresponding microservice endpoint.

For create requests, all `tenantId` and `createdBy` fields in the request payload (including nested ones) are automatically populated with the data from the JWT.