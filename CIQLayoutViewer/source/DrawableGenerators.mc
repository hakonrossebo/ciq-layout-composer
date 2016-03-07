using Toybox.WatchUi as Ui;
using Toybox.Graphics as Gfx;
using Toybox.System as Sys;

module drawableGenerators
{
	class LabelGenerator {
		hidden var xPosScreen = 0;
		hidden var yPosScreen = 0;
		hidden var xposCenter = false;
		hidden var yposCenter = false;
		hidden var xPos = 0;
		hidden var yPos = 0;
		hidden var displayText = "";
		hidden var font = "";
		hidden var justification = "";
		hidden var color = ""; 
	    function initialize(element) {
	        xPos = element["coordinates"][0]["xpos"];
	        yPos = element["coordinates"][0]["ypos"];
	        xposCenter = element["coordinates"][0]["xposCenter"];
	        yposCenter = element["coordinates"][0]["yposCenter"];
	        displayText = element["displayText"];
	        font = element["font"];
	        justification = element["justification"];
	        color = element["color"];
	    }
		function draw(dc){
			var width = dc.getWidth();
	        var height = dc.getHeight();
	        var centerY = height / 2;
	        var centerX = width / 2;
	        
	        if(xposCenter)
	        {
	        	xPosScreen = centerX;
	        }
	        if(yposCenter)
	        {
	        	yPosScreen = centerY;
	        }
	        xPosScreen = xPosScreen + xPos;
	        yPosScreen = yPosScreen + yPos;
		
        	dc.setColor(globalConstantsUtility.getColor(color), Gfx.COLOR_TRANSPARENT);
        	Sys.println("drawing item - x:" + xPosScreen + ", y:" + yPosScreen + ", text:" + displayText);
		    dc.drawText(xPosScreen, yPosScreen, globalConstantsUtility.getFont(font),displayText,globalConstantsUtility.getTextJustification(justification));
		}
	}
	
	class CircleGenerator {
		hidden var xPosScreen = 0;
		hidden var yPosScreen = 0;
		hidden var xposCenter = false;
		hidden var yposCenter = false;
		hidden var xPos = 0;
		hidden var yPos = 0;
		hidden var xRadius = 0;
		hidden var filled = false;
		hidden var color = ""; 
	    function initialize(element) {
	        xPos = element["coordinates"][0]["xpos"];
	        yPos = element["coordinates"][0]["ypos"];
	        xposCenter = element["coordinates"][0]["xposCenter"];
	        yposCenter = element["coordinates"][0]["yposCenter"];
	        xRadius = element["xRadius"];
	        filled = element["filled"];
	        color = element["color"];
	    }
		function draw(dc){
			var width = dc.getWidth();
	        var height = dc.getHeight();
	        var centerY = height / 2;
	        var centerX = width / 2;
	        
	        if(xposCenter)
	        {
	        	xPosScreen = centerX;
	        }
	        if(yposCenter)
	        {
	        	yPosScreen = centerY;
	        }
	        xPosScreen = xPosScreen + xPos;
	        yPosScreen = yPosScreen + yPos;
		
        	dc.setColor(globalConstantsUtility.getColor(color), Gfx.COLOR_TRANSPARENT);
        	Sys.println("drawing item - x:" + xPosScreen + ", y:" + yPosScreen + ", radius:" + xRadius);
		    if (filled) {
			    dc.fillCircle(xPosScreen, yPosScreen, xRadius);
		    }
		    else {
			    dc.drawCircle(xPosScreen, yPosScreen, xRadius);
		    }
		}
	}	

