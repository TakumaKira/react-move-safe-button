# React Move Safe Button

## The motivation

It has been frustrating for me to mistakenly click a button which was sliding in the position of the button which I actually want to click. I figure out if the moved button was disabled for a second the user can just retry clicking without being distracted by unwanted action.
Developers might be able to implement this functionality by themselves, but it's somewhat tedious and I've never seen such a button, so I decided to build this and publish for other developers.
I chose React as the framework for this component because I'm a React developer and I believe it's most efficient to use most popular frontend framework to improve UX of many web applications all over the world.
I aimed to make this as simple as possible along with offering flexibility which most developers require when applying this to their projects.
Happy coding!

## Demo for developers

You can try [here](https://codesandbox.io/s/react-move-safe-button-demo-3rjx6d)!

## How to use

You can learn how to use this component from [Demo app code](/src/Demo/index.tsx), [E2E test code](/src/ReactMoveSafeButton/index.cy.tsx) and JSDOC of the properties(you can check them out by hovering over props inside modern IDEs like VSCode).

## NPM commands

### `yarn` or `yarn install`

Obviously you need to run this before running any other command.

### `yarn start:demo`

Starts demo app.

### `yarn build`

Builds the component for publishing to NPM.

### `yarn build:demo`

Builds demo app for deploying to hosting server.

### `yarn test`

Runs all of main E2E tests and supplemental unit tests.

### `yarn test:jest:dev`

Runs unit tests which watch the changes(Run this along with touching component's code).

### `CYPRESS_RECORD_KEY=<cypress-cloud-project-key> yarn test:cypress:ci`

Runs and upload the results to Cypress Cloud([Here](https://cloud.cypress.io/projects/vpgii8/) is mine).

### `yarn test:cypress:open`

Opens Cypress testing tools(Run this along with touching component's code).
