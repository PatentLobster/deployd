window.App = Backbone.Model.extend({
	url: "/settings",
  parse: function (response) {
    var plugins, _pluginsFromResponse, app = [];

    plugins = new Backbone.Collection();
    plugins.model = Plugin;

    _pluginsFromResponse = _.groupBy(response, function(obj) {
      return obj.plugin;
    });
    
    _.each(_pluginsFromResponse, function (value, key, list){
      if (key !== "undefined") {
        console.log("key: "+key+" & typeof: "+typeof key);
        var _pluginObjects = new Backbone.Collection();
        _pluginObjects.model = PluginObject;
        
        _.each(value, function (element, index, list) {
          _pluginObjects.add(element);
        });
        
        plugins.add({
          //TODO: Add actual ID
          _id: 0,
          name: key,
          objects: _pluginObjects

        });        
      }
    });
    
    console.log(plugins);
    
    return { 
      plugins: plugins,
      name: "app",
      _id: 0,
      host: "hello-world.myname.deployd.com"
    };
  }
});

// Example
// var app = new App({
//   name: 'Hello World',
//   _id: 1234,
//   host: 'hello-world.myname.deployd.com',
// });