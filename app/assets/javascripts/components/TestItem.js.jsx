var TestItem = React.createClass({
  render(){
    if (this.props.isAvailable){
      var tradeElement = <button className='btn btn-primary btn-small caption-button'
                        onClick={this.props.handleChoice.bind(null,this.props.id, this.props.name, this.props.tradeId)}>
                        Choose
                      </button>;

    }
    else {
      tradeElement = <button className='btn btn-default btn-small caption-button btn-none' disabled='true'>Trade Pending!</button>;
    }
    return (
      <div className="col-xs-4 col-sm-3 thumbnail-constraint">
        <div className="thumbnail">
          <img className="thumbnail-img" src={this.props.source} alt="..." />
          <div className="caption">
            <p>{this.props.name}</p>
            <p>
              {tradeElement}
            </p>
          </div>
        </div>
      </div>      
    );
  }
});

