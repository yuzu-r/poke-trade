class CollectionManager extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      loadingMessage: '',
      cards: []
    };
  }
  componentDidMount() {
    console.log('fetching collection from server');
    $.ajax(
      {
        url: '/collection',
        type: 'GET',
        success: (response) => {
          this.setState({loadingMessage: 'fetching collection from server...'});
          //console.log(response);
          //console.log(response.cards);
          var cardCount = response.cards.length;
          if (cardCount === 0) {
            this.setState({isLoading: false})
          }
          else {
            this.setState({isLoading: false, cards: response.cards});
          }
        },
        error: (response) => {
          console.log('fail', response.responseText);
        }
      }
    )
  }
  addCard(name,e){
    $.ajax(
      {
        url: '/cards',
        type: 'POST',
        data: {card: {name: name}},
        success: (response) => {
          console.log('success!', response);
          Turbolinks.visit('/my_collection');
        },
        error: (response) => {
          console.log('fail', response.responseText);
          if (response.status == 401) {
            Turbolinks.visit('/devise/users/sign_in');
          }          
          else {Turbolinks.visit('/');}
        }
      }
    )
  }
  deleteCard(card_id,e){
    console.log('removing from trading pool', card_id);
    $.ajax({ 
      url: '/cards/',  
      type: 'DELETE',
      data: {card: {id: card_id}}, 
      success: (response) => { 
        console.log('successfully removed item'); 
        Turbolinks.visit('/my_collection');
      }, 
      error: (response) => {
        if (response.status == 401) {
          Turbolinks.visit('/devise/users/sign_in');
        }
      }
    });     
  }
  render(){
    return (
      <div className="col-xs-10 col-xs-offset-1">
        <h2>Collection Manager</h2>
        <p className="text">
          Use the input box to search for a pokemon and add it to your collection. 
        </p>
        <p className="text">
          Click the Remove button to remove a pokemon from your collection.
        </p>
        <p className="text">
          Note: pokemon involved in an active trade cannot be removed; cancel the active trade first.
        </p>       
        <PickAPoke onAddPokemon={this.addCard} list={this.props.deck}/>
        <Collection isLoading={this.state.isLoading} 
                    loadingMessage={this.state.loadingMessage} 
                    cards = {this.state.cards}>
          <DeleteFromPoolCaption deleteMon={this.deleteCard} />            
        </Collection>
      </div>
    )
  }
};