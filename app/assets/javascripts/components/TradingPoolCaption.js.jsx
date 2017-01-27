var TradingPoolCaption = React.createClass({
  render(){
    var tradeElement = 'Trade Pending!';
    if (this.props.isAvailable) {
      tradeElement =  <button className='btn btn-link' 
                              onClick={this.props.beginTrade.bind(null, this.props.id)}>
                        Initiate Trade
                      </button>;
    }
    return (
      <div>
        <span className='pokemon-name'>{this.props.name} (Trader {this.props.owner})</span>
        <br/>
        {tradeElement}
      </div>
    );
  }
});

