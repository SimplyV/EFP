import React from 'react';
import CommentsList from './CommentsList';
import Header from './Header';

class App extends React.Component{
  constructor(){
    super();

    this.state = {
      name: "Jhon"
    };
  }

  render(){
    return (
    <>
      <Header name={this.state.name}></Header>
      <CommentsList />
    </>)
  }

}

export default App;