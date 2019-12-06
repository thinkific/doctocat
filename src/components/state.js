import React, { useReducer } from 'react'

const initialState = {}

function reducer (state, newState) {
  return {
    ...state,
    ...newState
  }
}

function State({ children, defaultState }) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...defaultState
  })

  return (
    <>
      {typeof children === "function"
        ? children({...state, dispatch: (obj) => dispatch(obj) })
        : children}
    </>
  )
}

export default State
