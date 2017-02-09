class Trade extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        showTradeConfirmation: false,
        tradeConfirmationMsg: '',
        tradeFor: null
      };
    this.handleChoice = this.handleChoice.bind(this);
    this.hideTradeConfirmation = this.hideTradeConfirmation.bind(this);
    this.acceptTrade = this.acceptTrade.bind(this);
  }
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
        error: (response) => {
          console.log('fail', response.responseText);
          if (response.status == 401) {
            Turbolinks.visit('/devise/users/sign_in');
          }          
        }
      }
    )      
  }
  handleChoice(cardId,name,tradeId){
    var msg = "You're trading " + this.props.desiredCard + ' for ' + name + ', ok?';
    this.setState({
      showTradeConfirmation: true, 
      tradeConfirmationMsg: msg,
      tradeFor: cardId,
      tradeId: tradeId
    });
  }
  hideTradeConfirmation(){
    this.setState({
      showTradeConfirmation: false,
      tradeConfirmationMsg: '',
      tradeFor: null    
    })
  }
  render(){
    var els = null;
    var self = this;
    els = this.props.cards.map(function(c, index){
      return(
        <TradeItem key={index} 
                  name={c.name} 
                  source={c.source}
                  id={c.id}
                  tradeId={self.props.tradeId}
                  handleChoice={self.handleChoice}
                  isAvailable={c.is_available} />
      )
    });  
    var tradeConfirmation = null;
    if (this.state.showTradeConfirmation) {
      tradeConfirmation = <div>
                            <TradeConfirmation 
                            msg={this.state.tradeConfirmationMsg} 
                            hideTradeConfirmation={this.hideTradeConfirmation}
                            acceptTrade={this.acceptTrade}/> 
                            <br />
                          </div>
    }
    var traderLink = "/users/" + this.props.proposerId;
    var traderName = 'Trader ' + this.props.proposerName + "'s";
    return (
      <div>
        <p className='text'>Select a pokémon from {traderName} collection to complete this trade.</p>
        <p className='text'><a href={traderLink}>View {traderName} profile</a>, or
        <a role="button"
        onClick={this.props.cancelTrade.bind(null, this.props.tradeId)}> cancel the trade </a>
        if you aren't interested in their offer.</p>
        {tradeConfirmation}
        <div className="row">
          {els}
        </div>   
      </div>
    );
  }
};