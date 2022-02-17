"use strict";
var Person = (function () {
    function Person(fullname, imageURL) {
        this.fullname = fullname;
        this.image = imageURL;
    }
    Person.prototype.getFullName = function () {
        return this.fullname;
    };
    Person.prototype.getImageURL = function () {
        return this.image;
    };
    return Person;
}());
