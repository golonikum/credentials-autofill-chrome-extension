(function() {
	chrome.runtime.sendMessage({
		getCredentialsForHost: window.location.hostname
	}, function(responseObject) {
		var credential = responseObject && responseObject.message;
		if (credential) {
			var user = credential.user;
			var password = credential.password;
			$('body').on('focus', 'input', function (e) {
				let name = e.target.name.toLowerCase();
				if (name.indexOf('user') !== -1) {
					e.target.value = user;
				}
				if (name.indexOf('password') !== -1) {
					e.target.value = password;
				}
			});
		}
	});
})();