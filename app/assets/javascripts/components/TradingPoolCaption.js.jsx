var TradingPoolCaption = React.createClass({
  render(){
    return (
      <div>
        <span className='pokemon-name'>{this.props.name}</span>
        <br/>
        <button 
          className='btn btn-link' 
          onClick={this.props.beginTrade.bind(null, this.props.id)}>
          Initiate Trade
        </button>           
      </div>
    );
  }
});
