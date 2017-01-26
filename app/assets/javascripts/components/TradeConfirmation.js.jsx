var TradeConfirmation = React.createClass({
  render(){
    return (
      <div>
        <span>{this.props.msg}</span>
        <br/>
        <button className='btn btn-primary'
                onClick={this.props.acceptTrade}>Confirm Trade</button>
        <button className='btn btn-default'
                onClick={this.props.hideTradeConfirmation}>No, actually</button>
      </div>
    );
  }
});

