import Ember from 'ember';
import Resolver from 'ember/resolver';
import startApp from '../helpers/start-app';

var application;
var mockLoggerLogCalled;

module('Acceptance: Application With MockResolver', {
  setup: function() {

    // Modifying the resolver to act like it doesn't have a matching module
    // for the mocked service allows the container's `resolve()` method
    // to get the service implementation from it's registry instead of re-getting
    // the original module.
    var MockResolver = Resolver.extend({
      resolveOther: function(parsedName) {

        if (parsedName.fullName === "service:logger") {
          return undefined;
        } else {
          return this._super(parsedName);
        }
      }
    });

    application = startApp({
      Resolver: MockResolver
    });

    mockLoggerLogCalled = 0;
    var mockLogger = Ember.Object.create({
      log: function(m){
        mockLoggerLogCalled = mockLoggerLogCalled + 1;
      }
    });

    // this now works to register our mock service
    application.__container__.unregister('service:logger');
    application.register('service:logger', mockLogger, {instantiate: false});

  },
  teardown: function() {
    Ember.run(application, 'destroy');
  }
});

test('application with-mock', function() {
  visit('/');
  click('#do-something-button');
  andThen(function() {
    equal(mockLoggerLogCalled, 1, 'log called once');
  });
});
