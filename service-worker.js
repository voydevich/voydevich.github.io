self.addEventListener('push', function(event) {
    var SOME_API_ENDPOINT = "https://somewhre.com/push_notification_api/service_worker_endpoint";

    event.waitUntil(
        fetch(SOME_API_ENDPOINT, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'subscription_id=' + subscriptionId
        }).then(function(response) {

            return response.json().then(function(data) {
                var title = data.notification.title;
                var message = data.notification.message;
                var icon = base + "assets/images/logo_notification.png";
                var notificationTag = data.notification.url;
                // var notificationTag = 'https://google.com'; //data.notification.tag;
                return self.registration.showNotification(title, {
                    body: message,
                    icon: icon,
                    tag: notificationTag
                });
            });
        })
    );
});