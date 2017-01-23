var Collection = React.createClass({
  render(){
    if (this.props.isLoading === true) {
      return (
        <p>{this.props.loadingMessage}</p>
      )
    }
    else {
      var cards = this.props.cards.map((c,index) => {
        // also available are c.source and c.is_available
        console.log(c);
        return (
          <div key={index}>{c.name}</div>
        );
      });
      return (
        <div>
          <p>Here is your collection.</p>
          {cards}
        </div>

      )     
    }
  }
});