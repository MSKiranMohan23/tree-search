import React from 'react';
import Node from './node.jsx';
import Search from './search.jsx';

var Immutable = require('immutable');

class App extends React.Component {
	constructor(props, context) {
    super(props, context);

    this.state = {
     item: this.props.store.getState()
    };
    this.act_search = this.act_search.bind(this);
  }

	componentDidMount() {
		this.props.store.subscribe(this.storeUpdated);
	}

	storeUpdated() {
		//this.setState({ item: this.props.store.getState() });
	}

	act_search(newState){
		
		newState = Immutable.fromJS({newState})
		this.setState({item:newState.get('newState')});
		console.log(this.state.item);
	}
	render() {
	return ( 
		<div>
			This is an example for Tree view with search using React-Redux!!! <br /><br />
			<Search item={this.props.store} act_search ={this.act_search} />
			<Node item={this.state.item} />
		</div>
	);
	}
}
//<Node item={this.state.item} />
export default App;