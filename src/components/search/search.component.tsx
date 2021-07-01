import React, { useState } from "react";
import axios from "axios";
import Input from "../input/input.component";
import "./search.styles.scss";

export const Search: React.FC = () => {
  const [input, setSearch] = useState<{ search: string }>({
    search: "Where do you want to park?",
  });

  const [suggestions, setSuggestions] = useState<string[]>([]);

  const { search } = input;

  const autoSuggestSearch = (input_address: string) => {
    //dont make a request when there is nothing in the input....
    if (input_address.length === 0) return;

    axios
      .get("/maps/api/place/autocomplete/json?", {
        params: {
          input: input_address,
          types: ["address"],
          language: "en",
          key: process.env.REACT_APP_API_KEY,
        },
      })
      .then(({ data: { predictions } }) => {
        setSuggestions(predictions);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;
    setSearch({ ...input, [name]: value });
  };

  /* Timeout is used to reduce the execsive Request made to
  Google maps Api*/

  let timeoutvar: ReturnType<typeof setTimeout>;

  // Fires when any key is pressed
  const keyDown = () => {
    clearTimeout(timeoutvar);
  };

  // Fires when key is released
  const keyUp = () => {
    // When the user is done typing clear the timeout
    clearTimeout(timeoutvar);

    // Afterwards make a request..note the spinner dispears in the function
    // autoSuggestSearch
    timeoutvar = setTimeout(() => {
      autoSuggestSearch(search);
    }, 1800);
  };

  //When the user clicks the input
  const isInputFocused = () => {
    setSearch({ search: "" });

    //Make a request but do it fast!
    timeoutvar = setTimeout(() => {
      autoSuggestSearch(search);
    }, 100);
  };
  //when the user clicks out of the input clear the suggestions
  // and turn off the spinner
  const isInputBlured = () => {
    setSuggestions([]);
    if (search === "") {
      setSearch({ search: "Where do you want to park?" });
    }
  };

  const onMouseOverDiv = (event: any) => {
    setSearch({ search: event.currentTarget.textContent });
  };
  return (
    <div>
      <div className="input-wrapper" id="input-wrapper">
        <Input
          type="text"
          name="search"
          value={search}
          onChange={handleChange}
          autoComplete="off"
          onFocus={() => isInputFocused()}
          onBlur={() => isInputBlured()}
          onKeyUp={() => keyUp()}
          onKeyDown={() => keyDown()}
        />
        <div className="input-wrapper__text">
          <div className="input-wrapper__text__left">PARKING AT</div>
          <div className="input-wrapper__text__right">
            <div className="input-wrapper__text__right__go-right" />
          </div>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map(({ description }: any, i) => (
            <div
              key={i}
              onMouseOver={onMouseOverDiv}
              className="suggestions__item"
            >
              {description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
