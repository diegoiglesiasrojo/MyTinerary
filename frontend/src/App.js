import "./App.css"
import React from "react"
import Home from "./pages/Home.js"
import Cities from "./pages/Cities.js"
import Error404 from "./pages/Error404.js"
import Header from "./components/Header.js"
import Footer from "./components/Footer.js"
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/Cities" component={Cities}/>
        <Route path="/Error404" component={Error404}/>
        <Redirect to="/Error404"/>
      </Switch>
      <Footer/>
    </BrowserRouter>
  )
}

export default App