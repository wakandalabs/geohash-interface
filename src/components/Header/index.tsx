import {Button, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Spacer, Text} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {FaRegUserCircle} from "react-icons/all";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import {shortenAddress} from "../../utils";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {myGeohashBalanceAtom} from "../../hooks/useGeohash";
import {useRecoilValue} from "recoil";

export const Header = () => {
  const navigate = useNavigate()
  const {account} = useActiveWeb3React()
  const myBalance = useRecoilValue(myGeohashBalanceAtom)

  return (
    <HStack alignItems={"center"} p={4} spacing={4}>
      <Text fontWeight={"semibold"} onClick={() => navigate('/')} cursor={"pointer"}>Geohash</Text>
      <Spacer/>

      <Menu>
        {({isOpen}) => (
          <>
            <MenuButton isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon/>}>
              Network
            </MenuButton>
            <MenuList>
              <MenuItem>Rinkeby</MenuItem>
              <MenuItem>Polygon</MenuItem>
            </MenuList>
          </>
        )}
      </Menu>

      {
        account ? (
          <Button leftIcon={<FaRegUserCircle/>}>
            {shortenAddress(account)}
          </Button>
        ) : (
          <IconButton aria-label={''} icon={<FaRegUserCircle/>} borderRadius={8}/>
        )
      }
    </HStack>
  )
}

export default Header