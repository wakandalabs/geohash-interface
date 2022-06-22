import {IconButton, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {FaRegUserCircle} from "react-icons/all";
import {useWeb3React, UnsupportedChainIdError} from 'web3-react-core'
import {AbstractConnector} from '@web3-react/abstract-connector'
import {SUPPORTED_WALLETS} from "../../constants/wallet";
import {WalletConnectConnector} from '@web3-react/walletconnect-connector'
import {injected} from "../../connectors";
import {isMobile} from "../../utils/userAgent";

const ConnectWallet = () => {
  const {connector, activate} = useWeb3React()

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return SUPPORTED_WALLETS[key].name
      }
      return true
    })

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined
    }

    connector &&
    activate(connector, undefined, true).catch((error) => {
      if (error instanceof UnsupportedChainIdError) {
        activate(connector)
      }
    })
  }

  const getOptions = () => {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask

    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key]
      // check for mobile options
      if (isMobile) {
        if (!window.web3 && !window.ethereum && option.mobile) {
          return (
            <MenuItem key={key} onClick={() => {
                        option.connector !== connector && !option.href && tryActivation(option.connector)
                      }}>
              {option.name}
            </MenuItem>
          )
        }
        return null
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return (
              <MenuItem key={key} onClick={() => {
                const w = window.open('about:blank')
                // @ts-ignore
                w.location.href = 'https://metamask.io/'
              }}>
                Install Metamask
              </MenuItem>
            )
          } else {
            return null //dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && !isMetamask) {
          return null
        }
        // likewise for generic
        else if (option.name === 'Injected' && isMetamask) {
          return null
        }
      }

      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <MenuItem key={key} onClick={() => tryActivation(option.connector)}>
            {option.name}
          </MenuItem>
        )
      )
    })
  }

  return (
    <Menu>
      {({isOpen}) => (
        <>
          <MenuButton isActive={isOpen} as={IconButton} aria-label={''} icon={<FaRegUserCircle/>} borderRadius={8}>
            {isOpen ? 'Close' : 'Open'}
          </MenuButton>
          <MenuList>
            {getOptions()}
          </MenuList>
        </>
      )}
    </Menu>
  )
}

export default ConnectWallet