import {HStack, IconButton, Spacer, Text} from "@chakra-ui/react";
import {useLocation, useNavigate} from "react-router-dom";
import {FaRegUserCircle, FiShare} from "react-icons/all";

export const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <HStack alignItems={"center"} p={2}>
      <Text fontWeight={"semibold"} onClick={() => navigate('/') } cursor={"pointer"}>Geohash</Text>
      <Text>{ location.pathname }</Text>
      <Spacer />
      <IconButton aria-label={''} icon={<FiShare />} variant={"ghost"} borderRadius={8} size={'sm'} />
      <IconButton aria-label={''} icon={<FaRegUserCircle />} variant={"ghost"} borderRadius={8} size={'sm'}/>
    </HStack>
  )
}

export default Header