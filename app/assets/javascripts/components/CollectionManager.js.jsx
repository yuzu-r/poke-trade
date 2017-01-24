var CollectionManager = React.createClass({
  getInitialState: function(){
    return {
      isLoading: true,
      loadingMessage: 'fetching collection from server...',
      cards: []
    }
  },
  componentDidMount() {
    console.log('fetching collection from server');
    $.ajax(
      {
        url: '/collection',
        type: 'GET',
        success: (response) => {
          this.setState({loadingMessage: 'fetching data from poke api...'});
          console.log(response);
          console.log(response.cards);
          var cardCount = response.cards.length;
          if (cardCount === 0) {
            this.setState({isLoading: false})
          }
          else {
            this.setState({isLoading: false, cards: response.cards});
          }
        },
        fail: (response) => {
          console.log('fail', response.responseText);
        }
      }
    )
  },
  addCard(name,e){
    $.ajax(
      {
        url: '/cards',
        type: 'POST',
        data: {card: {name: name}},
        success: (response) => {
          console.log('success!', response);
          Turbolinks.visit('/');
        },
        fail: (response) => {
          console.log('fail', response.responseText);
        }
      }
    )
  },
  deleteCard(card_id,e){
    console.log('removing from trading pool', card_id);
    $.ajax({ 
      url: '/cards/',  
      type: 'DELETE',
      data: {card: {id: card_id}}, 
      success(response) { console.log('successfully removed item') } 
    });     
  },
  render(){
    return (
      <div>
        <h1>Collection Manager</h1>
        <PickAPoke onAddPokemon={this.addCard} list={this.props.deck}/>
        <Collection isLoading={this.state.isLoading} 
                    loadingMessage={this.state.loadingMessage} 
                    cards = {this.state.cards}>
          <DeleteFromPoolCaption deleteMon={this.deleteCard} />            
        </Collection>
      </div>
    )
  }
});