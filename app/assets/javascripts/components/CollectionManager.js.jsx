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
    console.log('adding a new card to the collection',name);
    $.ajax(
      {
        url: '/cards',
        type: 'POST',
        data: {card: {name: name}},
        success: (response) => {
          console.log(response);
        },
        fail: (response) => {
          console.log('fail', response.responseText);
        }
      }
    )
  },
  render(){
    const list= [{name: 'Alpha', number: '1', source: 'here'},
                 {name: 'Anton', number: '2', source: 'here'},
                 {name: 'Beta', number: '3', source: 'here'},
                 {name: 'Ceta', number: '4', source: 'here'}
                ];   
    return (
      <div>
        <h1>Collection Manager</h1>
        <PickAPoke onAddPokemon={this.addCard} list={this.props.deck}/>
        <Collection isLoading={this.state.isLoading} 
                    loadingMessage={this.state.loadingMessage} 
                    cards = {this.state.cards} />
      </div>
    )
  }
});