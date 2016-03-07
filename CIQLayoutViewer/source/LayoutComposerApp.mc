using Toybox.Application as App;
using Toybox.WatchUi as Ui;


var globalConstantsUtility = new ConstantsUtility();


class LayoutComposerApp extends App.AppBase {

    function initialize() {
        AppBase.initialize();
    }

    function getInitialView() {
    	var mainView = new LayoutComposerView(); 
        return [ mainView, new LayoutComposerDelegate(mainView.method(:startNewPollingSequence)) ];
    }
}
