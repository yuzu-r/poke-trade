var PendingResponseContainer = React.createClass({
  getInitialState: function(){
    return (
      {
        trades: [],
        loadingMessage: 'You have no trades awaiting a response.'
      }
    )
  },
  componentDidMount() {
    console.log('fetching pending trades from server');
    $.ajax(
      {
        url: '/active_trades',
        type: 'GET',
        success: (response) => {
          //console.log('important response?',response);
          this.setState({trades: response.trades});
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
            <h3 className='panel-title'>Trades awaiting your response</h3>
          </div>
          <div className='panel-body'>
            <PanelWrapper trades={this.state.trades} />
          </div>
        </div>
      </div>
    )
  }
});