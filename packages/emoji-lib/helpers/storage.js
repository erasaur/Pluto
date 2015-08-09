var utils = EMO.utils;
var storage = EMO.helpers.storage = {};

var STORAGE_NAME = 'pluto-storage';

storage.get = function (key) {
  var store = localStorage.getItem(STORAGE_NAME);
  return key ? utils.get(store, key) : store;
};

storage.set = function (item) {
  var store = storage.get();
  store = store || [];
  store.push(item);
  localStorage.setItem(STORAGE_NAME, store);
  return store;
};
