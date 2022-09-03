import { createContext, useContext, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

export const AddressContext = createContext();

export default function AddressProvider({ children }) {
  const [positionLS, setPositionLS] = useLocalStorageState("position", {
    defaultValue: { lat: 59.476, lng: 17.905 }
  });
  const [addressLS, setAddressLS] = useLocalStorageState("address", {
    defaultValue: "Rotebro, Sollentuna, Sverige",
  });

  useEffect(() => {
    if (!positionLS) {
      setPositionLS({ lat: 59.476, lng: 17.905 })
      console.debug("Position set to default");
    };
    if (!addressLS) {
      setAddressLS("Rotebro, Sollentuna, Sverige");
      console.debug("Address set to default");
    };
    // eslint-disable-next-line  
  }, []);

  const getAddress = addressLS;

  function setAddress(address) {
    if (address) {
      setAddressLS(address);
    };
  };

  const getPosition = positionLS;

  function setPosition(position) {
    if (position) {
      setPositionLS(position);
    };
  };

  return (
    <AddressContext.Provider value={{ getAddress, setAddress, getPosition, setPosition }}>
      {children}
    </AddressContext.Provider>
  );
};

export function useAddress() {
  return useContext(AddressContext);
};