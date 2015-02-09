import Ember from 'ember';

export default Ember.Object.extend({
  log: function(message){
    console.log(message);
  }
});
