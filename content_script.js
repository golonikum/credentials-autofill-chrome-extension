(function() {
	chrome.runtime.sendMessage('getCredentials', function(responseObject) {
		var credentials = JSON.parse(responseObject.message);
		var hostname = window.location.hostname;
		var credential = credentials.filter(function(item){
			return item.host === hostname;
		})[0];
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
