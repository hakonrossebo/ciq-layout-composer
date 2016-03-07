using Toybox.WatchUi as Ui;

class LayoutComposerDelegate extends Ui.BehaviorDelegate {
	hidden var refreshDelegateMethod;
    function initialize(delegateMethod) {
    	refreshDelegateMethod = delegateMethod;
        BehaviorDelegate.initialize();
    }

    function onMenu() {
        Ui.pushView(new Rez.Menus.MainMenu(), new LayoutComposerMenuDelegate(), Ui.SLIDE_UP);
        return true;
    }
    
    function onSelect() {
    	refreshDelegateMethod.invoke();
        return true;
    }
    

}