var TradePool = React.createClass({
  getInitialState() {
    return {
      isLoading: true,
      loadingMessage: 'fetching pool from server...',
      cards: []
    }   
  },
  componentDidMount() {
    $.ajax(
      {
        url: '/pool',
        type: 'GET',
        success: (response) => {
          console.log(this.props)
          console.log('what response from pool?',response);
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
    if (this.props.loggedIn) {
      var splash = null;
    }
    else {
      splash = <div>
        <div className="well well-lg col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2">
          <h2>Welcome to PokePost!</h2>
          <h3>Thanks for stopping by. Here's how to get in on the fun:</h3>
          <ul className="text">
            <li>Sign up. You need an account to join the action.</li>
            <li>Add pokemon that you want to trade away to your collection.</li>
            <li>Check out the Trading Pool to find pokemon you want to trade for.</li>
            <li>Have fun!</li>
          </ul>
          <p>
            <a className="btn btn-primary"  href={this.props.signUpPath} role="button">Sign up</a>
            &nbsp;
            <a className="btn btn-default"  href={this.props.signInPath} role="button">Sign in</a>
          </p>
        </div>
        <div className="clearfix"></div>
      </div>;
    }
    return(
      <div>
        <h2>Trade Pool</h2>
        {splash}
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