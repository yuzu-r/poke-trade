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
          <li className='card-container' key={index}>
            <figure>
              <img className='scaled' src={c.source} alt='image' />
              <figcaption>
                {c.name}
                <br/>
                <button 
                  className='btn btn-link' 
                  onClick={this.props.deleteMon.bind(null, c.id)}>
                  Remove from Trade Pool
                </button>
              </figcaption>
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