var Collection = React.createClass({
  render(){
    if (this.props.isLoading === true) {
      return (
        <p>{this.props.loadingMessage}</p>
      )
    }
    else {
      var cards = this.props.cards.map((c,index) => {
        return (
          <Card key={index}
                source={c.source}
                name={c.name}
                id={c.id}
                deleteMon={this.props.deleteMon} />
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