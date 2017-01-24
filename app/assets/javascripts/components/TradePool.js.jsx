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
          console.log('what response?',response);
          console.log(response.cards);
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
  dummyDeleteMon(){
    console.log('need to reconfigure Collection to not render for trade pool');
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
                    deleteMon = {this.dummyDeleteMon} />
      </div>
    )
  }
});