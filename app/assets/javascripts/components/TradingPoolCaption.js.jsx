var TradingPoolCaption = React.createClass({
  render(){
    console.log('trading pool caption',this.props);
    var tradeElement = 'Trade Pending!';
    if (this.props.isAvailable) {
      tradeElement =  <button className='btn btn-link' 
                              onClick={this.props.beginTrade.bind(null, this.props.id)}>
                        Initiate Trade
                      </button>;
    }
    var ownerLink = '/users/' + this.props.ownerId;
    return (
      <div>
        <span className='pokemon-name'>
          {this.props.name} (offered by Trader <a href={ownerLink}>{this.props.owner}</a>)
        </span>
        <br/>
        {tradeElement}
      </div>
    );
  }
});

