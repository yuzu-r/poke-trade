class DeleteFromPoolCaption extends React.Component{
  render(){
    var tradeElement = <button className='btn btn-default btn-small caption-button btn-none' disabled='true'>Trade Pending!</button>;
    if (this.props.isAvailable) {
      tradeElement =  <button className='btn btn-danger btn-small caption-button' 
                              onClick={this.props.deleteMon.bind(null, this.props.id)}>
                        Remove
                      </button>;
    }
    return (
      <div>
        <span className='pokemon-name'>{this.props.name}</span>
        <br/>
        {tradeElement}
      </div>
    );
  }
};

