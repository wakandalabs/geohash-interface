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

  const fetchTokenId = useCallback(async () => {
    if (!geohash) return
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

  const fetchOwner = useCallback(async () => {
    if (!geohash || !tokenId) return
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

  return (
    <Stack bg='white' height='200px' boxShadow={'xs'} alignItems={"center"} justifyContent={"center"} cursor={"pointer"}
           onClick={() => navigate(`${pathname}${alphabet}`)}>
      <Text>{pathname.slice(1)}{alphabet}</Text>
      <Text>{tokenId?.slice(0,4)}...{tokenId?.slice(-4)}</Text>
      <Text>{owner ? shortenAddress(owner) : ''}</Text>
    </Stack>
  )
}

export default GeohashItem