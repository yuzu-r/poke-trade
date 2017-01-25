var PanelWrapper=React.createClass({
  render: function(){
    var content = this.props.content;
    console.log('should be cards: ',this.props.content)
    var els = this.props.content.map(function(item,index){
      console.log('in else', item.name)
      return(<PanelItem key={index} title={item.name} content={'stuff here'} index={index}/>)
    });   
    return(
      <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
        {els}
      </div>
    )
  }
})