import { render } from "@testing-library/react";
import ReactMoveSafeButton from ".";

/**
 * Move of DOMRect cannot be detected in React Testing Library as all the elements don't have non-zero size.
 * That's why we don't test if buttons are disabled right after their move.
 * We test it with Cypress tests.
 */

describe('<ReactMoveSafeButton />', () => {
  it('should exist', () => {
    expect(ReactMoveSafeButton).toBeTruthy()
  })

  it('should stop its observing method when the component is unmounted.', async () => {
    let count = 0
    const realRAF = requestAnimationFrame
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      count++
      return realRAF(callback)
    });
    const view = render(<ReactMoveSafeButton />)
    view.unmount()
    const firstCount = count
    await new Promise(resolve => setTimeout(resolve, 50))
    const secondCount = count
    expect(secondCount).toBe(firstCount)
  })
})
