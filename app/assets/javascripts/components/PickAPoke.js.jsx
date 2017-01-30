var PickAPoke = React.createClass({
  getInitialState() {
    return (
      {
        value: '',
        suggestions: [],
        disableSubmit: true
      }
    )
  },
  onChange: function(event, { newValue, method }){
    var list = this.props.list;
    var nameValid = list.some(function(card){
      if (card.name === newValue) {
        return true;
      }
    });
    this.setState({
      value: newValue,
      disableSubmit: !nameValid
    });
  },
  onSuggestionsFetchRequested: function ({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  },
  onSuggestionsClearRequested: function () {
    this.setState({
      suggestions: [],
    });
  },
  escapeRegexCharacters: function(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  },
  getSuggestions: function(value){
    const escapedValue = this.escapeRegexCharacters(value.trim());
    if (escapedValue === '') {
      return [];
    }
    const regex = new RegExp(escapedValue, 'i');
    list = this.props.list;
    return list.filter(language => regex.test(language.name));
  },
  getSuggestionValue: function(suggestion) {
    return suggestion.name;
  },
  renderSuggestion: function(suggestion){
    return (<div>{suggestion.name}</div>);
  },
  render(){
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Enter a name, e.g. Raichu",
      value,
      onChange: this.onChange
    };
    return (
      <div>
        <Autosuggest 
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps} />
        &nbsp;&nbsp;<button 
          className='btn btn-primary' 
          disabled={this.state.disableSubmit}
          onClick={this.props.onAddPokemon.bind(null,this.state.value)}
        >
        Add Pokemon</button>
      </div>
    );
  }
});