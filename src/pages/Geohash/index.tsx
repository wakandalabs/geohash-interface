import {SimpleGrid, Stack, Text} from "@chakra-ui/react";
import {FC} from "react";
import GeohashItem from "./GeohashItem";
import {useLocation} from "react-router-dom";

export const Geohash = () => {
  const alphabets = [
    'b', 'c', 'f', 'g', 'u', 'v', 'y', 'z',
    '8', '9', 'd', 'e', 's', 't', 'w', 'x',
    '2', '3', '6', '7', 'k', 'm', 'q', 'r',
    '0', '1', '4', '5', 'h', 'j', 'n', 'p'
  ]

  const { pathname } = useLocation()

  return (
    <SimpleGrid columns={8}>
      { alphabets.map((item) => (
        <GeohashItem key={item} alphabet={item} pathname={pathname}/>
      )) }
    </SimpleGrid>
  )
}

export default Geohash