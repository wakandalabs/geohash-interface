import {useGeohash} from "../../hooks/useGeohash";
import {Code, Stack} from "@chakra-ui/react";

export const Geohash = () => {
  const { totalSupply, allTokenIds, myBalance, myTokenIds } = useGeohash()

  return (
    <Stack p={2}>
      <Code p={2}>total supply: {totalSupply}</Code>
      <Code p={2}>All tokenIds: {allTokenIds}</Code>
      <Code p={2}>my balance: {myBalance}</Code>
      <Code p={2}>My tokenIds: {myTokenIds}</Code>
    </Stack>
  )
}

export default Geohash