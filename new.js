// game architecture  // creating controllers

// * 1 * user input controller
var uiController = (function () {
    var domClasses = {
        add_type: ".add__type",
        add__description: ".add__description",
        add__value: ".add__value",
        addBTN: ".add__btn"
    };
    // PUBLIC SERVICE OF ui-CONTROLLER 
    return {
        uiPublic: function () {
            return {
                type: document.querySelector(domClasses.add_type).value,
                description: document.querySelector(domClasses.add__description).value,
                value: document.querySelector(domClasses.add__value).value,
                // btn: document.querySelector(domClasses.addBTN)
            }
        },
        addButton: function () {
            return domClasses;
        }
    }

})();


// * 2 * finance controller
var finController = (function () {
    // need id, description, value from when user enter data
    function Income(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    function Expense(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    // need to save data from user to massive // array
    // var inc_Data = [];
    // var exp_Data = [];
    // var total_inc = 0;
    // var total_Exp = 0;
    var all_User_Data = {
        data: {
            inc: [],
            exp: []
        },
        total: {
            inc: 0,
            exp: 0
        }
    };
    // var i1 = new Income(1, "salary", 6000);
    // var e1 = new Expense(1, "rent", 600);

    // all_User_Data.data.inc_Data.push(i1)
    // all_User_Data.data.exp_Data.push(e1)
    console.log(all_User_Data);
    // PUBKIC SERVICE FUNCTION OF FINCANCE CONTROLLER
    return {
        addData: function (type, desc, val) {
            all_User_Data.data[type].push(id, desc, val)
        }
    }


})();

// * 3 * connection controller
var conController = (function (ui, fin) {

    // function that contains both mouse click && press key board on button
    var enterfunction = function () {
        // get input values from ui
        var d = ui.uiPublic();
        // console.log(x.description, x.value, x.type);
        // pass & save the value to finController
        var ff = fin.addData(d.type, d.description, d.value)
        console.log(ff);
        // value to DOM
        // calculate fincance
        // final result to DOM

    };

    // local/hiden function
    var letStartApp = function () {
        // click && enter keypress 's dom class 
        var DOM = ui.addButton();
        // when click the button
        document.querySelector(DOM.addBTN).addEventListener("click", function () {
            enterfunction();
        });

        // when press the enter keyboard
        document.addEventListener("keypress", function (event) {
            if (event.keyCode === 13) {
                enterfunction();
            }
        });

    };

    // PUBLIC SERVICE OF conCONNECTION CONTROLLER 
    return {
        conPublic: function () {
            console.log("App starting......");
            letStartApp()
        }
    }

})(uiController, finController);

conController.conPublic();
