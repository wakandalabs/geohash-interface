import {FC} from "react";
import {Stack, Text} from "@chakra-ui/react";
import {useLocation, useNavigate} from "react-router-dom";

const GeohashItem: FC<{ alphabet: string, pathname: string }> = ({alphabet}) => {
  const navigate = useNavigate()
  const {pathname} = useLocation()

  return (
    <Stack bg='white' height='200px' boxShadow={'xs'} alignItems={"center"} justifyContent={"center"} cursor={"pointer"}
           onClick={() => navigate(`${pathname}${alphabet}`)}>
      <Text>{pathname.slice(1)}{alphabet}</Text>
    </Stack>
  )
}

export default GeohashItem