"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
// Node imports.
const path = __importStar(require("path"));
// Library imports.
const Datastore = require("nedb");
// The worker that will perform contact operations.
class Worker {
    /**
     * Constructor.
     */
    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "contacts.db"),
            autoload: true
        });
    } /* End constructor. */
    /**
     * Lists all contacts.
     *
     * @return A promise that eventually resolves to an array of IContact objects.
     */
    listContacts() {
        console.log("Contacts.Worker.listContacts()");
        return new Promise((inResolve, inReject) => {
            this.db.find({}, (inError, inDocs) => {
                if (inError) {
                    console.log("Contacts.Worker.listContacts(): Error", inError);
                    inReject(inError);
                }
                else {
                    console.log("Contacts.Worker.listContacts(): Ok", inDocs);
                    inResolve(inDocs);
                }
            });
        });
    } /* End listContacts(). */
    /**
     * Add a new contact.
     *
     * @param  inContact The contact to add.
     * @return           A promise that eventually resolves to an IContact object.
     */
    addContact(inContact) {
        console.log("Contacts.Worker.addContact()", inContact);
        return new Promise((inResolve, inReject) => {
            this.db.insert(inContact, (inError, inNewDoc) => {
                if (inError) {
                    console.log("Contacts.Worker.addContact(): Error", inError);
                    inReject(inError);
                }
                else {
                    console.log("Contacts.Worker.addContact(): Ok", inNewDoc);
                    inResolve(inNewDoc);
                }
            });
        });
    } /* End addContact(). */
    /**
     * Delete a contact.
     *
     * @param  inID The ID of the contact to delete.
     * @return      A promise that eventually resolves to a string (null for success, or the error message for an error).
     */
    deleteContact(inID) {
        console.log("Contacts.Worker.deleteContact()", inID);
        return new Promise((inResolve, inReject) => {
            this.db.remove({ _id: inID }, {}, (inError, inNumRemoved) => {
                if (inError) {
                    console.log("Contacts.Worker.deleteContact(): Error", inError);
                    inReject(inError);
                }
                else {
                    console.log("Contacts.Worker.deleteContact(): Ok", inNumRemoved);
                    inResolve("");
                }
            });
        });
    } /* End deleteContact(). */
    /**
     * Update a new contact.
     *
     * @param  inContact The contact to add.
     * @return           A promise that eventually resolves to an IContact object.
     */
    updateContact(inContact) {
        console.log("Contacts.Worker.updateContact()", inContact);
        return new Promise((inResolve, inReject) => {
            this.db.update({ _id: inContact._id }, { $set: { name: inContact.name, email: inContact.email, category: inContact.category } }, { returnUpdatedDocs: true }, (inError, numberOfUpdated, inUpdateDoc, upsert) => {
                if (inError) {
                    console.log("Contacts.Worker.addContact(): Error", inError);
                    inReject(inError);
                }
                else {
                    console.log("Contacts.Worker.addContact(): Ok", inUpdateDoc);
                    console.log("Contacts.Worker.addContact(): Ok, number of update", numberOfUpdated);
                    console.log("Contacts.Worker.addContact(): Ok, number of upsert", upsert);
                    inResolve(inUpdateDoc);
                }
            });
        });
    } /* End addContact(). */
} /* End class. */
exports.Worker = Worker;
//# sourceMappingURL=Contacts.js.map