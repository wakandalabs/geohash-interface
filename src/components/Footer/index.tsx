import {Link, Spacer, HStack, Text} from "@chakra-ui/react";
import {FaGithub, FaDiscord, FaTwitter} from "react-icons/all";

export const Footer = () => {
  const links = [
    { id: 0, icon: <FaDiscord size={24} /> , link: "https://discord.gg/hddy3D2ufY"},
    { id: 1, icon: <FaGithub size={24} />, link: "https://github.com/wakandalabs/geohash" },
    { id: 2, icon: <FaTwitter size={24} />, link: "https://github.com/wakandalabs" }
  ]

  return (
    <HStack p={2} spacing={4}>
      <Text fontSize={"xs"}>Made with ❤️ by Wakanda Labs</Text>
      <Spacer />
      { links.map((item) => (
        <Link key={item.id} href={item.link} isExternal>
          { item.icon }
        </Link>
      )) }
    </HStack>
  )
}

export default Footer