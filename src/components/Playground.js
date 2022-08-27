import { Col, Container, Row } from "reactstrap";
import Map from "./Map";

export default function Playground() {
  return (
    <Container className="d-flex flex-column h-100 justify-content-between border" >
      <Map />
    </Container>
  );
};
    {/*    
    <Autocomplete
    apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
    onPlaceSelected={(place) => console.log(place)}
  />
  )
      <div className="search text-primary">
      <h1>Status: {status}</h1>
      {!ready ?
        <h3>Not ready</h3>
        :
        <Typeahead
        autoFocus
        clearButton
          id="combobox"
          labelKey="description"
          options={data}
          onInputChange={(text, e) => {
            setValue(e.target.value);
            console.log(text);
          }}
          placeholder="Ange ort, adress eller plats"
        />
      }
      {/*      <Combobox onSelect={(address) => {
        console.log(address);
      }}>
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          className="combobox-input"
          placeholder="Ange ort, adress eller plats"
        />
        <ComboboxPopover>
            {status === "OK" && 
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))
            }
        </ComboboxPopover>
          </Combobox> 
    </div> 
  );*/}
