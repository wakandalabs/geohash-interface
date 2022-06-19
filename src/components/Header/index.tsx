import {Editable, EditableInput, EditablePreview, HStack, IconButton, Spacer, Text} from "@chakra-ui/react";
import {useLocation, useNavigate} from "react-router-dom";
import {FaRegUserCircle, FiCornerUpLeft, FiShare} from "react-icons/all";
import {useCallback, useEffect, useState} from "react";

export const Header = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchPath, setSearchPath] = useState(pathname)

  const updateSearchPath = useCallback(() => {
    setSearchPath(pathname)
  }, [pathname])

  useEffect(() => {
    updateSearchPath()
  }, [updateSearchPath])

  return (
    <HStack alignItems={"center"} p={2}>
      <Text fontWeight={"semibold"} onClick={() => navigate('/') } cursor={"pointer"}>Geohash</Text>
      <IconButton aria-label={''} icon={<FiCornerUpLeft />}
                  variant={"ghost"} borderRadius={8} size={'sm'}
                  disabled={pathname === '/'}
                  onClick={() => navigate(pathname.slice(0, -1) ?? '/')}/>
      <Editable value={searchPath} onSubmit={() => navigate(searchPath)}>
        <EditablePreview />
        <EditableInput onChange={(e) => setSearchPath(e.target.value)}/>
      </Editable>
      <Spacer />
      <IconButton aria-label={''} icon={<FiShare />} variant={"ghost"} borderRadius={8} size={'sm'} />
      <IconButton aria-label={''} icon={<FaRegUserCircle />} variant={"ghost"} borderRadius={8} size={'sm'}/>
    </HStack>
  )
}

export default Header