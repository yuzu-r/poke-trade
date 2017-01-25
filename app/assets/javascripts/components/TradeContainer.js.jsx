var TradeContainer = React.createClass({
  render(){
    return(
      <div>
        <h2>Nothing here? Initiate a trade from the Trading Pool to get started!</h2>
        <PendingResponseTradesContainer />
        <IdleTradesContainer />
      </div>
    )
  }
});