import React from "react"
import { CustomButton } from "./types"

export default function ReactMoveSafeButton({
  duration = 1000,
  onChangeDisabled,
  Button,
  ...buttonProps
}: {
  /** Click disabled duration after button moved in millisecond. */
  duration?: number
  /** Triggered when disabled state changes */
  onChangeDisabled?: (isDisabled: boolean) => void
  /**
   * Use this prop to customize the component.
   * @param {React.MutableRefObject<any>} ref - This method needs to take a reference to the component to get its position.
   * @param {boolean} disabled - This parameter is passed to control disable state of the component.
   * @param {React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>} buttonProps - Common button attributes passed to `ReactMoveSafeButton` can be passed through to your custom component.
   * @example
    <ReactMoveSafeButton
      Button={(ref, disabled, buttonProps) =>
        <button
          ref={ref}
          disabled={disabled}
          {...buttonProps}
        />
      }
    >
      Button Label
    </ReactMoveSafeButton>
   */
  Button?: CustomButton
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>): JSX.Element {

  const [rect, setRect] = React.useState<{top: number, right: number, bottom: number, left: number}>()
  const [ isDisabled, setIsDisabled ] = React.useState<boolean>()

  const ref = React.useRef<null | HTMLButtonElement>(null)
  const animationId = React.useRef<number>()

  const observe = React.useCallback(() => {
    setRect(currRect => {
      if (!ref.current) {
        return currRect
      }
      const { top, right, bottom, left } = ref.current.getBoundingClientRect()
      if (currRect !== undefined && (currRect.top === top && currRect.right === right && currRect.bottom === bottom && currRect.left === left)) {
        return currRect
      }
      return { top, right, bottom, left }
    })
    animationId.current = requestAnimationFrame(observe)
  }, [])

  React.useEffect(() => {
    observe()
    return () => { animationId.current && cancelAnimationFrame(animationId.current) }
  })

  React.useEffect(() => {
    setIsDisabled(true)
    setTimeout(() => setIsDisabled(false), duration)
  }, [rect])

  React.useEffect(() => { isDisabled !== undefined && onChangeDisabled?.(isDisabled) }, [isDisabled])

  return (
    Button?.(ref, buttonProps.disabled ?? isDisabled, buttonProps)
    ?? <button
      {...buttonProps}
      ref={ref}
      disabled={buttonProps.disabled || isDisabled}
    />
  );

}
