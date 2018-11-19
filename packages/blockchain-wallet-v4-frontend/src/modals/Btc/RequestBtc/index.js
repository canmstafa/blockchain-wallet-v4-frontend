import React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'

import { actions } from 'data'
import wizardProvider from 'providers/WizardProvider'
import modalEnhancer from 'providers/ModalEnhancer'
import RequestBtc from './template'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'

class RequestBtcContainer extends React.PureComponent {
  state = { receiveAddress: '' }

  componentDidMount () {
    this.props.resetStep()
    this.props.formActions.reset('requestBitcoin')
  }

  setReceiveAddress = addr => {
    this.setState({ receiveAddress: addr })
  }

  render () {
    const { receiveAddress } = this.state
    const { closeAll, step, position, total, ...rest } = this.props

    return (
      <RequestBtc position={position} total={total} closeAll={closeAll}>
        {step === 1 && (
          <FirstStep setReceiveAddress={this.setReceiveAddress} {...rest} />
        )}
        {step === 2 && <SecondStep receiveAddress={receiveAddress} {...rest} />}
      </RequestBtc>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  formActions: bindActionCreators(actions.form, dispatch)
})

const enhance = compose(
  connect(
    null,
    mapDispatchToProps
  ),
  modalEnhancer('RequestBtc'),
  wizardProvider('requestBtc', 2)
)

export default enhance(RequestBtcContainer)
