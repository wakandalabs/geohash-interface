import {Link, Spacer, Stack, Text, Wrap, WrapItem} from "@chakra-ui/react";
import {FaGithub, FaDiscord} from "react-icons/all";

export const Footer = () => {
  const links = [
    { id: 0, icon: <FaDiscord size={24} /> , link: "https://discord.gg/hddy3D2ufY"},
    { id: 1, icon: <FaGithub size={24} />, link: "https://github.com/wakandalabs/geohash" },
  ]

  return (
    <Stack p={2} h={'full'}>
      <Wrap>
        { links.map((item) => (
          <WrapItem key={item.id}>
            <Link href={item.link} isExternal>
              { item.icon }
            </Link>
          </WrapItem>
        )) }
      </Wrap>
      <Spacer />
      <Text fontSize={"sm"}>Made with ❤️ by Wakanda Labs</Text>
    </Stack>
  )
}

export default Footer