/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 * POST    /api/things              ->  create
 * GET     /api/things/:id          ->  show
 * PUT     /api/things/:id          ->  update
 * DELETE  /api/things/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Stats from './stats.model';
import mongoose from 'mongoose';
// var mongoose = require('mongoose');


var StatsSchema = new mongoose.Schema({
  date: String,
  channels: Number,
  viewers: Number
});

var Tick = mongoose.model('Statistics', StatsSchema);

export function savestats(req, res) {
    var tickEntry = new Tick(req.body);
    return tickEntry.save(function(err) {
        if(err) {
            res.json(err);
            return err;
        } else {
            res.json(200);
        }
    }).then(function(ret) {
        console.log('******',ret);
        return ret;
    });
}

export function graphstats(req, res) {
    return Tick.find().sort({"date": 1}).limit(1).then(function(data) {
        console.log('****GET ****');
        console.log(data);
        res.json(data);
    });
}

//export function graphstats(req, res) {
    //var initialQuery = Statistics.find().sort({"date": 1});
    //res.json(initialQuery);
    // return Statistics.find().sort({"date": 1}).then(function(data, err) {
    //     return data;
    //     console.log(data);
    // });
    // return Statistics.find().sort({"date": 1}).limit(2).then(function(data) {
    //     console.log('*** INITIAL GET OF STATS ***');
    //     console.log(data);
    //     res.json(data);
    //     return data;
    // })
//}

//
// function respondWithResult(res, statusCode) {
//   statusCode = statusCode || 200;
//   return function(entity) {
//     if (entity) {
//       res.status(statusCode).json(entity);
//     }
//   };
// }
//
// function saveUpdates(updates) {
//   return function(entity) {
//     var updated = _.merge(entity, updates);
//     return updated.saveAsync()
//       .spread(updated => {
//         return updated;
//       });
//   };
// }
//
// function removeEntity(res) {
//   return function(entity) {
//     if (entity) {
//       return entity.removeAsync()
//         .then(() => {
//           res.status(204).end();
//         });
//     }
//   };
// }
//
// function handleEntityNotFound(res) {
//   return function(entity) {
//     if (!entity) {
//       res.status(404).end();
//       return null;
//     }
//     return entity;
//   };
// }
//
// function handleError(res, statusCode) {
//   statusCode = statusCode || 500;
//   return function(err) {
//     res.status(statusCode).send(err);
//   };
// }
//
// // Gets a list of Things
// export function index(req, res) {
//   Stats.findAsync()
//     .then(respondWithResult(res))
//     .catch(handleError(res));
// }
//
// // Gets a single Stats from the DB
// export function show(req, res) {
//   Stats.findByIdAsync(req.params.id)
//     .then(handleEntityNotFound(res))
//     .then(respondWithResult(res))
//     .catch(handleError(res));
// }
//
// // Creates a new Stats in the DB
// export function create(req, res) {
//       console.log('SERVER SIDE');
//       console.log(req.body);
//     //   res.json({
//     //         status: 200,
//     //         data: req.body
//     //   })
//   Stats.createAsync(req.body)
//     .then(respondWithResult(res, 201))
//     .catch(handleError(res));
// }
//
// // Updates an existing Stats in the DB
// export function update(req, res) {
//   if (req.body._id) {
//     delete req.body._id;
//   }
//   Stats.findByIdAsync(req.params.id)
//     .then(handleEntityNotFound(res))
//     .then(saveUpdates(req.body))
//     .then(respondWithResult(res))
//     .catch(handleError(res));
// }
//
// // Deletes a Stats from the DB
// export function destroy(req, res) {
//   Stats.findByIdAsync(req.params.id)
//     .then(handleEntityNotFound(res))
//     .then(removeEntity(res))
//     .catch(handleError(res));
// }
