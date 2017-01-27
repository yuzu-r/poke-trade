var IdleTradesContainer = React.createClass({
  getInitialState: function(){
    return (
      {
        cards: [],
        loadingMessage: 'You have no trades awaiting a response.'
      }
    )
  },
  componentDidMount() {
    //console.log('fetching idle trades from server');
    $.ajax(
      {
        url: '/idle',
        type: 'GET',
        success: (response) => {
          //console.log('what response?',response);
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
  cancelTrade(tradeId) {
    console.log('cancelling trade', tradeId);
    $.ajax(
      {
        url: '/cancel_trade',
        type: 'PATCH',
        data: {trade: {trade_id: tradeId}},
        success: (response) => {
          console.log('what response?',response);
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
  render(){
    return(
      <div className='container col-xs-10 col-xs-offset-1'>
        <div className='panel panel-success'>
          <div className='panel-heading'>
            <h3 className='panel-title'>Awaiting responses from other traders</h3>
          </div>
          <div className='panel-body'>
            <Collection isLoading={this.state.isLoading} 
                    loadingMessage={this.state.loadingMessage} 
                    cards = {this.state.cards}>
              <IdleTradesCaption cancelTrade={this.cancelTrade} />
            </Collection>
          </div>
        </div>
      </div>
    )
  }
});