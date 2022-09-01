import { createContext, useContext } from "react";
import useLocalStorageState from "use-local-storage-state";

export const AddressContext = createContext();

export default function AddressProvider([ children ]) {
  const [position, setPosition] = useLocalStorageState("position", {
    defaultValue: { lat: 59.476, lng: 17.905 }
  });
  const [address, setAddress] = useLocalStorageState("address", {
    defaultValue: "Rotebro, Sollentuna, Sverige",
  });

  useEffect(() => {
    if (!position) {
      setPosition({ lat: 59.476, lng: 17.905 })
      console.debug("Position set to default");
    };
    if (!address) {
      setAddress("Rotebro, Sollentuna, Sverige");
      console.debug("Address set to default");
    };
  }, []);

return (
    <AddressContext.Provider value={{address, setAddress, position, setPosition}}>
      {children}
    </AddressContext.Provider>
  );
};

export function useAddress() {
  return useContext(AddressContext);
};