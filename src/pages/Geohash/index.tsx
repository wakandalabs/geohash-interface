import {useGeohash} from "../../hooks/useGeohash";
import {Code, Stack} from "@chakra-ui/react";

export const Geohash = () => {
  const { totalSupply, allTokenIds } = useGeohash()

  return (
    <Stack p={4}>
      <Code p={2}>total supply: {totalSupply}</Code>
      <Code p={2}>All tokenIds: {allTokenIds.length}</Code>
    </Stack>
  )
}

export default Geohash