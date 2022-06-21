import {SimpleGrid} from "@chakra-ui/react";
import GeohashItem from "./GeohashItem";
import {useLocation} from "react-router-dom";
import {useGeohash} from "../../hooks/useGeohash";

export const Geohash = () => {
  const alphabets = [
    '0', '2', '8', 'b',
    '1', '3', '9', 'c',
    '4', '6', 'd', 'f',
    '5', '7', 'e', 'g',
    'h', 'k', 's', 'u',
    'j', 'm', 't', 'v',
    'n', 'q', 'w', 'y',
    'p', 'r', 'x', 'z',
  ]

  const {pathname} = useLocation()
  const { totalSupply, myBalance } = useGeohash()

  return (
    <SimpleGrid columns={4} h={'full'} w={'full'} overflow={"scroll"} p={2}>
      {alphabets.map((item) => (
        <GeohashItem key={item} alphabet={item} pathname={pathname}/>
      ))}
    </SimpleGrid>
  )
}

export default Geohash