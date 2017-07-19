import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as filters from './filter.jsx';

var Immutable = require('immutable');
var _ = require('underscore');



var ADD = "add";
var SEARCH = "search";
var i = "A"+0;

function act_add(text, path) {
  return { type: ADD, payload: { path: Immutable.fromJS(path), text: text } };
}

function act_search(text) {
	console.log(text);
 // return { type: SEARCH, payload: { text: text } };
}

var initialState = Immutable.fromJS({
  text: "test",
  childNodes: [],
  expanded: true,
  path: []
});

function pathForUpdate(ipath) {
  var path = ipath.toJS();
  var keys = _.range(path.length).map(function () {
    return 'childNodes';
  });
  return _.flatten(_.zip(keys, path));
}

function generateNode(data, idx) {
  if (!_.isNumber(idx)) {
    throw "Invalid Index: " + idx;
  }

  return Immutable.fromJS({
    text: data.text,
    childNodes: [],
    expanded: true,
    path: data.path.push(idx)
  });
}

function reducer() { 
  var state = arguments.length <= 0 || arguments[0] === undefined ? Immutable.fromJS(initialState) : arguments[0];
  var action = arguments[1];
  var initial  = Immutable.fromJS(initialState);
if(action.type == 'search'){
  //debugger
}
  var path;
  switch (action.type) {
    case ADD:
      path = pathForUpdate(action.payload.path);
      return state.updateIn(path, function (node) {
        return node.update('childNodes', function (list) {
          return list.push(generateNode(action.payload, list.size));
        });
      });
/*      case SEARCH: 
      var result = {};
      if(state !== {}){
        //var newState = Object.assign({}, state);
        result = state.mapEntries(function(item){
          var filter = {};
          if(typeof item[1] == 'object')
            if(item[1].size > 0){
              var element = item[1];
              var result = filters.filterTree(state.toJSON(), 'test0_0');
              filter = filters.expandFilteredNodes(result, 'test0_0');
              //result = searchTree(state, element.toJSON(), 'test0',initial);
              return filter;        
            }
         });
      }else{
        result = {};
      }

      return result;
*/

    default:
      return state;
  }
}

function searchTree(state, item, matchingTitle,initial){
  var ttt = {};
  //var newObj = Object.assign()
  ttt = item.map(function(element){
    debugger
     if(element.text.startsWith(matchingTitle)) {
    // console.log("ddd"); console.log(element)
       return Object.assign({}, state, { childNodes: element });
         // return ;
     }else if (element.childNodes != null){
          var i;
          var result = null;
          for(i=0; result == null && i < element.childNodes.length; i++){
            //  result = {};//searchTree(element.childNodes[i], matchingTitle);
          }
         // return result;
     }
   })
     return ttt;
}

var store = createStore(reducer);

store.dispatch(act_add("test0", []));
store.dispatch(act_add("test1", []));
store.dispatch(act_add("test2", []));
store.dispatch(act_add("test0_0", [0]));
store.dispatch(act_add("test0_1", [0]));
store.dispatch(act_add("test0_2", [0]));
store.dispatch(act_add("test1_0", [1]));
store.dispatch(act_add("test1_1", [1]));
store.dispatch(act_add("test1_2", [1]));
store.dispatch(act_add("test1_3", [1]));
store.dispatch(act_add("test1_4", [1]));
store.dispatch(act_add("test0_0_0", [0, 0]));
store.dispatch(act_add("test0_0_1", [0, 0]));
store.dispatch(act_add("test0_0_2", [0, 0]));
store.dispatch(act_add("test0_0_3", [0, 0]));
store.dispatch(act_add("test0_0_4", [0, 0]));
store.dispatch(act_add("test2_0", [2]));
store.dispatch(act_add("test2_0_0", [2, 0]));
store.dispatch(act_add("test2_0_1", [2, 0]));
store.dispatch(act_add("test2_0_0_0", [2, 0,0]));
store.dispatch(act_add("test2_0_0_1", [2, 0,0]));

//ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render((  
      <Provider store={store}> 
        <App store={store}/>
      </Provider> 
  ),
  document.getElementById('app')
)