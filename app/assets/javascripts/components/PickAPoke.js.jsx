var PickAPoke = React.createClass({
  getInitialState() {
    return (
      {
        value: '',
        suggestions: [],
        submitReady: false
      }
    )
  },
  onChange: function(event, { newValue, method }){
    this.setState({
      value: newValue
    });
  },
  onSuggestionsFetchRequested: function ({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value),
      submitReady: true
    });
  },
  onSuggestionsClearRequested: function () {
    this.setState({
      suggestions: [],
      submitReady: false
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
          disabled={this.state.submitReady}
          onClick={this.props.onAddPokemon.bind(null,this.state.value)}
        >
        Add Pokemon</button>
      </div>
    );
  }
});