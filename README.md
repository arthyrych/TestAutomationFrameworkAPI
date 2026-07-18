# REST and GraphQL API Test Automation Framework

## Features

<details>
  <summary>Framework features</summary><br />

- Full CRUD coverage - create, read, update (PUT/PATCH) and delete against a real persisting API
- GraphQL coverage - queries, variable-driven mutations and error-shape tests, sharing the same
  SuperTest + zod conventions as the REST suites
- OOP client layer - resource clients extend a shared `RestBaseClient` (REST) or `GraphqlBaseClient` (GraphQL)
- Data-driven - user data is faker-generated, unique per run
- Contract validation - responses parsed with zod schemas to catch API drift
- Negative testing - REST 401/404/422 flows and GraphQL parse/validation error shapes
- Multi-environment - config selected via `APP_ENV`, spec subsets via `APP_TAG`

</details>

## Environment

<details>
  <summary>Environment details</summary><br />

Needed software should be installed

- GIT - [Git download][1]
- Node.js 22 LTS version - [Node download][2]

To check all these items installed properly, run one by one in your terminal:

```shell
node -v;
npm -v;
git --version;
```

You should see versions for all these items, without any errors.
</details>

---

## Installation dependencies

<details>
  <summary>Installation steps</summary><br />

You should have access to the current repo. Preferable add a ssh key to your GitHub account.

1. Navigate to a folder in which framework will be stored, and run in your terminal copied link (with ssh key):

```shell
git clone ...
```

2. Navigate into downloaded repository folder

```shell
cd ...
```

3. Install all required dependencies:

```shell
npm install
```

4. Create your environment file:

```shell
cp .env.dist .env
```

5. Sign in at [GoRest][10] (GitHub/Google/Microsoft), generate an access token,<br />
   put it into `.env` as `APP_TOKEN`. `.env` is git-ignored, so the token never gets committed.<br />
   The token is needed only for the REST (GoRest) suites - `npm run test:graphql` works without it.

</details>

---

## Framework details (Mocha, Chai, SuperTest)

<details>
  <summary>Implementation</summary><br />

The framework is built on several packages including [Mocha][3], [Chai][4] and [SuperTest][5].<br /><br />
REST tests run against [GoRest][10] - a public demo REST API with real CRUD persistence.<br />
Records are scoped to your access token and reseeded daily; the free tier allows 90 requests/min,
the REST suites use around 12 requests per run.<br /><br />
GraphQL tests run against [GraphQLZero][11] - a public GraphQL API (no auth) with users queries and
mutations. Mutation persistence is faked - responses are realistic but nothing is stored - so the GraphQL
CRUD suite asserts on mutation responses instead of round-trip reads. The GraphQL suites use around
7 requests per run.<br /><br />
The folder structure contains **config**, **data**, **helpers**, **specs** and **src**.<br />
REST- and GraphQL-owned code lives in `rest/` and `graphql/` subfolders (in `src/`, `data/` and `specs/`);
shared files are labeled with a `// shared: REST + GraphQL` header comment.<br />

- **Config** folder includes everything needed dependent on environment.<br />
- **Data** folder contains everything needed independent from environment, split into `data/rest/` and
  `data/graphql/`.<br />
- **Helpers** folder contains reusable helpers.<br />
- **Specs** folder contains tests, split into `specs/rest/` and `specs/graphql/`.<br />
- **Src** folder contains the HTTP client layer: `src/rest/` (`RestBaseClient`, resource clients such as
  `UsersRestClient`) and `src/graphql/` (`GraphqlBaseClient`, `UsersGraphqlClient` with its query
  documents).<br /><br />

</details>

---

<details>
  <summary>Environment variables</summary><br />

Before test run you need to provide some environment variables such as **APP_TOKEN**, **APP_ENV** and **APP_TAG**.<br />

- **APP_TOKEN** is the GoRest access token, loaded from the git-ignored `.env` file (copy `.env.dist`).
  Needed only by the REST suites - GraphQL suites run without it.<br />
- **APP_ENV** defines environment to run tests against.<br />
- **APP_TAG** defines spec files to run: `all`, `graphql`, `healthcheck`, `rest` or `users`.<br />

</details>

---

<details>
  <summary>Test runs</summary><br />

There are several ways to run tests.<br />

1. Directly via npm. In such a case the **APP_ENV** will be set as default.<br />

- All api tests: `npm test`
- REST specs only: `npm run test:rest`
- GraphQL specs only: `npm run test:graphql`
- Healthchecks for both REST and GraphQL (tokenless): `npm run test:healthcheck`
- Users specs for both REST and GraphQL: `npm run test:users`

2. Via `testApi.sh` file and following the instructions there.<br />
   This way gives you a possibility to set **APP_ENV** and **APP_TAG** variables manually.<br />

3. Via GitHub Actions: run the **Run all tests** workflow manually from the Actions tab.<br />
   Requires the **APP_TOKEN** repository secret (Settings -> Secrets and variables -> Actions).<br />

</details>

---

<details>
  <summary>Reports</summary><br />

Main reporters are [JUnit][9] and [Spec][7].<br />
In order to work them together should be used [mocha-multi-reporters][8] package.<br />

</details>

---

[1]: https://git-scm.com/downloads
[2]: https://nodejs.org/en/
[3]: https://mochajs.org/
[4]: https://www.chaijs.com/
[5]: https://www.npmjs.com/package/supertest
[7]: https://mochajs.org/#reporters
[8]: https://www.npmjs.com/package/mocha-multi-reporters
[9]: https://github.com/michaelleeallen/mocha-junit-reporter
[10]: https://gorest.co.in/
[11]: https://graphqlzero.almansi.me/
