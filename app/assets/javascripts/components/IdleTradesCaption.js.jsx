class IdleTradesCaption extends React.Component{
  /* don't allow user to remove from pool if a trade is pending */
  render(){
    //console.log('idle cpation', this.props)
    var tradeElement =  <button className='btn btn-danger btn-small caption-button' 
                        onClick={this.props.cancelTrade.bind(null, this.props.trade_id)}>
                          Cancel Trade
                        </button>    ;
    var responderLink = '/users/' + this.props.ownerId;
    return (
      <div>
        <span className='pokemon-name'>
          {this.props.name}, awaiting response from <a href={responderLink}>{this.props.owner}</a>
        </span>
        <br/>
        {tradeElement}
      </div>
    );
  }
};