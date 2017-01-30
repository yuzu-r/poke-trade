var TradingPoolCaption = React.createClass({
  render(){
    //console.log('trading pool caption',this.props);
    var tradeElement = <button className='btn btn-default btn-small caption-button btn-none' disabled='true'>Trade Pending!</button>;
    if (this.props.isAvailable) {
      tradeElement =  <button className='btn btn-primary btn-small caption-button' 
                              onClick={this.props.beginTrade.bind(null, this.props.id)}>
                        Initiate Trade
                      </button>;
    }
    var ownerLink = '/users/' + this.props.ownerId;
    return (
      <div>
        <span className='pokemon-name'><b>{this.props.name}</b></span>
        <br />
        <span className='pokemon-trader'>Trader: <a href={ownerLink}>{this.props.owner}</a></span>
        <br/>
        {tradeElement}
      </div>
    );
  }
});

