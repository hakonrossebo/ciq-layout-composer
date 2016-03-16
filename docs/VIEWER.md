# CIQLayoutViewer

To run this App, you need to run the [Connect IQ SDK](http://developer.garmin.com/connect-iq/overview/)

Open and run the CIQLayoutViewer project to view layouts.

* The app is configured to poll for updates every 3 seconds (configurable)
* The app will poll 30 times (configurable)
* The app will download the Layout elements for the Layout that is set to **"active"**
* It will stopp polling when not receiving a HTTP 200 or HTTP 304 response
* Press select/enter button to restart polling.
