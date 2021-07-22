// game architecture  // creating controllers

// * 1 * user input controller
var uiController = (function () {
    var domClasses = {
        add_type: ".add__type",
        add__description: ".add__description",
        add__value: ".add__value",
        addBTN: ".add__btn",
        income_list: ".income__list",
        expense_list: ".expenses__list"
    };
    // PUBLIC SERVICE OF ui-CONTROLLER 
    return {
        uiPublic: function () {
            return {
                type: document.querySelector(domClasses.add_type).value,
                description: document.querySelector(domClasses.add__description).value,
                value: parseInt(document.querySelector(domClasses.add__value).value), // using parseInt() method for STRING TO NUMBER "100" - 100;
                // btn: document.querySelector(domClasses.addBTN)
            }
        },
        // public function for DOM
        addList_items: function (type, items) {
            var dom, list;
            if (type === "inc") {
                list = domClasses.income_list;
                dom = '<div class="item clearfix" id="income-$$ID$$"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            } else {
                list = domClasses.expense_list;
                dom = '<div class="item clearfix" id="expense-$$ID$$"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            dom = dom.replace("$$ID$$", items.id);
            dom = dom.replace("$$DESCRIPTION$$", items.description);
            dom = dom.replace("$$VALUE$$", items.value);

            document.querySelector(list).insertAdjacentHTML("beforeend", dom);
        },
        // clearing input // resset input 
        input_clear: function () {
            var clearfiled = document.querySelectorAll(domClasses.add__description + "," + domClasses.add__value);
            // convert it into array
            var newArray_input = Array.prototype.slice.call(clearfiled);
            // for(var i =0; i<newArray_input.length; i++){
            //     newArray_input[0] = "";
            // }
            // same as for loop
            newArray_input.forEach(function (el) {
                // to give empty to the arrays each element
                el.value = "";
            });
            // after enter the data users crusor focus on first input
            newArray_input[0].focus()

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
    // console.log(all_User_Data);
    // PUBKIC SERVICE FUNCTION OF FINCANCE CONTROLLER
    return {
        addData: function (type, desc, val) {
            var items, id;
            if (all_User_Data.data[type].length === 0) {
                id = 1;
            } else {
                // got lastest item from array and add new item after it then put their id's in id
                id = all_User_Data.data[type][all_User_Data.data[type].length - 1].id + 1;
            };

            if (type === "inc") {
                items = new Income(id, desc, val);
            } else {
                items = new Expense(id, desc, val);
            }
            all_User_Data.data[type].push(items);

            return items;
        },
        // seeing datafor temperory
        see: function () {
            return all_User_Data;
        },
        // calculating values
        calculation: function (type, re_items) {

        }
    }


})();

// * 3 * connection controller
var conController = (function (ui, fin) {

    // function that contains both mouse click && press key board on button
    var enterfunction = function () {
        // 1. get input values from uiController
        var d = ui.uiPublic();
        // console.log(d.description, d.value, d.type);
        if (d.description !== "" && d.value !== "") { // this is conditional statement is checking the inputs empty or not
            // 2. pass & save the value to finController
            var returned_Item = fin.addData(d.type, d.description, d.value);
            // console.log(returned_Item.id);
            // console.log(d.type);
            // console.log(returned_Item.value);
            // 3. user input // values to DOM
            ui.addList_items(d.type, returned_Item);
        }
        // clear the input field and focus the cursor in the first input
        ui.input_clear();
        // 4. Calculate fincance
        fin.calculation(d.type, returned_Item);
        // final result to DOM
        fin.see(); // seeing data temperory


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
