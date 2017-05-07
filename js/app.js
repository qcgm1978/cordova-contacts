// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {
    const saveData = () => {
        cordova.plugins.SecureKeyStore.set(function (res) {
            console.log(res); // res - string securely stored 
        }, function (error) {
            alert(error)
            console.log(error);
        }, "key", 'string to encrypt');
    }
    /* ---------------------------------- Local Variables ---------------------------------- */
    var slider = new PageSlider($('body'));
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    EmployeeListView.prototype.template =
        Handlebars.compile($("#employee-list-tpl").html());
    EmployeeView.prototype.template = Handlebars.compile($("#employee-tpl").html());
    var service = new EmployeeService();
    service.initialize().done(function () {
        router.addRoute('', function () {
            slider.slidePage(new HomeView(service).render().$el);
            $('#save-data').click(saveData)
        });
        router.addRoute('employees/:id', function (id) {
            service.findById(parseInt(id)).done(function (employee) {
                slider.slidePage(new EmployeeView(employee).render().$el);
            });
        });
        router.start();
    });
    /* --------------------------------- Event Registration -------------------------------- */
    // StatusBar.overlaysWebView(false);
    // StatusBar.backgroundColorByHexString('#ffffff');
    // StatusBar.styleDefault();
    document.addEventListener('deviceready', function () {
        callCamera();

        window.sqlitePlugin.echoTest(function () {
            console.log('ECHO test OK');
        });
        window.sqlitePlugin.selfTest(function () {
            console.log('SELF test OK');
        });
        let SQLStringTest = function () {
            var db = window.sqlitePlugin.openDatabase({name: 'test.db', location: 'default'});
            db.transaction(function (tr) {
                tr.executeSql("SELECT upper('Test string') AS upperString", [], function (tr, rs) {
                    console.log('Got upperString result: ' + rs.rows.item(0).upperString);
                });
            });
        };
        SQLStringTest();
        FastClick.attach(document.body);
        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "Workshop", // title
                    'OK'        // buttonName
                );
            };
        }
    }, false);
    /* ---------------------------------- Local Functions ---------------------------------- */
}());
