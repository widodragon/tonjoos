import React, { Component } from 'react';
import {Alert, FlatList, TouchableNativeFeedback, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from "react-redux";
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, View, Content, Footer, Card, CardItem } from 'native-base';
import {getContact} from '../redux/actions/contacts';
class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parent : [],
      data : [],
      page : 1,
      lastRefresh : Date(Date.now()).toString()
    }
    this.refreshScreen = this.refreshScreen.bind(this);
  }
  async componentDidMount(){
    const token = await AsyncStorage.getItem('token');
    this.handleContact(token);
  }
  refreshScreen(){
    this.setState({lastRefresh:Date(Date.now()).toString()})
  }
  async handleContact(token){
    try{
      await this.props.dispatch(getContact(token)).then(()=>{
        let data = this.props.contacts.data.data;
        this.setState({parent:data});
        this.setState({data:data.slice(0,3)});
      });
    }catch(err){
      alert(err)
    }
  }
  handlePrevious(array,page_number){
    --page_number;
    if(page_number>=0){
      this.setState({data:array.slice(page_number * 3, (page_number + 1) * 3)});
      this.refreshScreen();
    }
  }
  handleNext(array,page_number){
    --page_number;
    this.setState({data:array.slice(page_number * 3, (page_number + 1) * 3)})
    if(this.state.data===null || this.state.data===[] ){
      alert("contact sudah habis");
    }else{
      this.refreshScreen();
    }
  }
  async onExit(){
    try{
      await AsyncStorage.removeItem('token');
      this.props.navigation.navigate('Login');
    }catch(e){
      alert("e");
    }
  }
  _onUpdate(id,user){
    alert("Haiii, aku " + user.first_name)
  }
  render() {
    return (
      <Container>
        <Header style={{backgroundColor:"grey"}}>
          <Left style={{flex:1}}/>
          <Body style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
            <Title>Contact List</Title>
          </Body>
          <Right style={{flex:1}}>
            <Button transparent onPress={() => this.onExit()}>
              <Icon name='exit' />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <FlatList
            data={this.state.data}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) =>
            <View>
              <TouchableNativeFeedback onPress={() => this._onUpdate(item.id, item)} >
                <Card>
                  <CardItem style={{flex:1,flexDirection:"row"}}>
                    <View style={{flex:0.4}}>
                      <CardItem cardBody>
                        <Image source={{uri: item.avatar}} style={{height: 200, width: 100, flex: 1}}/>
                      </CardItem>
                    </View>
                    <View style={{flex:0.4}}>
                      <View style={{width:250}}>
                        <Text>({item.first_name}) - ({item.last_name})</Text> 
                        <Text>({item.gender})</Text> 
                        <Text style={{color:"red"}}>({item.email})</Text> 
                      </View>
                    </View>
                  </CardItem>
                </Card>
              </TouchableNativeFeedback>
            </View>
            }
            keyExtractor={item => item.email}
          />
        </Content>
        <Footer style={{backgroundColor:"none"}}>
          <View style={{flex: 1, flexDirection: 'row', margin:10}}>
            <Button style={{flex: 0.5, borderRadius:5}} bordered info onPress={() => this.handlePrevious(this.state.parent,--this.state.page)}>
              <Text style={{color:"grey"}}>Previous</Text>
            </Button>
            <Button style={{flex: 0.5,borderRadius:5, justifyContent:"flex-end"}} bordered info onPress={() => this.handleNext(this.state.parent,++this.state.page)}>
              <Text style={{color:"grey"}}>Next</Text>
            </Button>
          </View>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts
  }
}


export default connect(mapStateToProps)(Contact)