import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import {cityList } from "../API/http";
import "./app.css";


/*   // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    const regex = new RegExp('^' + escapedValue, 'i');
  // return cities.filter(city => regex.test(city.city) || regex.test(city.id));
  }
  
  function getSuggestionNickname(suggestion) {
    return suggestion.nickname;
  }
  
  function getSuggestionEmail(suggestion) {
    return suggestion.email;
  }
  
  function renderSuggestion(suggestion) {
    return (
    <span>{suggestion.nickname} - {suggestion.email}</span>
    );
  }
  
  class Form2 extends React.Component {
    constructor() {
      super();
  
      this.state = {
        nicknameValue: '',
        nicknameSuggestions: [],
        emailValue: '',
        emailSuggestions: []
      };    
    }
  
    onNicknameChange = (event, { newValue }) => {
        event.preventDefault();
        let payload = {
            city: newValue,
            limit:10
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
            console.log(normalize);
            this.setState({ suggestions: normalize });
          });

          this.setState({ nicknameValue: newValue });
        };

  
    onEmailChange = (event, { newValue }) => {
      this.setState({
        emailValue: newValue
      });
    };
    
    onNicknameSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        nicknameSuggestions: getSuggestions(value)
      });
    };
  
    onNicknameSuggestionsClearRequested = () => {
      this.setState({
        nicknameSuggestions: []
      });
    };
  
    onNicknameSuggestionSelected = (event, { suggestion }) => {
      this.setState({
        emailValue: suggestion.email
      });
    };
  
    onEmailSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        emailSuggestions: getSuggestions(value)
      });
    };
  
    onEmailSuggestionsClearRequested = () => {
      this.setState({
        emailSuggestions: []
      });
    };
  
    onEmailSuggestionSelected = (event, { suggestion }) => {
      this.setState({
        nicknameValue: suggestion.nickname
      });
    };
  
    render() {
      const { 
        nicknameValue, 
        nicknameSuggestions, 
        emailValue, 
        emailSuggestions 
      } = this.state;
      const nicknameInputProps = {
        placeholder: "nickname",
        value: nicknameValue,
        onChange: this.onNicknameChange
      };
      const emailInputProps = {
        placeholder: "email",
        value: emailValue,
        onChange: this.onEmailChange
      };
  
      return (
        <div className="container">
          <Autosuggest 
            suggestions={nicknameSuggestions}
            onSuggestionsFetchRequested={this.onNicknameSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onNicknameSuggestionsClearRequested}
            onSuggestionSelected={this.onNicknameSuggestionSelected}
            getSuggestionValue={getSuggestionNickname}
            renderSuggestion={renderSuggestion}
            inputProps={nicknameInputProps}
          />
          <Autosuggest 
            suggestions={emailSuggestions}
            onSuggestionsFetchRequested={this.onEmailSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onEmailSuggestionsClearRequested}
            onSuggestionSelected={this.onEmailSuggestionSelected}
            getSuggestionValue={getSuggestionEmail}
            renderSuggestion={renderSuggestion}
            inputProps={emailInputProps}
          />
        </div>
      );
    }
  } */

  function getSuggestionValue(suggestion) {
    return suggestion.name;
  }
  
  function renderSuggestion(suggestion) {
    return (
      <span>{suggestion.name}</span>
    );
  }
  
  class Form2 extends React.Component {
    constructor() {
      super();
  
      this.state = {
        value: '',
        suggestions: []
      };    
    }
  
    onChange = (event, { newValue}) => {
      console.log(newValue)
      this.setState({
        value: newValue
      });
    };
    
    onSuggestionsFetchRequested = () => {
      let payload = {
        city: this.state.value,
        limit: 10,
      };
      cityList(payload).then((data) => {
        if (data.error) {
          console.log(data.error);
        }
        let { city } = data;
        this.setState({ suggestions: city });
      });
      
      /* fetch(`https://swapi.co/api/people/?search=${value}`)
        .then(response => response.json())
        .then(data => this.setState({ suggestions: data.results })) */
    }
  
    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };
  
    render() {
      const { value, suggestions } = this.state;
      const inputProps = {
        placeholder: "Search Star Wars",
        value,
        onChange: this.onChange
      };
  
      return (
        <Autosuggest 
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} />
      );
    }
  }

  export default Form2;