# REST API Test Automation Framework

## Features

<details>
  <summary>Framework features</summary><br />

- Full CRUD coverage - create, read, update (PUT/PATCH) and delete against a real persisting API
- OOP client layer - resource clients extend a shared `BaseClient` (auth, base URL, HTTP verbs)
- Data-driven - user data is faker-generated, unique per run
- Contract validation - responses parsed with zod schemas to catch API drift
- Negative testing - 401/404/422 flows, including unauthenticated requests
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
   put it into `.env` as `APP_TOKEN`. `.env` is git-ignored, so the token never gets committed.

</details>

---

## Framework details (Mocha, Chai, SuperTest)

<details>
  <summary>Implementation</summary><br />

The framework is built on several packages including [Mocha][3], [Chai][4] and [SuperTest][5].<br /><br />
Tests run against [GoRest][10] - a public demo REST API with real CRUD persistence.<br />
Records are scoped to your access token and reseeded daily; the free tier allows 90 requests/min,
the full suite uses around 12 requests per run.<br /><br />
The folder structure contains **config**, **data**, **helpers**, **specs** and **src**.<br />

- **Config** folder includes everything needed dependent on environment.<br />
- **Data** folder contains everything needed independent from environment.<br />
- **Helpers** folder contains reusable helpers.<br />
- **Specs** folder contains tests.<br />
- **Src** folder contains the HTTP client layer (`BaseClient` and resource clients such as `UsersClient`).<br /><br />

</details>

---

<details>
  <summary>Environment variables</summary><br />

Before test run you need to provide some environment variables such as **APP_TOKEN**, **APP_ENV** and **APP_TAG**.<br />

- **APP_TOKEN** is the GoRest access token, loaded from the git-ignored `.env` file (copy `.env.dist`).<br />
- **APP_ENV** defines environment to run tests against.<br />
- **APP_TAG** defines spec files to run.<br />

</details>

---

<details>
  <summary>Test runs</summary><br />

There are several ways to run tests.<br />

1. Directly via npm. In such a case the **APP_ENV** will be set as default.<br />

- All api tests: `npm test`
- Healthcheck only: `npm run test:healthcheck`
- Users specs only: `npm run test:users`

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
