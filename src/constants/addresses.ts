import { SupportedChainId } from './chains'

type AddressMap = { [chainId: number]: string }

export const GEOHASH_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: '0x842a901D2f4D7706EF51B89ee7d6b7ACd5b01D86',
}

export const WCO2_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: '',
}
