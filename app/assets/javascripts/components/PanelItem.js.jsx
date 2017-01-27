var PanelItem=React.createClass({
  getDefaultProps: function(){
    return(
      {title: 'hi', index: 1}
    )
  },
  render: function(){
    var idH = 'ap-heading-' + this.props.index;
    var idC = 'ap-collapse-' + this.props.index;
    var hrefC = '#' + idC;
    return(
      <div className="panel panel-default">
        <div className="panel-heading" role="tab" id={idH}>
          <h4 className="panel-title">
            <a role="button" 
              data-toggle="collapse" 
              data-parent="#accordion" 
              href={hrefC} 
              aria-expanded="false" 
              aria-controls="collapseF">
              {this.props.proposerName} wants {this.props.desiredCard}
            </a>
          </h4>
        </div>
        <div id={idC} className="panel-collapse collapse" role="tabpanel" aria-labelledby={idH}>
          <div className="panel-body">
            {this.props.children}
          </div>        
        </div>
      </div>
    )
  }
})
