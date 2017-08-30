import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {

    toCreditForm: function(summ) {
      this.set('howMany', summ.toString());
      this.toggleProperty('isExpanded');
    }
    
  }
});
