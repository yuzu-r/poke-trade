var PendingResponseTradesContainer = React.createClass({
  getInitialState: function(){
    return (
      {
        cards: [],
        loadingMessage: 'You have no trades awaiting a response.'
      }
    )
  },
  componentDidMount() {
    console.log('fetching idle trades from server');
    $.ajax(
      {
        url: '/pending',
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
  render(){
    return(
      <div className='container col-xs-10 col-xs-offset-1'>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <h3 className='panel-title'>Trades awaiting your response</h3>
          </div>
          <div className='panel-body'>
            <Collection isLoading={this.state.isLoading} 
                    loadingMessage={this.state.loadingMessage} 
                    cards = {this.state.cards}>
              <PendingResponseTradesCaption cancelTrade={this.cancelTrade} />
            </Collection>
          </div>
        </div>
      </div>
    )
  }
});