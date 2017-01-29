var TestItem = React.createClass({
  render(){
    return (
      <div className="col-xs-4 col-sm-3 thumbnail-constraint">
        <div className="thumbnail">
          <img className="thumbnail-img" src={this.props.source} alt="..." />
          <div className="caption">
            <p>{this.props.name}</p>
            <p>
              <button className="btn btn-primary"
                       disabled={!this.props.isAvailable}
                       onClick={this.props.handleChoice.bind(null,this.props.id, this.props.name, this.props.tradeId)}>
                       Choose
              </button>
            </p>
          </div>
        </div>
      </div>      
    );
  }
});

