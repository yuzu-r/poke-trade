var Test = React.createClass({
  getInitialState() {
    return (
      {
        showTradeConfirmation: false,
        tradeConfirmationMsg: '',
        tradeFor: null
      }
    )
  },
  acceptTrade(){
    var desiredCard = this.state.tradeFor;
    var tradeId = this.state.tradeId;
    $.ajax(
      {
        url: '/accept',
        type: 'PATCH',
        data: {trade: {trade_id: tradeId, responder_card_id: desiredCard}},
        success: (response) => {
          if (response.success) {
            Turbolinks.visit('/');
          }
        },
        fail: (response) => {
          console.log('fail', response.responseText);
        }
      }
    )      
  },
  handleChoice(cardId,name,tradeId){
    var msg = "You're trading " + this.props.desiredCard + ' for ' + name + ', ok?';
    this.setState({
      showTradeConfirmation: true, 
      tradeConfirmationMsg: msg,
      tradeFor: cardId,
      tradeId: tradeId
    });
  },
  hideTradeConfirmation(){
    this.setState({
      showTradeConfirmation: false,
      tradeConfirmationMsg: '',
      tradeFor: null    
    })
  },
  render(){
    var els = null;
    var self = this;
    els = this.props.cards.map(function(c, index){
      return(
        <TestItem key={index} 
                  name={c.name} 
                  source={c.source}
                  id={c.id}
                  tradeId={self.props.tradeId}
                  handleChoice={self.handleChoice} />
      )
    });  
    var tradeConfirmation = null;
    if (this.state.showTradeConfirmation) {
      tradeConfirmation = <TradeConfirmation 
                            msg={this.state.tradeConfirmationMsg} 
                            hideTradeConfirmation={this.hideTradeConfirmation}
                            acceptTrade={this.acceptTrade}/> 
    }
    var traderLink = "/users/" + this.props.proposerId;
    return (
      <div>
        <p>Select one of these pokemon to complete the trade, or
          <button className='btn btn-link'
                  onClick={this.props.cancelTrade.bind(null, this.props.tradeId)}>                
            cancel the trade
          </button>.
        </p>
        <p><a href={traderLink}>view trader's profile</a></p>
        {tradeConfirmation}
        <div className="row">
          {els}
        </div>   
      </div>
    );
  }
});
