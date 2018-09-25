module.exports = {
    testCredentials: (ac) => {
        // TEST API credentials
        ac.credentials_test().then(function(result) {
            // successful request
            if (result.success) {
                // VALID ACCOUNT
                console.log(result.result_message)
            } else {
                // INVALID ACCOUNT
                console.log(result.result_message)
            }
        }, function(result) {
            // request error
            console.log(result)
        });
    },
    contactExists: (ac, userEmail) => {
        ac.api("contact/view?email=" + userEmail, {})
            .then(result => {
                console.log(result)
            }, error => {
                console.log(error)
            })
    },
    contactSync: (ac, data) => {
        ac.api("contact/sync", data)
        .then(result => {
            console.log(result)
        }, (error) => {
            console.log(error)
        })
    },
    runSyncOnData: (ac, array, func) => {
        array.forEach(data => {
            func(ac, data)
        })
    }
}