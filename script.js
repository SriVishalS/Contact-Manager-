'use strict';

window.onload = init;

let addContactBtn = document.querySelector('.add-cont');
let contList = document.querySelector('.contact-indx')
let givenName = document.querySelector('.name input'),
      familyName = document.querySelector('.family-name input'),
      phoneNumber = document.querySelector('.phone input');
let optionBtn = document.querySelector('.more-option-btn'),
      optionContainer = document.querySelector('.option-container'),
      featuresBtn = document.querySelector('.features .features-btn'),
      featuresList = document.querySelector('.features .features-list');
let sortAlphabetBtn, sortPhoneNumBtn;
const deleteAllBtn = document.querySelector('.option-container .delete-all'),
      saveBtn = document.querySelector('.option-container .save'),
      loadBtn = document.querySelector('.option-container .load'),
      deleteOne = document.querySelector('.more-option .delete-one input'),
      deleteOneBtn = document.querySelector('.delete-one .delete-one-btn');

function init() {
      addContactBtn.addEventListener('click', _ => {

            if (givenName.value && familyName.value && phoneNumber.value) {

                  db.addContact(db.getInputVal());


                  db.contactIndx();

                  let warnMsg = document.querySelector('body > p');

                  if (warnMsg) {
                        warnMsg.remove();
                  }
            } else {
                  let msgElem = document.querySelector('body > p');

                  if (msgElem) {
                        document.querySelector('body > p').remove();
                  }

                  let msg = document.createElement('p');
                  let fieldsContainer = document.querySelector('.fields-container');

                  fieldsContainer.parentNode.insertBefore(msg, fieldsContainer);

                  msgElem = document.querySelector('body > p');

                  msgElem.innerText = 'There\'s an empty input make sure that all inputs are filled';
            }

            givenName.value = '';
            familyName.value = '';
            phoneNumber.value = '';
      }, false);

      optionBtn.addEventListener('click', function () {
            if (!optionContainer.classList.contains('open')) {
                  optionContainer.classList.add('open');
                  this.classList.add('open');
            } else {
                  optionContainer.classList.remove('open');
                  this.classList.remove('open');
            }
      }, false);

      featuresBtn.addEventListener('click', function () {
            if (!featuresList.classList.contains('open')) {
                  featuresList.classList.add('open');
                  this.classList.add('open');
            } else {
                  featuresList.classList.remove('open');
                  this.classList.remove('open');
            }
      }, false);

      saveBtn.addEventListener('click', _ => {
            db.save();
      }, false);

      loadBtn.addEventListener('click', _ => {
            db.load();
      }, false);

      deleteAllBtn.addEventListener('click', _ => {
            db.deleteAll();
      }, false);

      deleteOneBtn.addEventListener('click', _ => {
            db.deleteSpecificContact();
            deleteOne.value = '';
      }, false);
}

class Contact {
      constructor(givenName, familyName, phoneNumber) {
            this.givenName = givenName;
            this.familyName = familyName;
            this.phoneNumber = phoneNumber;
      }
}

class ContactManger {
      constructor() {
            this.contactList = [];
      }

      addContact(contact) {
            this.contactList.push(contact);
      }

      getInputVal() {
            let person = new Contact(givenName.value, familyName.value, phoneNumber.value);

            return person;
      }

      contactIndx() {
            contList.innerHTML = '';

            let table = document.createElement('table'),
                  tHead = table.createTHead(),
                  tHeadRow = tHead.insertRow(),
                  tHeadCell1 = tHeadRow.insertCell(),
                  // tHeadCell2 = tHeadRow.insertCell(),
                  tHeadCell3 = tHeadRow.insertCell(),
                  tBody = table.createTBody();

            contList.append(table);
            tHeadCell1.innerHTML = 'Full Name';
            tHeadCell3.innerHTML = 'Phone';

            this.contactList.forEach((current, indx) => {
                  let tBodyRow = tBody.insertRow(indx);

                  tBodyRow.innerHTML += '<td>' + current.givenName + ' ' + current.familyName + '</td>' + '<td>' + current.phoneNumber + '</td>';
            });

            tHeadCell1.classList.add('sort-alphabet');
            tHeadCell3.classList.add('sort-phonenum');
            sortAlphabetBtn = document.querySelector('table .sort-alphabet');
            sortPhoneNumBtn = document.querySelector('table .sort-phonenum');

            sortAlphabetBtn.addEventListener('click', _ => {
                  this.alphabetSorting();
                  this.contactIndx();
                  sortAlphabetBtn.classList.add('sort');
                  localStorage.saveContacts = JSON.stringify(this.contactList);
            }, false);

            sortPhoneNumBtn.addEventListener('click', _ => {
                  this.phoneNumSorting();
                  this.contactIndx();
                  sortPhoneNumBtn.classList.add('sort');
                  localStorage.saveContacts = JSON.stringify(this.contactList);
            }, false);
      }

      deleteAll() {
            this.contactList = [];
            localStorage.saveContacts = '';
            this.contactIndx();
      }

      alphabetSorting() {
            this.contactList.sort(ContactManger.sortingByAlphabet);
      }

      static sortingByAlphabet(p1, p2) {
            if (p1.givenName < p2.givenName) return -1;
            if (p1.givenName > p2.givenName) return 1;
            // return 0;
      }

      phoneNumSorting() {
            this.contactList.sort(ContactManger.sortingByPhoneNum);
      }

      static sortingByPhoneNum(p1, p2) {
            if (p1.phoneNumber < p2.phoneNumber) return -1;
            if (p1.phoneNumber > p2.phoneNumber) return 1;
      }

      save() {
            localStorage.saveContacts = JSON.stringify(this.contactList);
      }

      load() {
            if (localStorage.saveContacts !== undefined) {
                  this.contactList = JSON.parse(localStorage.saveContacts);
                  this.contactIndx();
            }
      }

      deleteSpecificContact() {
            this.contactList.forEach((contact, indx) => {
                  let deleteOneValLowerCase = deleteOne.value.toLowerCase(),

                        fullName = contact.givenName + ' ' + contact.familyName;
                  console.log(deleteOneValLowerCase);


                  if (fullName.toLowerCase() === deleteOneValLowerCase) {
                        this.contactList.splice(indx, 1);
                        localStorage.saveContacts = JSON.stringify(this.contactList);
                        this.contactIndx();
                  }
            });
      }
}

// Declare ContactManger class
let db = new ContactManger();
