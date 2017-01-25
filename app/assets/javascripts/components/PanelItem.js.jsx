var PanelItem=React.createClass({
  getDefaultProps: function(){
    return(
      {title: 'hi', content:'arma virumque cano', index: 1}
    )
  },
  render: function(){
    var idH = 'ap-heading-' + this.props.index;
    var idC = 'ap-collapse-' + this.props.index;
    var hrefC = '#' + idC;
    console.log('in panelItem, props', this.props.name)
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
              THIS IS {this.props.title}
            </a>
          </h4>
        </div>
        <div id={idC} className="panel-collapse collapse" role="tabpanel" aria-labelledby={idH}>
          <div className="panel-body">
            {this.props.content}
          </div>        
        </div>
      </div>
    )
  }
})
