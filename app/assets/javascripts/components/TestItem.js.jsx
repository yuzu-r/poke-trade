var TestItem = React.createClass({
  render(){
    console.log('props!',this.props);
    return (
      <div className="col-xs-4 col-sm-3 thumbnail-constraint">
        <div className="thumbnail">
          <img className="thumbnail-img" src={this.props.source} alt="..." />
          <div className="caption">
            <p>{this.props.name}</p>
            <p><button className="btn btn-primary">Choose</button></p>
          </div>
        </div>
      </div>      
    );
  }
});

