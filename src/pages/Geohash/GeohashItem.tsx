import {FC, useCallback, useEffect, useState} from "react";
import {Stack, Text} from "@chakra-ui/react";
import {useLocation, useNavigate} from "react-router-dom";
import {useGeohashContract} from "../../hooks/useContract";
import {BigNumber} from "ethers";
import {shortenAddress} from "../../utils";

const GeohashItem: FC<{ pathname: string, alphabet: string}> = ({alphabet}) => {
  const navigate = useNavigate()
  const {pathname} = useLocation()
  const geohash = useGeohashContract()
  const [tokenId, setTokenId] = useState<string | undefined>(undefined)
  const [owner, setOwner] = useState<string | undefined>(undefined)
  const [hasChild, setHasChild] = useState<boolean | undefined>(undefined)

  const fetchTokenId = useCallback(async () => {
    if (!geohash) {
      setTokenId(undefined)
      return
    }
    try{
      const result = await geohash.tokenByURI(`${pathname.slice(1)}${alphabet}`)
      if (result) {
        setTokenId(BigNumber.from(result).toString())
      } else {
        setTokenId(undefined)
      }
    } catch (e) {
      setTokenId(undefined)
    }
  }, [geohash, pathname, alphabet])

  const fetchHasChild = useCallback(async () => {
    if (!geohash) {
      setHasChild(undefined)
      return
    }
    try{
      const result = await geohash.tokenByURI(`${pathname.slice(1)}${alphabet}0`)
      if (result) {
        setHasChild(true)
      } else {
        setHasChild(false)
      }
    } catch (e) {
      setHasChild(false)
    }
  }, [geohash, pathname, alphabet])

  const fetchOwner = useCallback(async () => {
    if (!geohash || !tokenId) {
      setOwner(undefined)
      return
    }
    try {
      const result = await geohash.ownerOf(tokenId)
      if (result) {
        setOwner(result)
      } else {
        setOwner(undefined)
      }
    } catch (e) {
      setOwner(undefined)
    }
  }, [tokenId])

  useEffect(() => {
    fetchTokenId()
  }, [fetchTokenId])

  useEffect(() => {
    fetchOwner()
  }, [fetchOwner])

  useEffect(() => {
    fetchHasChild()
  }, [fetchHasChild])

  return (
    <Stack bg='white' h='400px' w={'full'} boxShadow={'xs'} alignItems={"center"} justifyContent={"center"} cursor={hasChild ? "pointer" : ""}
           onClick={() => {
             if (hasChild) {
               navigate(`${pathname}${alphabet}`)
             }
           }}>
      <Text>{pathname.slice(1)}{alphabet}</Text>
      <Text>{tokenId?.slice(0,4)}...{tokenId?.slice(-4)}</Text>
      <Text>{owner ? shortenAddress(owner) : ''}</Text>
    </Stack>
  )
}

export default GeohashItem