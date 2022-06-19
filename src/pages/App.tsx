import React from "react"
import { Route, Switch } from "react-router-dom"
import Web3ReactManager from "../components/Web3ReactManager"
import Geohash from "./Geohash";
import {Stack} from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function App() {
  return (
    <Web3ReactManager>
      <Stack spacing={0} h={'100vh'}>
        <Header />
        <Switch>
          <Route exact strict path="/" component={Geohash} />
        </Switch>
        <Footer />
      </Stack>
    </Web3ReactManager>
  )
}

export default App
