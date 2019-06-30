import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Contact from "./Contact";
import Login from "./Login";
import { Provider } from 'react-redux';
import store from '../redux/store';


const Store = createStackNavigator({
  Login: { screen: Login, navigationOptions: { header: null }},
  Contact: { screen: Contact,navigationOptions: { header: null }}
});
const App=createAppContainer(Store);

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <App />
      </Provider>
    )
  }
}
