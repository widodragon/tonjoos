import React, { Component } from 'react';
import {connect} from "react-redux";
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Container, Header, Content, Card, Item, Input, Form, Body, Button, Text, Left, Right, Title} from "native-base";
import {getLogin} from '../redux/actions/login';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username   : '',
      password   : '',
      token      : ''
    }
  }
  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener("didFocus", async ()=>{
      await AsyncStorage.getItem('token').then((value)=>{
        this.setState({token:value});
      });
      if(this.state.token===null || this.state.token === '' ){
        this.props.navigation.navigate('Login');
      }else{
        this.props.navigation.navigate('Contact');
      }
    });
  }
  componentWillMount(){
      if(this.state.token===null || this.state.token === '' ){
        this.props.navigation.navigate('Login');
      }else{
        this.props.navigation.navigate('Contact');
      }
  }
  async onLogin(){
    try{
      const data={
        username:this.state.username,
        password:this.state.password,
      };
      await this.props.dispatch(getLogin(data));
      AsyncStorage.setItem('token', this.props.login.login.token);
      this.props.navigation.navigate('Contact');
    }catch(e){
      alert("Please check your data again!");
    }
  }
  render() {
    return (
      <Container>
      <Header style={{backgroundColor:"grey"}}>
          <Left style={{flex:1}}/>
          <Body style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
            <Title>Tonjoo Test</Title>
          </Body>
          <Right style={{flex:1}}/>
      </Header>
        <Content padder>
            <Form>
                <Card transparent>
                  <Text> Username </Text>
                </Card>
                <Item regular>
                  <Input 
                  keyboardType="default"
                  underlineColorAndroid='transparent'
                  onChangeText={(username) => this.setState({username})}
                  />
                </Item>
                <Card transparent>
                  <Text> Password </Text>
                </Card>
                <Item regular>
                  <Input 
                  keyboardType="default"
                  secureTextEntry={true}
                  underlineColorAndroid='transparent'
                  onChangeText={(password) => this.setState({password})}
                  />
                </Item>
                <Card transparent />
                <Button full style={{backgroundColor:"grey"}} onPress={() => this.onLogin()}>
                  <Text>Login</Text>
                </Button>
            </Form>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}


export default connect(mapStateToProps)(Login)