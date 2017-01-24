var Collection = React.createClass({
  
  /*
    always passing the card's name, id and is_available to children
  */
  
  render(){
    if (this.props.isLoading === true) {
      return (
        <p>{this.props.loadingMessage}</p>
      )
    }
    else {
      var cards = this.props.cards.map((c,index) => {
        var cardFigCaption = React.cloneElement(this.props.children, 
                              {name: c.name, id: c.id, isAvailable: c.is_available});
        return (
          <Card key={index}
                source={c.source}
                name={c.name}
                id={c.id} >
            {cardFigCaption}
          </Card>
        );
      });
      return (
        <div>
          <ul className='grid'>
            {cards}
          </ul>
        </div>
      )     
    }
  }
});