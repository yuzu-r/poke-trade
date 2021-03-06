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
          this.setState({loadingMessage: response.responseText});
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
          //console.log('trade create?',response) // visit the trade pool whether success/fail
          //Turbolinks.visit('/');
          window.location = '/';
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
    var splash = <div>
      <div className="well well-lg col-xs-12 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1">
        <h2>Welcome to PokéTrader!</h2>
        <h3>Thanks for stopping by. How this works:</h3>
        <ul className="text">
          <li>Add pokémon that you want to trade away to your collection.</li>
          <li>Check out the Trading Pool to find pokémon you want to trade for.</li>
          <li>Have fun!</li>
        </ul>
        <p>
          <a className="btn btn-default"  href={this.props.signInPath} role="button">Sign in</a>
          &nbsp;
          <a className="btn btn-default"  href={this.props.signUpPath} role="button">Sign up</a>
          &nbsp;
          <a className="btn btn-default"  href='/about' role="button">More Details</a>
        </p>
      </div>
      <div className="clearfix"></div>
    </div>;
    return(
      <div className="col-xs-10 col-xs-offset-1">
        {splash}
        <h2>Trading Pool</h2>
        <p className="text">Reminder: the trade pool does not include your own pokémon if you are signed in.</p>
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