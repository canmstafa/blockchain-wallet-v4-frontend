import React from 'react'
import styled from 'styled-components'

import { Text, NumberInput } from 'blockchain-info-components'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  height: 40px;
`
const Error = styled(Text)`
  position: absolute;
  display: block;
  top: -18px;
  right: 0;
  height: 15px;
`
const getErrorState = meta => {
  return meta.touched && meta.invalid ? 'invalid' : 'initial'
}

const NumberBox = props => {
  const errorState = getErrorState(props.meta)

  return (
    <Container className={props.className}>
      <NumberInput
        {...props.input}
        autoFocus={props.autoFocus}
        errorState={errorState}
        placeholder={props.placeholder}
      />
      {props.meta.touched &&
        props.meta.error && (
          <Error
            size='12px'
            weight={300}
            color='error'
            errorBottom={props.errorBottom}
          >
            {props.meta.error}
          </Error>
        )}
      {props.meta.touched &&
        !props.meta.error &&
        props.meta.warning && (
          <Error
            size='12px'
            weight={300}
            color='sent'
            errorBottom={props.errorBottom}
          >
            {props.meta.warning}
          </Error>
        )}
    </Container>
  )
}

export default NumberBox
