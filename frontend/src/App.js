import "./App.css"
import React from "react"
import Home from "./pages/Home.js"
import Cities from "./pages/Cities.js"
import City from "./pages/City.js"
import Error404 from "./pages/Error404.js"
import SignUp from "./pages/SignUp.js"
import LogIn from "./pages/LogIn.js"
import Header from "./components/Header.js"
import Footer from "./components/Footer.js"
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom"
import {connect} from "react-redux"
import Settings from "./pages/Settings.js"

const App = (props) => {
  return (
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/cities" component={Cities}/>
        <Route path="/city/:id" component={City}/>
        {props.userToken && <Route path="/settings" component={Settings}/>}
        {!props.userToken && <Route path="/signUp" component={SignUp}/>}
        {!props.userToken && <Route path="/logIn" component={LogIn}/>}
        <Route path="/error404" component={Error404}/>
        {/* <Redirect to="/error404"/> */}
        <Redirect to="/"/>
      </Switch>
      <Footer/>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  return {
    userToken: state.users.token
  }
}

export default connect(mapStateToProps)(App)