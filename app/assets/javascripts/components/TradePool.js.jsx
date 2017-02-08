class TradePool extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      loadingMessage: 'fetching pool from server...',
      cards: []
    };
  }
  componentDidMount() {
    $.ajax(
      {
        url: '/pool',
        type: 'GET',
        success: (response) => {
          //console.log('what response from pool?',response);
          var cardCount = response.cards.length;
          if (cardCount === 0) {
            this.setState({isLoading: false, loadingMessage: ''})
          }
          else {
            this.setState(
              { isLoading: false, 
                cards: response.cards, 
                loadingMessage: ''
              }
            );
          }
        },
        error: (response) => {
          console.log('fail', response.responseText);
        }
      }
    )    
  }
  beginTrade(card_id){
    //console.log('want to trade!', card_id);
    $.ajax(
      {
        url: '/trades',
        type: 'POST',
        data: {
                trade: {proposer_card_id: card_id}
              },
        success: (response) => {
          //console.log('trade create?',response);
          Turbolinks.visit('/');
        },
        error: (response) => {
          console.log('trade create fail', response.responseText, response.status);
          if (response.status == 401) {
            Turbolinks.visit('/devise/users/sign_in');
          }
        }
      }
    )    
  }
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
      <div className="col-xs-10 col-xs-offset-1">
        {splash}
        <h2>Trading Pool</h2>
        <p className="text">Reminder: the trade pool does not include your own pokemon if you are signed in.</p>
        <Collection isLoading={this.state.isLoading} 
                    loadingMessage={this.state.loadingMessage} 
                    cards = {this.state.cards}
                    >
          <TradingPoolCaption beginTrade={this.beginTrade}/>
        </Collection>
      </div>
    )
  }
};