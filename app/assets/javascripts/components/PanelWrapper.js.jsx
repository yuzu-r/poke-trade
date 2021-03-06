class PanelWrapper extends React.Component{
  render(){
    var self = this;
    var trades = this.props.trades;
    var els = trades.map(function(trade,index){
      //console.log('panelwrapper, ', trade)
      return(
        <PanelItem  key={index} 
                    desiredCard={trade.desiredCardName} 
                    proposerName={trade.proposerName}
                    tradeId = {trade.id}
                    index={index}>
          <Trade cards={trade.cards} 
                tradeId={trade.id} 
                cancelTrade={self.props.cancelTrade}
                desiredCard={trade.desiredCardName}
                proposerId ={trade.proposer_id}
                proposerName={trade.proposerName}
                 />
        </PanelItem>);
    });   
    return(
      <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
        {els}
      </div>
    )
  }
};