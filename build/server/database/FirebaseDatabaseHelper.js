"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("firebase/app");
var database_1 = require("firebase/database");
var FirebaseDatabaseHelper = (function () {
    function FirebaseDatabaseHelper() {
        this.firebaseConfig = {
            apiKey: 'AIzaSyCemDgZ0OQFWe3j0ovGGcDHpck_TkfcgB8',
            authDomain: 'rest-api-84c81.firebaseapp.com',
            databaseURL: 'https://rest-api-84c81-default-rtdb.firebaseio.com',
            projectId: 'rest-api-84c81',
            storageBucket: 'rest-api-84c81.appspot.com',
            messagingSenderId: '1054993811345',
            appId: '1:1054993811345:web:f0a53a47ff3e4e7387bc30',
            measurementId: 'G-70TTQE8W7S',
        };
        this.app = null;
        this.database = null;
        this.app = (0, app_1.initializeApp)(this.firebaseConfig);
        this.database = (0, database_1.getDatabase)(this.app);
    }
    FirebaseDatabaseHelper.getInstance = function () {
        if (!this.INSTANCE) {
            this.INSTANCE = new FirebaseDatabaseHelper();
        }
        return this.INSTANCE;
    };
    FirebaseDatabaseHelper.prototype.getFirebaseDatabase = function () {
        return this.database;
    };
    return FirebaseDatabaseHelper;
}());
exports.default = FirebaseDatabaseHelper;
