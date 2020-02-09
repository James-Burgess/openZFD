
## Building the app

To build native apps you must install both Cordova and Xcode and/or Android SDK depending on which platforms you wish to build for. The [Cordova IoT Starter Kit](http://evothings.com/cordova-starter-kit/) helps you with the installation process.
For monitoring beacons the plugin [cordova-plugin-ibeacon](https://github.com/petermetz/cordova-plugin-ibeacon) is used.


* Open the file config.xml in your Cordova project folder. Edit the content tag to refer to the connect URL displayed at the bottom of the Evothings Workbench project window. This will make the app connect to the Workbench when launched.

* Here is an example (use actual IP-address displayed in the Workbench window):

    <content src="http://192.168.43.131:4042" />

* Build the app using the following command and run the app on your phone/tablet:

    cordova build ios