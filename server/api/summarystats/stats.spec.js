'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var StatsCtrlStub = {
  index: 'StatsCtrl.index',
  show: 'StatsCtrl.show',
  create: 'StatsCtrl.create',
  update: 'StatsCtrl.update',
  destroy: 'StatsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var StatsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './Stats.controller': StatsCtrlStub
});

describe('Thing API Router:', function() {

  it('should return an express router instance', function() {
    StatsIndex.should.equal(routerStub);
  });

  describe('GET /api/Statss', function() {

    it('should route to Stats.controller.index', function() {
      routerStub.get
        .withArgs('/', 'StatsCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/Statss/:id', function() {

    it('should route to Stats.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'StatsCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/Statss', function() {

    it('should route to Stats.controller.create', function() {
      routerStub.post
        .withArgs('/', 'StatsCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/Statss/:id', function() {

    it('should route to Stats.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'StatsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/Statss/:id', function() {

    it('should route to Stats.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'StatsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/Statss/:id', function() {

    it('should route to Stats.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'StatsCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
