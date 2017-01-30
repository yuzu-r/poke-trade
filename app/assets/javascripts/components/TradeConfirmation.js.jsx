var TradeConfirmation = React.createClass({
  render(){
    return (
      <div>
        <span className="text">{this.props.msg}</span>
        <br/>
        <button className='btn btn-primary'
                onClick={this.props.acceptTrade}>Confirm Trade</button>&nbsp;&nbsp;
        <button className='btn btn-default'
                onClick={this.props.hideTradeConfirmation}>No, start over</button>
      </div>
    );
  }
});

