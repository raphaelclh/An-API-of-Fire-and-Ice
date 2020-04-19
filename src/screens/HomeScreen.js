import React, { Component } from "react"
import { View,Text, StyleSheet, ScrollView, FlatList } from "react-native"
import { ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import ContainerList from "../components/ListComponent"

import {booksAction, charactersAction} from '../_actions';

class HomeScreen extends Component{
  constructor(props){
    super(props);
    this.renderLoading.bind(this);
    this.onClick.bind(this);
    // this.loadMore.bind(this);
    this.state ={
      characters:[],
      initialData:[],
      page:1,
      count:0
    }
  }

  //https://i.picsum.photos/id/100/200/300.jpg 

  componentDidMount(){
    this.props.getList().then(()=>{
      this.props.getCharacterList(this.props.bookCharacters)
    })
  }


  renderLoading(){
    if(this.props.loading){
      // console.log("HIHIHIH" +this.props.loading)
      // return <Spinner />
    }
  }

  onClick = (character)=>{
    // console.log(character)
    this.props.setCharacter(character)
    this.props.navigation.navigate('Details',character);
  }


  keyExtractor = (item,index) => index.toString();

  renderItem = ({ item,index }) =>{
    var characterId = item.url.slice(49,item.url.length)
    var avatarUrl = `https://i.picsum.photos/id/${characterId}/200/300.jpg`
   return( 
    <ListItem
      title={item.name}
      leftAvatar={{source:{uri:avatarUrl}}}
      bottomDivider
      chevron
      onPress={()=>this.onClick(item)}
    />
  )
}

    render(){   
        return(
        
           <View>        
               <FlatList 
               keyExtractor = {this.keyExtractor}
               data={this.props.characterList}
               renderItem={this.renderItem}
               />
           </View>
        )
        }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });


function mapStateToProps(state){
  const {bookCharacters,loading,error} = state.Books;
  const {characterList,cLoading, cError} = state.characterList
  // console.log(bookCharacters)
    return {
      bookCharacters,
      characterList,
      loading,
      error,
      cLoading,
      cError,
      
    };
}

const actionCreators = {
    getList: booksAction.getList,
    getCharacter: charactersAction.getCharacter,
    getCharacterList: charactersAction.getCharacterList,
    setCharacter:charactersAction.setCharacter,
    
}

export default connect(mapStateToProps,actionCreators)(HomeScreen);