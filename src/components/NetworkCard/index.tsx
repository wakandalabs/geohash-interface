import { Button, Menu, MenuButton, MenuItem, MenuList, useMediaQuery } from '@chakra-ui/react'
import { CHAIN_INFO, SupportedChainId } from '../../constants/chains'
import * as React from 'react'
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import {switchToNetwork} from "../../utils/switchToNetwork";
import {useCallback} from "react";

export const NetworkCard = () => {
  const { chainId, library } = useActiveWeb3React()
  const info = chainId ? CHAIN_INFO[chainId] : undefined
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')

  const menus = [
    CHAIN_INFO[SupportedChainId.MAINNET],
    CHAIN_INFO[SupportedChainId.RINKEBY],
  ]

  const handleChainSwitch = useCallback(
    (targetChain: number) => {
      if (!library?.provider) return
      switchToNetwork({provider: library.provider, chainId: targetChain})
        .then(() => console.log('success'))
        .catch((error) => {
          console.error('Failed to switch networks', error)
        })
    },
    [library]
  );

  if (!chainId || !info || !library) {
    return null
  }

  return (
    <Menu autoSelect={false}>
      <MenuButton
        as={Button}
        bg={'white'}
        color={'primary.500'}
        _hover={{ color: 'primary.500', bg: 'white' }}
        _active={{ color: 'primary.500', bg: 'white' }}
        fontSize={isLargerThan1024 ? 'md' : 'xs'}
        fontWeight={'medium'}
      >
        {info.label}
      </MenuButton>
      <MenuList borderRadius={'12px'} borderColor={'secondary.300'}>
        {menus.map((item) => (
          <MenuItem
            key={item.label}
            onClick={() => handleChainSwitch(item.chainId)}
            fontWeight={'medium'}
            isDisabled={item.chainId === chainId}
          >
            {item.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default NetworkCard
