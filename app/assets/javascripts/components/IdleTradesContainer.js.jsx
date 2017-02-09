class IdleTradesContainer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        cards: [],
        loadingMessage: 'You have no trades awaiting a response.'
      }

  }
  componentDidMount() {
    $.ajax(
      {
        url: '/idle',
        type: 'GET',
        success: (response) => {
          //console.log('what response?',response);
          //console.log('idle trade contaier',response.cards);
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
  cancelTrade(tradeId) {
    //console.log('cancelling trade', tradeId);
    $.ajax(
      {
        url: '/cancel_trade',
        type: 'PATCH',
        data: {trade: {trade_id: tradeId}},
        success: (response) => {
          //console.log('what response?',response);
          if (response.success) {
            Turbolinks.visit('/');
          }
        },
        fail: (response) => {
          console.log('fail', response.responseText);
        }
      }
    )       
  }
  render(){
    return(
      <div className='container col-xs-10 col-xs-offset-1'>
        <div className='panel panel-success'>
          <div className='panel-heading'>
            <h3 className='panel-title'>Awaiting responses from other traders</h3>
          </div>
          <div className='panel-body'>
            <p className='text'>You proposed a trade for these pokémon.</p>
            <p className='text'>You can cancel the trade if the owner is taking too long to respond, or if you change your mind.</p>
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
};