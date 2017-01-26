var Test = React.createClass({
  render(){
    console.log('in test,', this.props);
    var els = null;
    els = this.props.cards.map(function(c, index){
      return(
        <TestItem key={index} name={c.name} source={c.source} />
      )
    });  
    return (
      <div>
        <p>Select one of these or
          <button className='btn btn-link'
                  onClick={this.props.cancelTrade.bind(null, this.props.tradeId)}>                
            cancel trade
          </button>
        </p>
        <div className="row">
          {els}
        </div>   
      </div>
    );
  }
});
