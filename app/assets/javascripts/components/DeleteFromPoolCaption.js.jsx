var DeleteFromPoolCaption = React.createClass({
  /* don't allow user to remove from pool if a trade is pending */
  render(){
    var tradeElement = 'Trade Pending!';
    if (this.props.isAvailable) {
      tradeElement =  <button className='btn btn-link' 
                        onClick={this.props.deleteMon.bind(null, this.props.id)}>
                        Remove from Trade Pool
                      </button>           
    }        
    return (
      <div>
        <span className='pokemon-name'>{this.props.name}</span>
        <br/>
        {tradeElement}
      </div>
    );
  }
});

