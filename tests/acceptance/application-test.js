import Ember from 'ember';
import startApp from '../helpers/start-app';

var application;
var mockLoggerLogCalled;

module('Acceptance: Application', {
  setup: function() {

    application = startApp();

    mockLoggerLogCalled = 0;
    var mockLogger = Ember.Object.create({
      log: function(m){
        mockLoggerLogCalled = mockLoggerLogCalled + 1;
      }
    });

    // this un-register originally service, register new mock service
    // is the method mentinoed in this talk: 
    // http://www.slideshare.net/mixonic/testing-ember-apps-managing-dependency/61
    // This doesn't work with ember-cli's resolver -- the container will always use
    // the original module when looking up `service:logger`, overwriting our custom
    // mock version of the service.
    application.__container__.unregister('service:logger');
    application.register('service:logger', mockLogger, {instantiate: false});

  },
  teardown: function() {
    Ember.run(application, 'destroy');
  }
});

test('application', function() {
  visit('/');
  click('#do-something-button');
  andThen(function() {
    equal(mockLoggerLogCalled, 1, 'log called once');
  });
});