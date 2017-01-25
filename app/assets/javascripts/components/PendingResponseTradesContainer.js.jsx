var PendingResponseTradesContainer = React.createClass({
  render(){
    return(
      <div className='container col-xs-10 col-xs-offset-1'>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <h3 className='panel-title'>Trades awaiting your response</h3>
          </div>
          <div className='panel-body'>
            Here are trades that traders have proposed to you. Choose a card from the trader to close the deal, or reject the deal to allow your card back into the main trading pool.
          </div>
        </div>
      </div>
    )
  }
});