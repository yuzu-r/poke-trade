// props.trades has cards array, proposer_card_id, proposer_id
var PanelWrapper=React.createClass({
  render: function(){
    var self = this;
    var trades = this.props.trades;
    //var test = trades.map(function(t, index){
    //  console.log(t.proposer_card_id, index);
    //})
    var els = trades.map(function(trade,index){
      return(
        <PanelItem  key={index} 
                    desiredCard={trade.proposer_card_id} 
                    proposerName={trade.proposer_id}
                    index={index}>
          <Test cards={trade.cards}/>
        </PanelItem>);
    });   
    return(
      <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
        {els}
      </div>
    )
  }
})