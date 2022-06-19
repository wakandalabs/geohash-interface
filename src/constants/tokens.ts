import { Token } from '@uniswap/sdk-core'
import { SupportedChainId } from './chains'
import {WCO2_ADDRESS} from "./addresses";

export const WCO2: { [chainId: number]: Token } = {
  [SupportedChainId.MAINNET]: new Token(SupportedChainId.MAINNET, WCO2_ADDRESS[SupportedChainId.MAINNET], 18, 'WCO2', 'WCO2'),
  [SupportedChainId.RINKEBY]: new Token(SupportedChainId.RINKEBY, WCO2_ADDRESS[SupportedChainId.RINKEBY], 18, 'WCO2', 'WCO2'),
}