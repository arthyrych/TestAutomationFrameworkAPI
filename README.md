# REST API Test Automation Framework

## Environment
<details>
  <summary>Environment details</summary><br />

Needed software should be installed

* GIT - [Git download][1]
* Node.js 14th LTS version - [Node download][2]
* Yarn - [Yarn install][10]

To check all these items installed properly, run one by one in your terminal:
```shell
node -v;
npm -v;
git --version;
yarn --version;
```

You should see versions for all these items, without any errors.
</details>

***

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
yarn i
```
</details>

---

## Framework details (Mocha, Chai, SuperTest)

<details>
  <summary>Implementation</summary><br />

The framework is built on several packages including [Mocha][3], [Chai][4] and [SuperTest][5].<br /><br />
The folder structure contains **config**, **data**, **helpers** and **specs**.<br />
* **Config** folder includes everything needed dependent on environment.<br />
* **Data** folder contains everything needed independent from environment.<br />
* **Helpers** folder contains reusable helpers.<br />
* **Specs** folder contains tests.<br /><br />
</details>

---

<details>
  <summary>Environment variables</summary><br />

Before test run you need to provide some environment variables such as **APP_ENV** and **APP_TAG**.<br />
* **APP_ENV** defines environment to run tests against.<br />
* **APP_TAG** defines spec files to run.<br />
</details>

---

<details>
  <summary>Test runs</summary><br />

There are several ways to run tests.<br />
1. Directly via npm or yarn. In such a case the **APP_ENV** will be set as default.<br />
* All api tests: `npm test`

2. Via `testApi.sh` file and following the instructions there.<br />
This way gives you a possibility to set **APP_ENV** and **APP_TAG** variables manually.<br />

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
[10]: https://classic.yarnpkg.com/lang/en/docs/install/
