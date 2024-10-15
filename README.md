# Webshop-Playwright-js
### [System Under Test (SUT)](https://automationexercise.com/) :
<img src="image.png" alt="image.png" width="700"/>

## Overview
This project leverages Playwright's capabilities to automate UI tests across different scenarios in a [webshop](https://automationexercise.com/) application, 
ensuring functionality, reliability, and user interface responsiveness.


## Built with
* [![Javascript][JAVASCRIPT]][JAVASRIPT-URL]
* [![Node.js][Node]][node-url]
* [![Playwright][Playwright]][Playwright-url]

## Prerequisites
Before you begin, ensure you have the following installed on your machine:  
    
**Node.js, npm, playwright and playwright/test**
```bash
node -v
npm -v
npx playwright --version
npm list @playwright/test
```

## Installation
1. Clone the repository:
```bash
git clone git@github.com:arvamartin/webshop-playwright-js.git
```
2.  Rename the file [simple.config.json](resources/simple.config.json) to config.json and fill in the credentials

3.  If they are not already installed:
```bash
npm init playwright@latest
npm install @playwright/test  
``` 
4. Run all tests and checked the report on: http://localhost:9323/
```bash
npx playwright test --reporter=html     
```

## Bug report
For detailed information about the bugs founded: [bug-report.md](bug-report.md)

## Test Details
* For information on user stories, refer to the file [user-stories.md](user-stories.md).

## Ongoing project...


[JAVASCRIPT]: https://shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=000&style=for-the-badge
[JAVASRIPT-URL]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[Node]: https://img.shields.io/badge/-node.js-darkgreen?style=for-the-badge&logo=node.js&logoColor=white
[node-url]:https://nodejs.org/en/download/package-manager
[Playwright]: https://img.shields.io/badge/-playwright-lightgreen?style=for-the-badge&logo=playwright&logoColor=white
[Playwright-url]: https://playwright.dev/

