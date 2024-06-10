/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require('express')
const functions = require('firebase-functions');

const app = express()

app.get('/actuaciones/:id', (req, res) => {
  res.status(301).redirect('/')
})

exports.app = functions.https.onRequest(app)