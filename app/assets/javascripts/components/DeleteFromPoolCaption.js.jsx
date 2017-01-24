var DeleteFromPoolCaption = React.createClass({
  render(){
    return (
      <div>
        <span className='pokemon-name'>{this.props.name}</span>
        <br/>
        <button 
          className='btn btn-link' 
          onClick={this.props.deleteMon.bind(null, this.props.id)}>
          Remove from Trade Pool
        </button>           
      </div>
    );
  }
});

