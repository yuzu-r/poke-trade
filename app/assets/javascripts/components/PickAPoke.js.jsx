class PickAPoke extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: '',
        suggestions: [],
        disableSubmit: true
      };
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
  }
  onChange(event, { newValue, method }) {
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
  };
  onSuggestionsFetchRequested ({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  };
  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };
  getSuggestions(value){
    const escapedValue = this.escapeRegexCharacters(value.trim());
    if (escapedValue === '') {
      return [];
    }
    const regex = new RegExp(escapedValue, 'i');
    list = this.props.list;
    return list.filter(language => regex.test(language.name));
  };
  getSuggestionValue(suggestion) {
    return suggestion.name;
  };
  renderSuggestion(suggestion){
    return (<div>{suggestion.name}</div>);
  };
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
};