var TradePool = React.createClass({
  getInitialState() {
    return {
      isLoading: true,
      loadingMessage: 'fetching pool from server...',
      cards: []
    }   
  },
  componentDidMount() {
    console.log('fetching trade pool from server');
    $.ajax(
      {
        url: '/pool',
        type: 'GET',
        success: (response) => {
          //console.log('what response from pool?',response);
          //console.log(response.cards);
          var cardCount = response.cards.length;
          if (cardCount === 0) {
            this.setState({isLoading: false, loadingMessage: ''})
          }
          else {
            this.setState({isLoading: false, cards: response.cards, loadingMessage: ''});
          }
        },
        fail: (response) => {
          console.log('fail', response.responseText);
        }
      }
    )    
  },
  beginTrade(card_id){
    console.log('want to trade!', card_id);
    $.ajax(
      {
        url: '/trades',
        type: 'POST',
        data: {
                trade: {proposer_card_id: card_id}
              },
        success: (response) => {
          console.log('trade create?',response);
          Turbolinks.visit('/');
        },
        fail: (response) => {
          console.log('trade create fail', response.responseText);
        }
      }
    )    
  },
  render(){
    return(
      <div>
        <h2>Trade Pool</h2>
        <p>{this.state.loadingMessage}</p>
        <p>Reminder: the trade pool does not include the pokemon from your own collection if you are signed in.</p>
        <Collection isLoading={this.state.isLoading} 
                    loadingMessage={this.state.loadingMessage} 
                    cards = {this.state.cards}
                    >
          <TradingPoolCaption beginTrade={this.beginTrade}/>
        </Collection>
      </div>
    )
  }
});