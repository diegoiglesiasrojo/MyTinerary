import "./App.css"
import React from "react"
import Home from "./pages/Home.js"
import Cities from "./pages/Cities.js"
import Error404 from "./pages/Error404.js"
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/Cities" component={Cities}/>
        <Route path="/Error404" component={Error404}/>
        <Redirect to="/Error404"/>
      </Switch>
    </BrowserRouter>
  )
}

export default App