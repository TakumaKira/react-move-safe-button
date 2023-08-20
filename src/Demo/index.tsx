import React from 'react';
import ReactMoveSafeButton from '../ReactMoveSafeButton'

export const ADDING_BUTTON_DURATION = 3000
export const START_BUTTON_LABEL = 'Start adding buttons'
export const STOP_BUTTON_LABEL = 'Clear all buttons'

function Demo() {
  const [ buttonList, setButtonList ] = React.useState<number[]>([])
  const [ isAddingNewButtons, setIsAddingNewButtons ] = React.useState(false)
  const intervalId = React.useRef<NodeJS.Timer>()
  const startAddingButtons = () => {
    setIsAddingNewButtons(true)
    intervalId.current = setInterval(() => setButtonList(c => {
      const indexToInsert = Math.round(Math.random() * c.length)
      const newList = [ ...c ]
      newList.splice(indexToInsert, 0, c.length)
      return newList
    }), ADDING_BUTTON_DURATION)
  }
  const clearAllButtons = () => {
    setIsAddingNewButtons(false)
    clearInterval(intervalId.current)
    setButtonList([])
  }
  const [ shouldBeDisabled, setShouldBeDisabled ] = React.useState(false)
  const handleChangeButtonDisabled = (isDisabled: boolean) => {
    setShouldBeDisabled(isDisabled)
  }
  React.useEffect(() => {
    return () => clearInterval(intervalId.current)
  }, [])
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>

      <button
        onClick={startAddingButtons}
        disabled={isAddingNewButtons}
      >
        {START_BUTTON_LABEL}
      </button>

      <button
        onClick={clearAllButtons}
        disabled={!isAddingNewButtons}
      >
        {STOP_BUTTON_LABEL}
      </button>

      {buttonList.map(i =>
        <ReactMoveSafeButton
          key={i} // This is required to make only moving buttons disabled.
          onChangeDisabled={handleChangeButtonDisabled}
          // disabled={shouldBeDisabled} // Uncomment this if you want all buttons to be disabled when new one is added.
          /** Uncomment this if you want to apply custom button component.
            Button={(ref, disabled, buttonProps) =>
              <button
                ref={ref}
                disabled={disabled}
                {...buttonProps}
              />
            }
           */
        >
          {i}
        </ReactMoveSafeButton>
      )}

    </div>
  );
}
export default Demo;
