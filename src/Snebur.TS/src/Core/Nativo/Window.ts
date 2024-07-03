namespace Snebur
{
	if (!window.alertBase)
	{
		window.alertBase = window.alert;

        Object.defineProperty(window, "alert", {
            value: function (obj: Window)
            {
                return window.alertBase;
            },
            writable: false,
            configurable: false,
            enumerable: false
        });
	}
	
}
