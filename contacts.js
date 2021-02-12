import * as fs from "fs/promises";
import path from "path";
import { customAlphabet } from "nanoid";
import createDirnameAndFileName from "./lib/dirname.js";

const { __dirname } = createDirnameAndFileName(import.meta.url);

const contactsPath = path.join(__dirname, "./db/contacts.json");

const nanoid = customAlphabet("1234567890", 4);

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    console.table(JSON.parse(data));
  } catch (error) {
    console.log(error);
  }
}

export async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const requiredContact = contacts.find(
      (contact) => contact.id === contactId
    );

    if (!requiredContact) {
      console.log(`Contact with id-${contactId} not found.`);
      return;
    }

    console.log(`
    name: ${requiredContact.name}
    email: ${requiredContact.email}
    phone: ${requiredContact.phone}`);
  } catch (error) {
    console.log(error);
  }
}

export async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);

    const contacts = JSON.parse(data);

    if (contacts.some((contact) => contact.id === contactId)) {
      const changedContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );

      await fs.writeFile(
        contactsPath,
        JSON.stringify(changedContacts, null, 2)
      );
    } else {
      return console.log(`Contact with id-${contactId} not exist.`);
    }
  } catch (error) {
    console.log(error);
    return;
  }

  console.log(`Contact with id-${contactId} deleted.`);
}

export async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const id = newId(contacts);
    const newContact = {
      id,
      name,
      email,
      phone,
    };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.log(error);
    return;
  }

  console.log("Contact added to contacts list.");
}

function newId(contacts) {
  const id = Number(nanoid());

  if (contacts.some((contact) => contact.id === id)) {
    return newId(contacts);
  }

  return id;
}
