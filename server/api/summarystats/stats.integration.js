'use strict';

var app = require('../..');
import request from 'supertest';

var newStats;

describe('Stats API:', function() {

  describe('GET /api/stats', function() {
    var stats;

    beforeEach(function(done) {
      request(app)
        .get('/api/stats')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          stats = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      stats.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/stats', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/stats')
        .send({
          name: 'New Stats',
          info: 'This is the brand new thing!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newStats = res.body;
          done();
        });
    });

    it('should respond with the newly created thing', function() {
      newStats.name.should.equal('New Stats');
      newStats.info.should.equal('This is the brand new thing!!!');
    });

  });

  describe('GET /api/stats/:id', function() {
    var thing;

    beforeEach(function(done) {
      request(app)
        .get('/api/stats/' + newStats._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          thing = res.body;
          done();
        });
    });

    afterEach(function() {
      thing = {};
    });

    it('should respond with the requested thing', function() {
      thing.name.should.equal('New Stats');
      thing.info.should.equal('This is the brand new thing!!!');
    });

  });

  describe('PUT /api/stats/:id', function() {
    var updatedStats;

    beforeEach(function(done) {
      request(app)
        .put('/api/stats/' + newStats._id)
        .send({
          name: 'Updated Stats',
          info: 'This is the updated thing!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedStats = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedStats = {};
    });

    it('should respond with the updated thing', function() {
      updatedStats.name.should.equal('Updated Stats');
      updatedStats.info.should.equal('This is the updated thing!!!');
    });

  });

  describe('DELETE /api/stats/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/stats/' + newStats._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when thing does not exist', function(done) {
      request(app)
        .delete('/api/stats/' + newStats._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
