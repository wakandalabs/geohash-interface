import {FC, useCallback, useEffect, useState} from "react";
import {Stack, Text} from "@chakra-ui/react";
import {useLocation, useNavigate} from "react-router-dom";
import {useGeohash} from "../../hooks/useGeohash";
import {useGeohashContract} from "../../hooks/useContract";
import {BigNumber} from "ethers";

const GeohashItem: FC<{ pathname: string, alphabet: string}> = ({alphabet}) => {
  const navigate = useNavigate()
  const {pathname} = useLocation()
  const geohash = useGeohashContract()
  const [tokenId, setTokenId] = useState<string | undefined>(undefined)

  const fetchTokenId = useCallback(async () => {
    if (!geohash) return
    try{
      const result = await geohash.tokenByURI(`${pathname.slice(1)}${alphabet}`)
      if (result) {
        setTokenId(BigNumber.from(result).toString())
      }
    } catch (e) {
      setTokenId(undefined)
    }
  }, [geohash, pathname, alphabet])

  useEffect(() => {
    fetchTokenId()
  }, [fetchTokenId])

  return (
    <Stack bg='white' height='200px' boxShadow={'xs'} alignItems={"center"} justifyContent={"center"} cursor={"pointer"}
           onClick={() => navigate(`${pathname}${alphabet}`)}>
      <Text>{pathname.slice(1)}{alphabet}</Text>
      <Text>{tokenId?.slice(0,4)}...{tokenId?.slice(-4)}</Text>
    </Stack>
  )
}

export default GeohashItem