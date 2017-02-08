class TradeContainer extends React.Component{
  render(){
    return(
      <div>
        <div className="col-xs-10 col-xs-offset-1">
          <h3>Active Trades</h3>
          <h4>Nothing here? Initiate a trade from the <a href="/">Trading Pool</a> to get started!</h4>
        </div>
        <PendingResponseContainer />
        <IdleTradesContainer />
        <TradeHistoryContainer />
      </div>
    )
  }
};