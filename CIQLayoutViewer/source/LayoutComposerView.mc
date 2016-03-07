using Toybox.WatchUi as Ui;
using Toybox.Communications as Comm;
using Toybox.Graphics as Gfx;
using Toybox.System as Sys;
using Toybox.Application as App;
using Toybox.Timer as Timer;


class LayoutComposerView extends Ui.View {
	var timer;
	var MAX_POLL_COUNT = 30; 
	var pollCount = 0;
	var usePolling = true;
	var pollingInterval = 3000; // milliseconds
	var pollingStopped = false;
	var drawableObjects = null;
	var lastUpdatedDateInitial = "2016-01-01T00:00:00.000Z";
	var lastUpdatedDate = lastUpdatedDateInitial;
    function initialize() {
        View.initialize();
        timer = new Timer.Timer();
    }

	function startNewPollingSequence() {
		pollCount = 0;
		lastUpdatedDate = lastUpdatedDateInitial;
		pollingStopped = false;
		loadDrawables();
	}


    function onLayout(dc) {
        setLayout(Rez.Layouts.MainLayout(dc));
        startNewPollingSequence();
    }

    function onUpdate(dc) {
        dc.setColor(Gfx.COLOR_TRANSPARENT, Gfx.COLOR_BLACK);
        dc.clear();
    
    	if (drawableObjects != null && drawableObjects.size() > 0 && !pollingStopped ){
    		drawObjects(dc);
    	}
    	else {
    		drawPollingStoppedView(dc);
		}
    }

	function drawPollingStoppedView(dc) {
	  drawableObjects = null;
	
      dc.setColor(Gfx.COLOR_TRANSPARENT, Gfx.COLOR_BLACK);
      dc.clear();
	  var screenWidth = dc.getWidth();
	  var screenHeight = dc.getHeight();
	  var screenCenterX = screenWidth / 2;
	  var screenCenterY = screenHeight / 2;
	  var elementPositionX = 0;
	  var elementPositionY = -70;
	  elementPositionX = screenCenterX + elementPositionX;
	  elementPositionY = screenCenterY + elementPositionY;
	  dc.setColor(Gfx.COLOR_BLUE, Gfx.COLOR_TRANSPARENT);
	  dc.drawText(elementPositionX, elementPositionY, Gfx.FONT_LARGE, "Press select\nto restart\npolling",Gfx.TEXT_JUSTIFY_CENTER);    	
	}


	function onReceiveDrawables(responseCode, data) {
        if( responseCode == 200 )
        {
        	
            Sys.println("Received drawables ok");
            lastUpdatedDate = data["lastUpdatedDate"];
            Sys.println("last updated date set: " + lastUpdatedDate);
            createDrawables(data);
	        Ui.requestUpdate();
	        if (pollCount < MAX_POLL_COUNT) {
		        startPolling();
	        }
	        else {
    			pollingStopped = true;
		        Ui.requestUpdate();
	        }
	        
        }
        else if (responseCode == 304) {
            Sys.println("304 not modified");
	        if (pollCount < MAX_POLL_COUNT) {
		        startPolling();
	        }
	        else {
    			pollingStopped = true;
		        Ui.requestUpdate();
	        }
        }
        else
        {
            Sys.println("Received drawables failed response:" +  responseCode);
            Sys.println("Stopping polling");
			pollingStopped = true;
	        Ui.requestUpdate();
        }
	}

	function loadDrawables(){
		pollCount ++;
    	Sys.println(pollCount);
		drawableObjects = null;
		var drawablesUrl = "http://localhost:3043/ConnectIQLayouts/active";
    	Sys.println("Using data from web");

    	Sys.println("Using data from web: " + drawablesUrl);
		var options = {
		    :method => Comm.HTTP_REQUEST_METHOD_GET,
		    :headers => { "If-Modified-Since" => lastUpdatedDate 	 }
		};
		Comm.makeJsonRequest(drawablesUrl, {}, options, method(:onReceiveDrawables));
	}
	
	function startPolling() {
		timer.start( method(:loadDrawables), pollingInterval, false );
	}


	function createDrawables(activeLayout){
		var elements = activeLayout["elements"];
		var count = elements.size();
        Sys.println("Count: " + count);
        drawableObjects = new[count];	
		for (var index = 0; index < count; index++) {
            var element = elements[index];
            var generator = drawableGeneratorFactory.build(element);
            if (generator != null)
            {
            	drawableObjects[index] = generator;
            }
        }
	
	}
	
	function drawObjects(dc) {
		for (var index = 0; index < drawableObjects.size() ; index++) {
            var objectToDraw = drawableObjects[index];
            if (objectToDraw != null && objectToDraw has :draw)
            {
            	objectToDraw.draw(dc);
            }
        }
	}
}

