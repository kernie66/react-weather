export default function decodeAddress(geocodeResult) {
//  const keys = Object.keys(geocodeResult.address_components);
  const addressComponents = {
    street: '',
    sublocality: '',
    locality: '',
    premise: '',
    point_of_interest: '',
    natural_feature: '',
    park: '',
  };
//  console.log("Keys:", keys);
//  geocodeResult.address_components.forEach((key, index) => {
//    console.log(Object.keys(key), index);
//  });
//  const entries = Object.entries(geocodeResult.address_components);
//  console.log(entries);
  let includeStreet = true;
  for (const [key, value] of Object.entries(geocodeResult.address_components)) {
//    console.log(`${key}: ${value.long_name}`);
    value.types.forEach(val => console.log(val));
    if (value.types.includes('route')) {
      addressComponents.street = value.long_name + ', ';
    };
    if (value.types.includes('sublocality')) {
      addressComponents.sublocality = value.long_name + ', ';
    };
    if (value.types.includes('locality') || value.types.includes('postal_town')) {
      addressComponents.locality = value.long_name;
    };
    if (value.types.includes('park')) {
      addressComponents.park = value.long_name + ', ';
      includeStreet = false;
    }
    else {
      if (value.types.includes('point_of_interest')) {
        addressComponents.point_of_interest = value.long_name + ', ';
        includeStreet = false;
      }
      else {
        if (value.types.includes('premise')) {
          addressComponents.premise = value.long_name + ', ';
          includeStreet = false;
        }
        else {
          if (value.types.includes('natural_feature')) {
            addressComponents.natural_feature = value.long_name + ', ';
            includeStreet = false;
          };
        };
      };
    };
  };

  const locationAddress = (includeStreet ? addressComponents.street : '')
    + addressComponents.park
    + addressComponents.point_of_interest
    + addressComponents.premise
    + addressComponents.natural_feature
    + addressComponents.sublocality
    + addressComponents.locality;
  console.debug(locationAddress);
  return (
    locationAddress
  );
};