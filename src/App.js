import React from "react";
import { useState } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactsList from "./components/ContactsList/ContactsList";
import useLocalStorage from "./hooks/UseLocalStorage";

function App() {
  const [contacts, setContacts] = useLocalStorage("contacts", []);
  const [filter, setFilter] = useState("");

  const formSubmitHandler = (data) => {
    const findName = contacts.find((contact) => {
      return contact.name === data.name;
    });
    !findName
      ? setContacts([data, ...contacts])
      : alert(`${data.name} is already in contact`);
  };

  const handleInputFilter = (e) => {
    setFilter(e.target.value);
  };

  const visibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((item) =>
      item.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = (data) => {
    return setContacts(contacts.filter((contact) => contact.id !== data.id));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm formSubmitHandler={formSubmitHandler} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleInputName={handleInputFilter} />
      <ContactsList contacts={visibleContacts} deleteContact={deleteContact} />
    </div>
  );
}
export default App;
