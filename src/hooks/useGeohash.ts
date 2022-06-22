import {useCallback, useEffect} from "react";
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

export const geohashAllTokenIdsAtom = atom<string[]>({
  key: "geohash:all:tokenIds",
  default: []
})

export const myGeohashTokenIdsAtom = atom<string[]>({
  key: "geohash:my:tokenIds",
  default: []
})

export const geojsonMapAtom = atom<{ [geohash: string]: string }>({
  key: "geohash:geojson:map",
  default: {}
})

export const useGeohash = () => {
  const geohash = useGeohashContract()
  const [totalSupply, setTotalSupply] = useRecoilState(geohashTotalSupplyAtom)
  const [allTokenIds, setAllTokenIds] = useRecoilState(geohashAllTokenIdsAtom)
  const [myBalance, setMyBalance] = useRecoilState(myGeohashBalanceAtom)
  const [myTokenIds, setMyTokenIds] = useRecoilState(myGeohashTokenIdsAtom)
  const [geojson, setGeojson] = useRecoilState(geojsonMapAtom)

  const {account, chainId} = useActiveWeb3React()

  const fetchTotalSupply = useCallback(async () => {
    if (!geohash) {
      setTotalSupply(undefined)
      return
    }
    const result = await geohash.totalSupply()
    if (result) {
      setTotalSupply(BigNumber.from(result).toNumber())
    }
  }, [geohash, chainId])

  const fetchMyBalance = useCallback(async () => {
    if (!geohash || !account) {
      setMyBalance(undefined)
      return
    }
    const result = await geohash.balanceOf(account)
    if (result) {
      setMyBalance(BigNumber.from(result).toNumber())
    }
  }, [geohash, account, chainId])

  const fetchMyTokenIds = useCallback(async () => {
    if (!geohash || !account || !myBalance) {
      setMyTokenIds([])
      return
    }
    setMyTokenIds([])
    for (let i = 0; i < myBalance; i++) {
      const tokenId = await geohash.tokenOfOwnerByIndex(account, i)
      if (tokenId) {
        setMyTokenIds((myTokenIds) => [...myTokenIds, BigNumber.from(tokenId).toString()])
      }
    }
  }, [geohash, account, myBalance, chainId])

  const fetchAllTokenIds = useCallback(async () => {
    if (!geohash || !totalSupply) {
      setAllTokenIds([])
      return
    }
    setAllTokenIds([])
    for (let i = 0; i < totalSupply; i++) {
      const tokenId = await geohash.tokenOfOwnerByIndex(account, i)
      if (tokenId) {
        setAllTokenIds((allTokenIds) => [...allTokenIds, BigNumber.from(tokenId).toString()])
      }
    }
  }, [geohash, totalSupply, chainId])

  useEffect(() => {
    fetchTotalSupply()
  }, [fetchTotalSupply])

  useEffect(() => {
    fetchMyBalance()
  }, [fetchMyBalance])

  useEffect(() => {
    fetchMyTokenIds()
  }, [fetchMyTokenIds])

  useEffect(() => {
    fetchAllTokenIds()
  }, [fetchAllTokenIds])

  return {
    totalSupply,
    allTokenIds,
    myBalance,
    myTokenIds,
  }
}