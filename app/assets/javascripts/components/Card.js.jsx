class Card extends React.Component{
  render(){
    //console.log('card:', this.props)
    return(
      <div className="col-xs-4 col-sm-3 thumbnail-constraint">
        <div className="thumbnail">
          <img className="thumbnail-img" src={this.props.source} alt="image of pokemon" />
          <div className="caption">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
};
