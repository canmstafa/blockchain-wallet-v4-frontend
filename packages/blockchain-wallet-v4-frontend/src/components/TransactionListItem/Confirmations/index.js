import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { toString } from 'ramda'

import {
  Icon,
  Link,
  Text,
  TooltipHost,
  Tooltip
} from 'blockchain-info-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: 9;
  @media (min-width: 480px) {
    flex-direction: row;
  }
`
const ConfirmationsText = styled(Text)`
  * {
    white-space: nowrap;
  }
`

const TransactionTooltip = styled(TooltipHost)`
  position: relative;
  display: flex;
  justify-items: flex-start;
`
const IconWrapper = styled.div`
  display: flex;
  justify-items: center;
  margin-left: 4px;
  & > :last-child {
    display: inline;
  }
`

const explorers = {
  BTC: 'https://blockchain.info/tx',
  ETH: 'https://www.blockchain.com/eth/tx',
  BCH: 'https://blockchair.com/bitcoin-cash/transaction',
  XLM: 'https://stellarchain.io/tx'
}

const confirmations = {
  BTC: 3,
  BCH: 3,
  ETH: 12,
  XLM: 1
}

const Confirmations = props => {
  const { coin } = props
  const minConfirmations = confirmations[coin]

  return (
    <Wrapper>
      {props.confirmations >= minConfirmations ? (
        <Text size='14px' weight={300} color='received'>
          <FormattedMessage
            id='scenes.transactions.content.pages.listitem.confirmation.confirmed'
            defaultMessage='Transaction Confirmed'
          />
        </Text>
      ) : (
        <ConfirmationsText size='14px' weight={300} color='gray-3'>
          <FormattedMessage
            id='scenes.transactions.content.pages.listitem.confirmation.unconfirmed'
            defaultMessage='Pending: {count}/{total} Confirmations'
            values={{
              count: toString(props.confirmations),
              total: minConfirmations
            }}
          />
        </ConfirmationsText>
      )}
      <IconWrapper>
        {props.confirmations < minConfirmations && (
          <TransactionTooltip
            id='confirmations'
            data-iscapture='true'
            data-offset="{'left': 0.75}"
          >
            <Icon name='question-in-circle' />
          </TransactionTooltip>
        )}
        <Link href={`${explorers[coin]}/${props.hash}`} target='_blank'>
          <Icon
            name='open-in-new-tab'
            color='marketing-primary'
            cursor
            size='17px'
          />
        </Link>
      </IconWrapper>
      <Tooltip id='confirmations' offset={{ bottom: 8 }}>
        <FormattedMessage
          id='scenes.transactions.content.list.listitem.transactionunconfirmed'
          defaultMessage='Your transaction will be complete after it has {minConfirmations} confirmations.'
          values={{ minConfirmations }}
        />
        <span>&nbsp;</span>
        <Link
          href='https://support.blockchain.com/hc/en-us/articles/217116406-Why-hasn-t-my-transaction-confirmed-yet-'
          target='_blank'
          size='11px'
          weight={300}
          altFont
        >
          Learn more.
        </Link>
      </Tooltip>
    </Wrapper>
  )
}
Confirmations.propTypes = {
  confirmations: PropTypes.number.isRequired,
  hash: PropTypes.string.isRequired,
  minConfirmations: PropTypes.number.isRequired
}

export default Confirmations
