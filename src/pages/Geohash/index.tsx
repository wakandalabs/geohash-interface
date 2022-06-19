import {SimpleGrid, Stack, Text} from "@chakra-ui/react";
import {FC} from "react";

export const Geohash = () => {
  const alphabets = [
    'b', 'c', 'f', 'g', 'u', 'v', 'y', 'z',
    '8', '9', 'd', 'e', 's', 't', 'w', 'x',
    '2', '3', '6', '7', 'k', 'm', 'q', 'r',
    '0', '1', '4', '5', 'h', 'j', 'n', 'p'
  ]

  return (
    <SimpleGrid columns={8}>
      { alphabets.map((item) => (
        <GeohashItem key={item} alphabet={item}/>
      )) }
    </SimpleGrid>
  )
}

const GeohashItem: FC<{alphabet: string}> = ({alphabet}) => {
  return (
    <Stack bg='white' height='200px' boxShadow={'xs'} alignItems={"center"} justifyContent={"center"}>
      <Text>{alphabet}</Text>
    </Stack>
  )
}

export default Geohash