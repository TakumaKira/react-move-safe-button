import { act, render, screen } from '@testing-library/react';
import Demo, { ADDING_BUTTON_DURATION, START_BUTTON_LABEL, STOP_BUTTON_LABEL } from '.';

/**
 * Move of DOMRect cannot be detected in React Testing Library as all the elements don't have non-zero size.
 * That's why we don't test if buttons are disabled right after their move.
 */

afterEach(() => {
  jest.clearAllTimers()
  jest.useRealTimers()
})

describe('<Demo />', () => {
  test('renders start and stop button', () => {
    render(<Demo />)
    const startButton = screen.getByText(START_BUTTON_LABEL)
    expect(startButton).toBeInTheDocument()
    const clearButton = screen.getByText(STOP_BUTTON_LABEL)
    expect(clearButton).toBeInTheDocument()
  })

  test('adds buttons if start button is clicked', async () => {
    jest.useFakeTimers()
    render(<Demo />)
    act(() => screen.getByText(START_BUTTON_LABEL).click())
    act(() => jest.advanceTimersByTime(ADDING_BUTTON_DURATION))
    expect(await screen.findByText('0')).toBeInTheDocument()
  })

  test('clears buttons when stop button is clicked', async () => {
    jest.useFakeTimers()
    render(<Demo />)
    act(() => screen.getByText(START_BUTTON_LABEL).click())
    act(() => jest.advanceTimersByTime(ADDING_BUTTON_DURATION))
    expect(await screen.findByText('0')).toBeInTheDocument()
    act(() => screen.getByText(STOP_BUTTON_LABEL).click())
    act(() => jest.advanceTimersByTime(ADDING_BUTTON_DURATION))
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })
})
