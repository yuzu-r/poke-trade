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
        // var tradeable = c.available ? 'Tradeable' : 'Not Offered';
        return (
          <li className='card-container' key={index}>
            <figure>
              <img className='scaled' src={c.source} alt='image' />
              <figcaption>{c.name}</figcaption>
            </figure>
          </li>
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