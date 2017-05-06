// basic code from https://snippetrepo.com/snippets/pub-sub-javascript-module-for-two-way-data-binding

var events = (function(){
  var topics = {};
  var hOP = topics.hasOwnProperty;

  return {
    subscribe: function(topic, listener) {
      // Create the topic's object if not yet created
      if(!hOP.call(topics, topic)) topics[topic] = [];

      // Add the listener to queue
      var index = topics[topic].push(listener) -1;

      // Provide handle back for removal of topic
      return {
        remove: function() {
          delete topics[topic][index];
        }
      };
    },
    publish: function(topic, info) {
      // If the topic doesn't exist, or there's no listeners in queue, just leave
      if(!hOP.call(topics, topic)) return;

      // Cycle through topics queue, fire!
      topics[topic].forEach(function(item) {
          item(info||{});
      });
    }
  };
})();

//set the subscriber
var subscription = events.subscribe('modelUpdate', function(obj) {
            // Do something now that the event has occurred
            $('#someDiv').append(obj.reason);
        });

//set the publisher
    events.publish('modelUpdate', {
        reason: 'update model' // any argument
    });
