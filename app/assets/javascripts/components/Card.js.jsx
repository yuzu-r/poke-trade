var Card = React.createClass({
  render(){
    return(
      <li className='card-container'>
        <figure>
          <img className='scaled' src={this.props.source} alt='image' />
          <figcaption>
            <span className='pokemon-name'>{this.props.name}</span>
                <br/>
                <button 
                  className='btn btn-link' 
                  onClick={this.props.deleteMon.bind(null, this.props.id)}>
                  Remove from Trade Pool
                </button>           
          </figcaption>
        </figure>
      </li>
    )
  }
});