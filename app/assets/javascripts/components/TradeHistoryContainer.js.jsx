class TradeHistoryContainer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
                  tradeHistory: [],
                  isLoading: true,
                  msg: 'fetching history from server...'
                 };
  }
  componentDidMount() {
    //console.log('fetching past trades from server');
    $.ajax(
      {
        url: '/successful_trades',
        type: 'GET',
        success: (response) => {
          //console.log('successful trades response, proposer: ',response);
          this.setState(
            {
              tradeHistory: response.trade_history,
              isLoading: false,
              msg: ''
            }
          ); 
        },
        error: (response) => {
          console.log('fail', response.responseText);
          this.setState({
            msg: response.responseText
          })
        }
      }
    )    
  }
  render(){
    var elTradeHistory;
    if (this.state.isLoading === true) {
      var elTradeHistory = <p>{this.state.msg}</p>;
    }
    else{
      var tradeHistoryData = this.state.tradeHistory;
      elTradeHistory = tradeHistoryData.map(function(t, index) {
        return(
          <div key={index}>
            <span>You traded {t.user_card_name} for {t.partner_card_name} on {t.trade_date}.</span>
          </div>
        )
      })
    }
    return (
      <div className='container col-xs-10 col-xs-offset-1'>
        <div className='panel panel-success'>
          <div className='panel-heading'>
            <h3 className='panel-title'>Successful Trade History</h3>
          </div>
          <div className='panel-body'>
            {elTradeHistory}
          </div>
        </div>
      </div>
    );      
  }
};


