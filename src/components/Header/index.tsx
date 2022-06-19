import {HStack, IconButton, Spacer, Text} from "@chakra-ui/react";
import {useLocation, useNavigate} from "react-router-dom";
import {FaRegUserCircle, FiCornerUpLeft, FiShare} from "react-icons/all";

export const Header = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <HStack alignItems={"center"} p={2}>
      <Text fontWeight={"semibold"} onClick={() => navigate('/') } cursor={"pointer"}>Geohash</Text>
      { pathname !== '/' && (
        <>
          <IconButton aria-label={''} icon={<FiCornerUpLeft />} variant={"ghost"} borderRadius={8} size={'sm'} onClick={() => navigate(pathname.slice(0, -1) ?? '/')}/>
          <Text fontSize={'sm'}>{ pathname }</Text>
        </>
      ) }
      <Spacer />
      <IconButton aria-label={''} icon={<FiShare />} variant={"ghost"} borderRadius={8} size={'sm'} />
      <IconButton aria-label={''} icon={<FaRegUserCircle />} variant={"ghost"} borderRadius={8} size={'sm'}/>
    </HStack>
  )
}

export default Header