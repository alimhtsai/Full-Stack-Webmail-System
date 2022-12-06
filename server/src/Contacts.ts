// Node imports.
import * as path from "path";


// Library imports.
const Datastore = require("nedb");


// Define interface to describe a contact.  Note that we'll only have an _id field when retrieving or adding, so
// it has to be optional.
export interface IContact {
  _id?: number,
  name: string,
  email: string,
  category: string
}


// The worker that will perform contact operations.
export class Worker {


  // The Nedb Datastore instance for contacts.
  private db: Nedb;


  /**
   * Constructor.
   */
  constructor() {

    this.db = new Datastore({
      filename : path.join(__dirname, "contacts.db"),
      autoload : true
    });

  } /* End constructor. */


  /**
   * Lists all contacts.
   *
   * @return A promise that eventually resolves to an array of IContact objects.
   */
  public listContacts(): Promise<IContact[]> {

    console.log("Contacts.Worker.listContacts()");

    return new Promise((inResolve, inReject) => {
      this.db.find(
        {},
        (inError: Error, inDocs: IContact[]) => {
          if (inError) {
            console.log("Contacts.Worker.listContacts(): Error", inError);
            inReject(inError);
          } else {
            console.log("Contacts.Worker.listContacts(): Ok", inDocs);
            inResolve(inDocs);
          }
        }
      );
    });

  } /* End listContacts(). */


  /**
   * Add a new contact.
   *
   * @param  inContact The contact to add.
   * @return           A promise that eventually resolves to an IContact object.
   */
  public addContact(inContact: IContact): Promise<IContact> {

    console.log("Contacts.Worker.addContact()", inContact);

    return new Promise((inResolve, inReject) => {
      this.db.insert(
        inContact,
        (inError: Error | null, inNewDoc: IContact) => {
          if (inError) {
            console.log("Contacts.Worker.addContact(): Error", inError);
            inReject(inError);
          } else {
            console.log("Contacts.Worker.addContact(): Ok", inNewDoc);
            inResolve(inNewDoc);
          }
        }
      );
    });

  } /* End addContact(). */


  /**
   * Delete a contact.
   *
   * @param  inID The ID of the contact to delete.
   * @return      A promise that eventually resolves to a string (null for success, or the error message for an error).
   */
  public deleteContact(inID: string): Promise<string> {

    console.log("Contacts.Worker.deleteContact()", inID);

    return new Promise((inResolve, inReject) => {
      this.db.remove(
        { _id : inID },
        { },
        (inError: Error | null, inNumRemoved: number) => {
          if (inError) {
            console.log("Contacts.Worker.deleteContact(): Error", inError);
            inReject(inError);
          } else {
            console.log("Contacts.Worker.deleteContact(): Ok", inNumRemoved);
            inResolve("");
          }
        }
      );
    });

  } /* End deleteContact(). */


  /**
   * Update a new contact.
   *
   * @param  inContact The contact to add.
   * @return           A promise that eventually resolves to an IContact object.
   */
   public updateContact(inContact: IContact): 
   
    Promise<IContact> {

      console.log("Contacts.Worker.updateContact()", inContact);

      return new Promise((inResolve, inReject) => {
        this.db.update(
          {_id: inContact._id},
          {$set: {name: inContact.name, email: inContact.email, category: inContact.category}},
            {returnUpdatedDocs: true},
            (inError: Error | null, numberOfUpdated: number, inUpdateDoc: IContact, upsert: boolean) => {
            if (inError) {
              console.log("Contacts.Worker.addContact(): Error", inError);
              inReject(inError);
            } else {
              console.log("Contacts.Worker.addContact(): Ok", inUpdateDoc);
              console.log("Contacts.Worker.addContact(): Ok, number of update", numberOfUpdated);
              console.log("Contacts.Worker.addContact(): Ok, number of upsert", upsert);
              inResolve(inUpdateDoc);
            }
          }
        );
      });

    } /* End addContact(). */


} /* End class. */
