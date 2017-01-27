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
        console.log('assembling cards, props is', this.props)
        console.log('assembling cards, cis', c)
        var cardFigCaption = React.cloneElement(this.props.children, 
                {name: c.name, 
                  id: c.id, 
                  isAvailable: c.is_available, 
                  trade_id: c.trade_id, 
                  owner: c.owner, 
                  ownerId: c.user_id
                });
        return (
          <Card key={index}
                source={c.source}
                name={c.name}
                id={c.id}
          >
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