import {Button, HStack, Spacer, Text} from "@chakra-ui/react";
import {useLocation, useNavigate} from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <HStack alignItems={"center"} p={2}>
      <Text fontWeight={"semibold"} onClick={() => navigate('/') } cursor={"pointer"}>Geohash</Text>
      <Text>{ location.pathname }</Text>
      <Spacer />
      <Button variant={'outline'}>
        Connect Wallet
      </Button>
    </HStack>
  )
}

export default Header