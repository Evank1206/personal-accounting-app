// 1. ui controller
var uiController = (function () {
    var obj = {
        inputType: ".add__type",
        inputDesc: ".add__description",
        inputValue: ".add__value",
        btn: ".add__btn"
    }

    return {
        inputData: function () {
            return {
                type: document.querySelector(obj.inputType).value,
                description: document.querySelector(obj.inputDesc).value,
                valuue: document.querySelector(obj.inputValue).value,
            }
        },
        domClass: function () {
            return obj;
        }
    }

})();
// 2. calculation controller
var calculationController = (function () {

})();

// 3. CONNECTION CONTROLLER
var connectionController = (function (ui, cal) {
    var clickEnter = function () {
        // 1. get data from ui input
        // console.log("get input data");
        var uData = ui.inputData();
        console.log(uData);

        // 2. show on dislpay income and expenss
   
        // 3. showed values to calculate
        // 4. display final calculation 
        console.log("clicked");
        console.log("pressed");
    }
    var setUpActive = function(){
        var xx = ui.domClass()
        // when mouse "CLICK"
        document.querySelector(xx.btn).addEventListener("click", function () {
            clickEnter();
        });
        // when "PRESS ENTER" button
        document.addEventListener("keypress", function (event) {
            if (event.key === "Enter" || event.which === 13) {
                clickEnter();
            }
        });
    }
    return {
        setUp: function(){
            console.log("App starting...");
            setUpActive()
        }
    }

})(uiController, calculationController);

connectionController.setUp();