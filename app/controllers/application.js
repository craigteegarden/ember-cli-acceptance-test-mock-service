import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    doSomething: function(){
      // access the injected service
      this.loggerService.log('log something');
    }
  }
});
