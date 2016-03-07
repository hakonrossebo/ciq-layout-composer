using Toybox.System as Sys;

module drawableGeneratorFactory
{
    function build(drawableElement){
        Sys.println("building item..");
        var elementType = drawableElement["elementtype"];
        Sys.println("element type " + elementType);
        if (elementType.equals("text")) {
        	Sys.println("text generator");
        	return new drawableGenerators.LabelGenerator(drawableElement);
        }
        else if (elementType.equals("circle")) {
        	Sys.println("CircleGenerator");
        	return new drawableGenerators.CircleGenerator(drawableElement);
        }
        else if (elementType.equals("ellipse")) {
        	Sys.println("EllipseGenerator");
        	return new drawableGenerators.EllipseGenerator(drawableElement);
        }
        else if (elementType.equals("rectangle")) {
        	Sys.println("RectangleGenerator");
        	return new drawableGenerators.RectangleGenerator(drawableElement);
        }
        else if (elementType.equals("arc")) {
        	Sys.println("ArcGenerator");
        	return new drawableGenerators.ArcGenerator(drawableElement);
        }
        else if (elementType.equals("point")) {
        	Sys.println("PointGenerator");
        	return new drawableGenerators.PointGenerator(drawableElement);
        }
        else if (elementType.equals("line")) {
        	Sys.println("LineGenerator");
        	return new drawableGenerators.LineGenerator(drawableElement);
        }
        Sys.println("no generator for this type..");
        return null;
    }
}
