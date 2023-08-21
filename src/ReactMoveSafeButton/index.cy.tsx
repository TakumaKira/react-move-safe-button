/* eslint-disable @typescript-eslint/no-unused-expressions */

import React from 'react'
import ReactMoveSafeButton from './index'
import { CustomButton } from './types'

/**
 * Move of DOMRect cannot be detected in React Testing Library as all the elements don't have non-zero size.
 * That's why we need to use Cypress here instead.
 */

describe('<ReactMoveSafeButton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ReactMoveSafeButton />)
  })

  it('is not be able to clicked until `duration` time will be passed after it moved.', () => {
    const WRAPPER_ID = 'wrapper'
    const SPACER_ID = 'spacer'
    const DISABLE_DURATION = 100
    const label = 'label'
    const showButtonLabel = 'show'
    const TestComp = () => {
      const [show, setShow] = React.useState(false)
      return <div style={{display: 'flex', flexDirection: 'column'}} id={WRAPPER_ID}>
        <button
          onClick={() => setShow(true)}
        >
          {showButtonLabel}
        </button>
        {show && <div style={{height: 100, width: 100}} id={SPACER_ID} />}
        <ReactMoveSafeButton
          duration={DISABLE_DURATION}
        >
          {label}
        </ReactMoveSafeButton>
      </div>
    }
    cy.mount(<TestComp />)
    cy.get(`#${WRAPPER_ID}`).contains(label).should('be.disabled')
    cy.wait(DISABLE_DURATION + 1)
    cy.get(`#${WRAPPER_ID}`).contains(label).should('not.be.disabled')
    cy.get(`#${WRAPPER_ID}`).contains(showButtonLabel).click()
    cy.get(`#${WRAPPER_ID}`).contains(label).should('be.disabled')
    cy.wait(DISABLE_DURATION + 1)
    cy.get(`#${WRAPPER_ID}`).contains(label).should('not.be.disabled')
  })

  it('should trigger onChangeDisabled when disabled state changed.', () => {
    const WRAPPER_ID = 'wrapper'
    const SPACER_ID = 'spacer'
    const DISABLE_DURATION = 100
    const label = 'label'
    const showButtonLabel = 'show'
    function onChangeDisabled(isDisabled: boolean) {}
    const onChangeDisabledSpy = cy.spy(onChangeDisabled)
    const TestComp = () => {
      const [show, setShow] = React.useState(false)
      return <div style={{display: 'flex', flexDirection: 'column'}} id={WRAPPER_ID}>
        <button
          onClick={() => setShow(true)}
        >
          {showButtonLabel}
        </button>
        {show && <div style={{height: 100, width: 100}} id={SPACER_ID} />}
        <ReactMoveSafeButton
          duration={DISABLE_DURATION}
          onChangeDisabled={onChangeDisabledSpy}
        >
          {label}
        </ReactMoveSafeButton>
      </div>
    }
    cy.mount(<TestComp />)
    cy.wrap(onChangeDisabledSpy).should('have.callCount', 1)
    cy.wait(DISABLE_DURATION + 1)
    cy.wrap(onChangeDisabledSpy).should('have.callCount', 2)
    cy.get(`#${WRAPPER_ID}`).contains(showButtonLabel).click()
    cy.wrap(onChangeDisabledSpy).should('have.callCount', 3)
    cy.wait(DISABLE_DURATION + 1)
    cy.wrap(onChangeDisabledSpy).should('have.callCount', 4)
    cy.wrap(onChangeDisabledSpy).then($spy => {
      chai.expect($spy.args[0][0]).to.be.true;
      chai.expect($spy.args[1][0]).to.be.false;
      chai.expect($spy.args[2][0]).to.be.true;
      chai.expect($spy.args[3][0]).to.be.false;
    })
  })

  it('should be disabled if `true` is passed to disabled parameter.', () => {
    const WRAPPER_ID = 'wrapper'
    const DISABLE_DURATION = 100
    const label = 'label'
    const disableButtonLabel = 'disable'
    const TestComp = () => {
      const [disabled, setDisabled] = React.useState(false)
      return <div style={{display: 'flex', flexDirection: 'column'}} id={WRAPPER_ID}>
        <button
          onClick={() => setDisabled(true)}
        >
          {disableButtonLabel}
        </button>
        <ReactMoveSafeButton
          duration={DISABLE_DURATION}
          disabled={disabled}
        >
          {label}
        </ReactMoveSafeButton>
      </div>
    }
    cy.mount(<TestComp />)
    cy.get(`#${WRAPPER_ID}`).contains(label).should('be.disabled')
    cy.wait(DISABLE_DURATION + 1)
    cy.get(`#${WRAPPER_ID}`).contains(label).should('not.be.disabled')
    cy.get(`#${WRAPPER_ID}`).contains(disableButtonLabel).click()
    cy.get(`#${WRAPPER_ID}`).contains(label).should('be.disabled')
  })

  it('should render `Button` component if it is defined.', () => {
    const label = 'label'
    const BUTTON_ID = 'buttonId'
    const Button: CustomButton = (ref, disabled, buttonProps) =>
      <button ref={ref} disabled={disabled} {...buttonProps}>
        <div id={BUTTON_ID}>
          <span>
            {label}
          </span>
        </div>
      </button>
    cy.mount(<ReactMoveSafeButton Button={Button} />)
    cy.get(`#${BUTTON_ID}`).should('exist')
  })

  it('should pass attributes to the custom `Button` component if it is defined.', () => {
    const BUTTON_ID = 'buttonId'
    const Button: CustomButton = (ref, disabled, buttonProps) =>
      <button id={BUTTON_ID} ref={ref} disabled={disabled} {...buttonProps} />
    cy.mount(
      <ReactMoveSafeButton
        role="button"
        Button={Button}
      >
        Label
      </ReactMoveSafeButton>
    )
    cy.get(`#${BUTTON_ID}`).should('have.attr', 'role', 'button')
  })
})
