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
  render(){
    return (
      <div>
        <h1>Collection Manager</h1>
        <Collection isLoading={this.state.isLoading} 
                    loadingMessage={this.state.loadingMessage} 
                    cards = {this.state.cards} />
      </div>
    )
  }
});