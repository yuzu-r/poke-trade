var IdleTradesCaption = React.createClass({
  /* don't allow user to remove from pool if a trade is pending */
  render(){
    console.log('props!',this.props);
    var tradeElement =  <button className='btn btn-link' 
                        onClick={this.props.cancelTrade.bind(null, this.props.trade_id)}>
                          Cancel Trade
                        </button>    ;               
    return (
      <div>
        <span className='pokemon-name'>{this.props.name}, awaiting response</span>
        <br/>
        {tradeElement}
      </div>
    );
  }
});

