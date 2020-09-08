import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import { regionList, districtList, cityList } from "../API/http";
import "./app.css";

const getSuggestionValue = (suggestion) => suggestion;

const renderSuggestion = (suggestion) => (
  <span>
    {console.log(suggestion)}
    {suggestion}
  </span>
);

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: "",
      city_id:'',
/*       district: "",
      region: "",
      value: "", */
      suggestions: [],
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    console.log(value);
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    let { suggestions } = this.state;
    console.log(suggestions);

    if (suggestions == undefined) {
      return (suggestions = "");
    } else {
      return inputLength === 0
        ? []
        : suggestions.filter(
            (lang) => lang.toLowerCase().slice(0, inputLength) === inputValue
          );
    }
  };
  render() {
    const { value, suggestions } = this.state;
    console.log(suggestions);

    return (
      <form>
        <div className="sdfmsdfbvb">
          {/* <span>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={(suggestions) => (
                <span>
                  {console.log(suggestions)}
                  {suggestions}
                </span>
              )}
              inputProps={{
                id: "region",
                name: "region",
                value: this.state.region,
                placeholder: "Область",
                onChange: (_event, { newValue }) => {
                  _event.preventDefault();
                  let payload = {
                    region: newValue,
                  };

                  regionList(payload).then((data) => {
                    if (data.error) {
                      console.log(data.error);
                      return;
                    }
                    let { regions } = data;
                    console.log(regions);
                    this.setState({ suggestions: regions });
                  });

                  this.setState({ region: newValue });
                },
              }}
            />
          </span>

          <span>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={(suggestions) => (
                <span>
                  {console.log(suggestions)}
                  {suggestions.district}
                </span>
              )}
              inputProps={{
                id: "district",
                name: "district",
                value: this.state.district,
                placeholder: "Район",
                onChange: (_event, { newValue }) => {
                  _event.preventDefault();
                  let payload = {
                    region: this.state.region,
                    district: newValue,
                    limit: 10,
                  };

                  districtList(payload).then((data) => {
                    if (data.error) {
                      console.log(data.error);
                    }
                    let { districts } = data;
                    this.setState({ suggestions: districts });
                  });

                  this.setState({ district: newValue });
                },
              }}
            />
          </span> */}

          <span>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={(suggestions) => (
                <span>
                  {console.log(suggestions)}
                  {suggestions.city}
                </span>
              )}
              inputProps={{
                id: "city",
                name: "city",
                value: this.state.city,
                placeholder: "Населенный пункт",
                onChange: (_event, { newValue }) => {
                  _event.preventDefault();
                  let payload = {
                    city: newValue,
                    limit: 10,
                  };

                  cityList(payload).then((data) => {
                    if (data.error) {
                      console.log(data.error);
                    }
                    let { city } = data;
                    let normalize = [];
                    city.forEach((el) => {
                      normalize.push(el.city);
                    });
                    if(city["0"].id) this.state.city_id = city["0"].id
                    else if (city["0"].id=="undefined" ){ this.state.city_id = "null"}
                    console.log(normalize);
                    this.setState({ suggestions: normalize });
                  });

                  this.setState({ city: newValue });
                },
              }}
            />
          </span>
        </div>
      </form>
    );
  }
}
export default PostForm;
