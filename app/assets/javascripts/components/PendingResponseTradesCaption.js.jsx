var PendingResponseTradesCaption = React.createClass({
  render(){
    var tradeElement =  <button className='btn btn-link' 
                        >
                          Cancel Trade
                        </button>    ;               
    return (
      <div>
        <span className='pokemon-name'>{this.props.name}, find card to swap or cancel</span>
        <br/>
        {tradeElement}
      </div>
    );
  }
});

