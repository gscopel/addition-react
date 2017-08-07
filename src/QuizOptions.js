import React, { Component } from 'react';

class QuizOptions extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.callParentCheckOptions = this.callParentCheckOptions.bind(this);
  }
  //Function used to call to parent component for user click via child component
  callParentCheckOptions() {
    this.props.checkResults(this.props.options);
  }
  render() {
    return(
        <div className="fields animated zoomIn" onClick={this.callParentCheckOptions}><div className="field-block">{this.props.options}</div></div>
    );
  }
}

export default QuizOptions;