	class EllipseGenerator {
		hidden var xPosScreen = 0;
		hidden var yPosScreen = 0;
		hidden var xposCenter = false;
		hidden var yposCenter = false;
		hidden var xPos = 0;
		hidden var yPos = 0;
		hidden var xRadius = 0;
		hidden var yRadius = 0;
		hidden var filled = false;
		hidden var color = ""; 
	    function initialize(element) {
	        xPos = element["coordinates"][0]["xpos"];
	        yPos = element["coordinates"][0]["ypos"];
	        xposCenter = element["coordinates"][0]["xposCenter"];
	        yposCenter = element["coordinates"][0]["yposCenter"];
	        xRadius = element["xRadius"];
	        yRadius = element["yRadius"];
	        filled = element["filled"];
	        color = element["color"];
	    }
		function draw(dc){
			var width = dc.getWidth();
	        var height = dc.getHeight();
	        var centerY = height / 2;
	        var centerX = width / 2;
	        
	        if(xposCenter)
	        {
	        	xPosScreen = centerX;
	        }
	        if(yposCenter)
	        {
	        	yPosScreen = centerY;
	        }
	        xPosScreen = xPosScreen + xPos;
	        yPosScreen = yPosScreen + yPos;
		
        	dc.setColor(globalConstantsUtility.getColor(color), Gfx.COLOR_TRANSPARENT);
        	Sys.println("drawing item - x:" + xPosScreen + ", y:" + yPosScreen + ", radius:" + xRadius);
		    if (filled) {
			    dc.fillEllipse(xPosScreen, yPosScreen, xRadius, yRadius);
		    }
		    else {
			    dc.drawEllipse(xPosScreen, yPosScreen, xRadius, yRadius);
		    }
		}
	}	


	class RectangleGenerator {
		hidden var xPosScreen = 0;
		hidden var yPosScreen = 0;
		hidden var xposCenter = false;
		hidden var yposCenter = false;
		hidden var xPos = 0;
		hidden var yPos = 0;
		hidden var rectangleWidth = 0;
		hidden var rectangleHeight = 0;
		hidden var filled = false;
		hidden var color = ""; 
	    function initialize(element) {
	        xPos = element["coordinates"][0]["xpos"];
	        yPos = element["coordinates"][0]["ypos"];
	        xposCenter = element["coordinates"][0]["xposCenter"];
	        yposCenter = element["coordinates"][0]["yposCenter"];
	        rectangleWidth = element["rectangleWidth"];
	        rectangleHeight = element["rectangleHeight"];
	        filled = element["filled"];
	        color = element["color"];
	    }
		function draw(dc){
			var width = dc.getWidth();
	        var height = dc.getHeight();
	        var centerY = height / 2;
	        var centerX = width / 2;
	        
	        if(xposCenter)
	        {
	        	xPosScreen = centerX;
	        }
	        if(yposCenter)
	        {
	        	yPosScreen = centerY;
	        }
	        xPosScreen = xPosScreen + xPos;
	        yPosScreen = yPosScreen + yPos;

        	dc.setColor(globalConstantsUtility.getColor(color), Gfx.COLOR_TRANSPARENT);
        	Sys.println("drawing item - x:" + xPosScreen + ", y:" + yPosScreen + "rectangleWidth" + rectangleWidth + "rectangleHeight" + rectangleHeight);
		    if (filled) {
			    dc.fillRectangle(xPosScreen, yPosScreen, rectangleWidth, rectangleHeight);
		    }
		    else {
			    dc.drawRectangle(xPosScreen, yPosScreen, rectangleWidth, rectangleHeight);
		    }
		}
	}	

	class ArcGenerator {
		hidden var xPosScreen = 0;
		hidden var yPosScreen = 0;
		hidden var xposCenter = false;
		hidden var yposCenter = false;
		hidden var xPos = 0;
		hidden var yPos = 0;
		hidden var degreeStart = 0;
		hidden var degreeEnd = 0;
		hidden var xRadius = 0;
		hidden var arcType = "ARC_CLOCKWISE";
		hidden var color = ""; 
	    function initialize(element) {
	        xPos = element["coordinates"][0]["xpos"];
	        yPos = element["coordinates"][0]["ypos"];
	        xposCenter = element["coordinates"][0]["xposCenter"];
	        yposCenter = element["coordinates"][0]["yposCenter"];
	        degreeStart = element["degreeStart"];
	        degreeEnd = element["degreeEnd"];
	        xRadius = element["xRadius"];
	        arcType = element["arcType"];
	        color = element["color"];
	    }
		function draw(dc){
			var width = dc.getWidth();
	        var height = dc.getHeight();
	        var centerY = height / 2;
	        var centerX = width / 2;
	        
	        if(xposCenter)
	        {
	        	xPosScreen = centerX;
	        }
	        if(yposCenter)
	        {
	        	yPosScreen = centerY;
	        }
	        xPosScreen = xPosScreen + xPos;
	        yPosScreen = yPosScreen + yPos;

        	dc.setColor(globalConstantsUtility.getColor(color), Gfx.COLOR_TRANSPARENT);
        	Sys.println("drawing item - x:" + xPosScreen + ", y:" + yPosScreen + "arcType:" + arcType + "xRadius:" + xRadius + "degreeStart:" + degreeStart + "degreeEnd:" + degreeEnd);
		    dc.drawArc(xPosScreen, yPosScreen, xRadius, globalConstantsUtility.getArcType(arcType), degreeStart,  degreeEnd);
		}
	}	

