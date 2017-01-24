var Card = React.createClass({
  render(){
    return(
      <li className='card-container'>
        <figure>
          <img className='scaled' src={this.props.source} alt='image' />
          <figcaption>
            {this.props.children}
          </figcaption>
        </figure>
      </li>
    )
  }
});