/* Backbone API: Foursquare
 * Source: https://github.com/backbone-api/foursquare
 *
 * Created by Makis Tracend (@tracend)
 * Distributed through [Makesites.org](http://makesites.org)
 * Released under the [MIT license](http://makesites.org/licenses/MIT)
 */

(function(_, Backbone) {

	// support the APP namespace (if available)
	var Model = ( typeof APP != "undefined" && !_.isUndefined( APP.Model) ) ? APP.Model : Backbone.Model;
	var View = (typeof APP != "undefined" && !_.isUndefined( APP.View) ) ? APP.View : Backbone.View;
	var Collection = (typeof APP != "undefined" && !_.isUndefined( APP.Collection) ) ? APP.Collection : Backbone.Collection;


	// main request method
	Foursquare = new Backbone.Model({

	});

	// namespace
	Foursquare.Models = {};
	Foursquare.Collection = {};
	Foursquare.Views = {};


	// **Models**: ...

	Foursquare.Models.User = Model.extend({
		defaults: { },
		url: function(){ return "users/"+ this.get("id") },
		initialize: function(){
			// call cache on every state change
			// add the access token
			//this.token = access.token;
		},
		parse: function( data ){
			return (data.user) ? data.user : data;
		}
	});

	Foursquare.Models.Me = Foursquare.Models.User.extend({
		defaults : {
			id : "self"
		}
	});

	Foursquare.Models.AddCheckin = Model.extend({
		defaults : {
			venueId : 0
		},
		url : "checkins/add"
	});

	Foursquare.Models.Friend = Model.extend({
		defaults: { },
		initialize: function(){
			// call cache on every state change

		},
		parse: function( data ){
			return (data.user) ? data.user : data;
		}
	});

	Foursquare.Models.Venue = Model.extend({
		defaults: { },
		initialize: function(){
			// call cache on every state change

		}
	});



	// **Collections**: ...

	Foursquare.Collections.Tips = Collection.extend({
		options: {
			user: "self"
		},
		defaults: { },
		url: function(){ return "users/"+ this.options.user +"/tips" },
		initialize: function(){
			// call cache on every state change

		},
		parse: function( data ){
			console.log(data);
			return (data.tips) ? data.tips.items : data;
		}
	});

	Foursquare.Collections.Friends = Collection.extend({
		options: {
			user: "self"
		},
		url: function(){ return "users/"+ this.options.user +"/friends" },
		initialize: function(){
			// call cache on every state change
		},
		parse: function( data ){
			return (data.friends) ? data.friends.items : data;
		}
	});


	Foursquare.Collections.Venues = Collection.extend({
		url: function(){
			return "venues/search?"
				+ "ll="+ app.state.location.coords.latitude +","+ app.state.location.coords.longitude
				+"&radius=50"; // hard-code radius to 50m
				//+"&oauth_token="+ app.session.get("access_token");
		},
		initialize: function(){
			// call cache on every state change

		},
		parse: function( data ){
			//console.log( data );
			return (data.venues) ? data.venues : data;
		}
	});

	// Fallbacks
	if( _.isUndefined(Backbone.API) ) Backbone.API = {};
	Backbone.API.Foursquare = Foursquare;

	// Shortcut
	if(typeof window.Foursquare == "undefined"){
		window.Foursquare = Backbone.API.Foursquare;
	}

})(this._, this.Backbone);