	class PointGenerator {
		hidden var xPosScreen = 0;
		hidden var yPosScreen = 0;
		hidden var xposCenter = false;
		hidden var yposCenter = false;
		hidden var xPos = 0;
		hidden var yPos = 0;
		hidden var color = ""; 
	    function initialize(element) {
	        xPos = element["coordinates"][0]["xpos"];
	        yPos = element["coordinates"][0]["ypos"];
	        xposCenter = element["coordinates"][0]["xposCenter"];
	        yposCenter = element["coordinates"][0]["yposCenter"];
	        color = element["color"];
	    }
		function draw(dc){
			var width = dc.getWidth();
	        var height = dc.getHeight();
	        var centerY = height / 2;
	        var centerX = width / 2;
	        
	        if(xposCenter)
	        {
	        	xPosScreen = centerX;
	        }
	        if(yposCenter)
	        {
	        	yPosScreen = centerY;
	        }
	        xPosScreen = xPosScreen + xPos;
	        yPosScreen = yPosScreen + yPos;

        	dc.setColor(globalConstantsUtility.getColor(color), Gfx.COLOR_TRANSPARENT);
        	Sys.println("drawing item - x:" + xPosScreen + ", y:" + yPosScreen);
		    dc.drawPoint(xPosScreen, yPosScreen);
		}
	}	

	class LineGenerator {
		hidden var xPosScreen = 0;
		hidden var yPosScreen = 0;
		hidden var xPosScreen2 = 0;
		hidden var yPosScreen2 = 0;
		hidden var xposCenter = false;
		hidden var yposCenter = false;
		hidden var xPos = 0;
		hidden var yPos = 0;
		hidden var xPos2 = 0;
		hidden var yPos2 = 0;
		hidden var color = ""; 
		hidden var lineWidth = 1; 
	    function initialize(element) {
	        xPos = element["coordinates"][0]["xpos"];
	        yPos = element["coordinates"][0]["ypos"];
	        xPos2 = element["coordinates"][1]["xpos"];
	        yPos2 = element["coordinates"][1]["ypos"];
	        xposCenter = element["coordinates"][0]["xposCenter"];
	        yposCenter = element["coordinates"][0]["yposCenter"];
	        color = element["color"];
	        lineWidth = element["lineWidth"];
	    }
		function draw(dc){
			var width = dc.getWidth();
	        var height = dc.getHeight();
	        var centerY = height / 2;
	        var centerX = width / 2;
	        
	        if(xposCenter)
	        {
	        	xPosScreen = centerX;
	        }
	        if(yposCenter)
	        {
	        	yPosScreen = centerY;
	        }
	        xPosScreen2 = xPosScreen + xPos2;
	        yPosScreen2 = yPosScreen + yPos2;

	        xPosScreen = xPosScreen + xPos;
	        yPosScreen = yPosScreen + yPos;

        	dc.setColor(globalConstantsUtility.getColor(color), Gfx.COLOR_TRANSPARENT);
        	dc.setPenWidth(lineWidth);
        	Sys.println("drawing item - x:" + xPosScreen + ", y:" + yPosScreen);
		    dc.drawLine(xPosScreen, yPosScreen, xPosScreen2, yPosScreen2);
        	dc.setPenWidth(1);
		}
	}	

}