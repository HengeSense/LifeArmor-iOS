/*
 *
 * LifeArmor
 *
 * Copyright © 2009-2012 United States Government as represented by
 * the Chief Information Officer of the National Center for Telehealth
 * and Technology. All Rights Reserved.
 *
 * Copyright © 2009-2012 Contributors. All Rights Reserved.
 *
 * THIS OPEN SOURCE AGREEMENT ("AGREEMENT") DEFINES THE RIGHTS OF USE,
 * REPRODUCTION, DISTRIBUTION, MODIFICATION AND REDISTRIBUTION OF CERTAIN
 * COMPUTER SOFTWARE ORIGINALLY RELEASED BY THE UNITED STATES GOVERNMENT
 * AS REPRESENTED BY THE GOVERNMENT AGENCY LISTED BELOW ("GOVERNMENT AGENCY").
 * THE UNITED STATES GOVERNMENT, AS REPRESENTED BY GOVERNMENT AGENCY, IS AN
 * INTENDED THIRD-PARTY BENEFICIARY OF ALL SUBSEQUENT DISTRIBUTIONS OR
 * REDISTRIBUTIONS OF THE SUBJECT SOFTWARE. ANYONE WHO USES, REPRODUCES,
 * DISTRIBUTES, MODIFIES OR REDISTRIBUTES THE SUBJECT SOFTWARE, AS DEFINED
 * HEREIN, OR ANY PART THEREOF, IS, BY THAT ACTION, ACCEPTING IN FULL THE
 * RESPONSIBILITIES AND OBLIGATIONS CONTAINED IN THIS AGREEMENT.
 *
 * Government Agency: The National Center for Telehealth and Technology
 * Government Agency Original Software Designation: LifeArmor001
 * Government Agency Original Software Title: LifeArmor
 * User Registration Requested. Please send email
 * with your contact information to: robert.kayl2@us.army.mil
 * Government Agency Point of Contact for Original Software: robert.kayl2@us.army.mil
 *
 */
/**
 * 
 * 
 * All actions here get sent to FlurryPlugin.execute and pass the action name.
 * 
 * @return Instance of FlurryPlugin
 */
var FlurryPlugin = function ()
{
};

/**
 * @param directory        The directory for which we want the listing
 * @param successCallback  The callback which will be called on successful completion
 * @param failureCallback  The callback which will be called on error
 */
FlurryPlugin.prototype.logEvent = function (event, successCallback, failureCallback) {
	return PhoneGap.exec(successCallback, failureCallback, 'FlurryPlugin', 'logEvent', [event]); 
};

/**
 * <ul>
 * <li>Register the Flurry Plugin</li>
 * <li>Also register native call which will be called when this plugin runs</li>
 * </ul>
 */
PhoneGap.addConstructor(function () {
	// Register the javascript plugin with PhoneGap
	PhoneGap.addPlugin('flurry', new FlurryPlugin());

	// Register the native class of plugin with PhoneGap
	PluginManager.addService("FlurryPlugin", "t2.phongap.plugin.flurry.FlurryPlugin");
});


logAnalytics = function (tag) {
	if (desktop) {
		console.log('FlurryPlugin.logAnalytics("' + tag + '");');
		return;
	}
	if (flurry == "on") {
		try {
			window.plugins.flurry.logEvent(
				tag, 
				function () {
					console.log("Callback reports analytics event recorded: " + tag);
				}, 
				function () {
					console.warn("Callback reports analytics event FAILED: " + tag); 
				}
			);
		}
		catch (err) {
			console.log("Error calling analytics");
		}
	}
};