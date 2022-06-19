import {HStack, Text} from "@chakra-ui/react";

export const Header = () => {
  return (
    <HStack alignItems={"center"} p={2}>
      <Text fontWeight={"bold"}>Geohash</Text>

    </HStack>
  )
}

export default Header