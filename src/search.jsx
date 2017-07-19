import React from 'react';
import * as filters from './filter.jsx';

var newThis = {};
class Search extends React.Component {
   
   newThis : {}

   constructor(props, context) {
    super(props, context);

    this.state = {
      kiran: this.props.item.getState()
    };
  }

  componentDidMount() {
    this.props.item.subscribe(this.storeUpdated);
    this.newThis = this.props.item.getState();
  }

  storeUpdated() {
 
  //  this.setState({ item: this.props.item.getState() });
  }

  handleSearch(){
    var that = this;
    var existData = this.state.kiran;
    var searchKey = document.getElementById('searchKey').value;
    var result = {};
    
        result = existData.mapEntries(function(item){
          var filter = {};
          if(typeof item[1] == 'object')
            if(item[1].size > 0){
              var element = item[1]; 
              result = filters.filterTree(existData.toJSON(), searchKey);
              filter = filters.expandFilteredNodes(result, searchKey);
            
              that.props.act_search(filter);      
            }

         });
    
   // var obj = ({type: 'search', payload: {text: searchKey }})
   // this.props.item.dispatch(obj);

   
  }

  render() { 
    var that = this;
     return(
      <div>
          <input type="text" id='searchKey' /> <button onClick={that.handleSearch.bind(that)}>Search</button>
      </div>
      ); 
  }
}

export default Search;