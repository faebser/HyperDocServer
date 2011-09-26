Ext.setup({
	tabletStartupScreen: 'tablet_startup.png',
	phoneStartupScreen: 'phone_startup.png',
	icon: 'icon.png',
	glossOnIcon: false,
	onReady: function() {
	
	var loginForm = new Ext.form.FormPanel ({
		fullscreen : true,
		hidden: true,
		url : '/logMeIn/',
		standardSubmit : false,
		items: [
			        {
			        	xtype: 'textfield',
			        	name : 'username',
			        	label: 'username'
			        },
			        {
			        	xtype: 'passwordfield',
			        	name : 'username',
			        	label: 'password',
			        }
		        ]
	});
	
	var messInput = new Ext.form.FormPanel
	({
		fullscreen : true,
		url : '/mess/',
		standardSubmit : false,
		submitOnAction : true,
		onSubmit: function(e, a) {
	        e.preventDefault();
	        console.log(this);
	        //window.setTimeout( function() {form.reset(); }, 1000);
	        console.log(e);
	        //this.reset();
	        console.log(a);
	    },
		items: [
		        new Ext.form.Text ({
		        	name : 'mess',
		        	placeHolder: 'Text and #Tags',
		        	listeners : {
		        	keyup :function(field, event) { 
		        		var keyCode = event.browserEvent.keyCode;
		        		if(keyCode == 51) {
		        			console.log(event.browserEvent.keyCode);
		        		}
		        	}
		        	}
		        })]
	});
	
	new Ext.Panel ({
		fullscreen : true,
		items : [ loginForm, messInput ]
	});
	
	/*var timeline = new Ext.Component({
            title: 'Timeline',
            cls: 'timeline',
            scroll: 'vertical',
            tpl: [
                '<tpl for=".">',
                    '<div class="tweet">',
                            '<div class="avatar"><img src="{profile_image_url}" /></div>',
                            '<div class="tweet-content">',
                                '<h2>{from_user}</h2>',
                                '<p>{text}</p>',
                            '</div>',
                    '</div>',
                '</tpl>'
            ]
        });

        var map = new Ext.Map({
            title: 'Map',
            getLocation: true,
            mapOptions: {
                zoom: 12
            }
        });

        var panel = new Ext.TabPanel({
            fullscreen: true,
            cardSwitchAnimation: 'slide',
            items: [map, timeline]
        });

        var refresh = function() {
            var coords = map.geo.coords;

            Ext.util.JSONP.request({
                url: 'http://search.twitter.com/search.json',
                callbackKey: 'callback',
                params: {
                    geocode: coords.latitude + ',' + coords.longitude + ',' + '5mi',
                    rpp: 30
                },
                callback: function(data) {
                    data = data.results;

                    // Update the tweets in timeline
                    timeline.update(data);

                    // Add points to the map
                    for (var i = 0, ln = data.length; i < ln; i++) {
                        var tweet = data[i];

                        // If the tweet is geo-tagged, use that to display marker
                        if (tweet.geo && tweet.geo.coordinates) {
                            var position = new google.maps.LatLng(tweet.geo.coordinates[0], tweet.geo.coordinates[1]);
                            addMarker(tweet, position);
                        }
                    }
                }
            });
        };

        // These are all Google Maps APIs
        var addMarker = function(tweet, position) {
            var marker = new google.maps.Marker({
                map: map.map,
                position: position
            });
        };

        map.geo.on('update', refresh);

        var tabBar = panel.getTabBar();
        tabBar.addDocked({
            xtype: 'button',
            ui: 'mask',
            iconCls: 'refresh',
            dock: 'right',
            stretch: false,
            align: 'center',
            handler: refresh
        });
	 */

}
});