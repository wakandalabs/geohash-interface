import {Button, HStack, Spacer, Text} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {FaRegUserCircle} from "react-icons/all";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import {shortenAddress} from "../../utils";
import {myGeohashBalanceAtom} from "../../hooks/useGeohash";
import {useRecoilValue} from "recoil";
import NetworkCard from "../NetworkCard";
import ConnectWallet from "../ConnectWallet";

export const Header = () => {
  const navigate = useNavigate()
  const {account} = useActiveWeb3React()
  const myBalance = useRecoilValue(myGeohashBalanceAtom)

  return (
    <HStack alignItems={"center"} p={4} spacing={4}>
      <Text fontWeight={"semibold"} onClick={() => navigate('/')} cursor={"pointer"}>Geohash</Text>
      <Spacer/>

      <NetworkCard />

      {
        account ? (
          <Button leftIcon={<FaRegUserCircle/>}>
            {shortenAddress(account)}
          </Button>
        ) : (
          <ConnectWallet />
        )
      }
    </HStack>
  )
}

export default Header