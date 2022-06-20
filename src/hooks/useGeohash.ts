import {useCallback, useEffect, useMemo} from "react";
import {useGeohashContract} from "./useContract";
import {BigNumber} from "ethers";
import {atom, useRecoilState} from "recoil";
import useActiveWeb3React from "./useActiveWeb3React";

export const geohashTotalSupplyAtom = atom<number | undefined>({
  key: "geohash:totalSupply",
  default: undefined,
})

export const myGeohashBalanceAtom = atom<number | undefined>({
  key: "geohash:my:balance",
  default: undefined
})

export const myGeohashTokenIdsAtom = atom<string[]>({
  key: "geohash:my:tokenIds",
  default: []
})

export const useGeohash = () => {
  const geohash = useGeohashContract()
  const [totalSupply, setTotalSupply] = useRecoilState(geohashTotalSupplyAtom)
  const [myBalance, setMyBalance] = useRecoilState(myGeohashBalanceAtom)
  const [myTokenIds, setMyTokenIds] = useRecoilState(myGeohashTokenIdsAtom)
  const {account } = useActiveWeb3React()

  const fetchTotalSupply = useCallback(async () => {
    if (!geohash) return
    const result = await geohash.totalSupply()
    if (result) {
      setTotalSupply(BigNumber.from(result).toNumber())
    }
  }, [geohash])

  const fetchMyBalance = useCallback(async () => {
    if (!geohash || !account) return
    const result = await geohash.balanceOf(account)
    if (result) {
      setMyBalance(BigNumber.from(result).toNumber())
    }
  }, [geohash, account])

  const fetchMyTokenIds = useCallback(async () => {
    if (!geohash || !account || !myBalance) return
    for (let i=0; i< myBalance; i++) {
      const tokenId = await geohash.tokenOfOwnerByIndex(account, i)
      if (tokenId) {
        setMyTokenIds((myTokenIds) => [...myTokenIds, BigNumber.from(tokenId).toString()])
      }
    }
  }, [geohash, account, myBalance])

  useEffect(()=> {
    fetchTotalSupply()
  }, [fetchTotalSupply])

  useEffect(() => {
    fetchMyBalance()
  }, [fetchMyBalance])

  useEffect(() => {
    fetchMyTokenIds()
  }, [fetchMyTokenIds])

  return {
    totalSupply,
    myBalance,
    myTokenIds,
  }
}