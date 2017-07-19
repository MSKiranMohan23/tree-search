import React from 'react';
var Immutable = require('immutable');
var _ = require('underscore');

class Node extends React.Component {
  
  shouldComponentUpdate(nextProps, nextState) {
    return !Immutable.is(nextProps.item, this.props.item);
  }

  divStyle(item) {
    var indent = item.get('path').size;
    return {
      marginLeft: indent * 10 + "px"
    };
  }

	renderChild(item) {
		return React.createElement(Node, { item: item});
	}

	clickEvent(text){
		console.log(text);
	}

	render() {
		var item = this.props.item;
		var disabled = item.get('childNodes').size == 0;
		var collapsed = !item.get('expanded');
		var text = disabled ? "" : collapsed ? "+" : "-";

		return (
		React.createElement(
			"ul",
			{ style: this.divStyle(item),},
				React.createElement(
					"li",
					{'key':item.get('text'),ref:'xyz'},
					item.get('text')
				),
			item.get('expanded') ? item.get('childNodes').map(this.renderChild, this) : false
			)
		);
	}
}
export default Node;