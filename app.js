// game architecture  // creating controllers

// * 1 * user input controller
var uiController = (function () {
    var domClasses = {
        add_type: ".add__type",
        add__description: ".add__description",
        add__value: ".add__value",
        addBTN: ".add__btn",
        income_list: ".income__list",
        expense_list: ".expenses__list",
        delete_btn: ".item__delete--btn",
        budget__value: ".budget__value",
        budget__income__value : ".budget__income--value",
        budget__expenses__value : ".budget__expenses--value",
        budget__expenses__percentage : ".budget__expenses--percentage",
        budget__expenses__percentage : ".budget__expenses--percentage",
        item__percentage : ".item__percentage",
    };
    // SMALL PERCENTAGE 
    var smallPercent_nodeList_foreach = function(list, callbackFun){
        for (let i = 0; i < list.length; i++) {
                callbackFun(list[i], i);
        }
    };
    // TO SORT NUMBER BY DIGITS " ' "
    var sort_digit = function(num, type){
                // Number to String
                var strnNum = "" + num;
                // example: "123" ---> "321" 
                var x = strnNum.split("").reverse().join("");
                // to keep sorted number to in string
                var saverStrn = "";
                // increment counter
                var count = 1;
                // to loop through the string of number AND to split by 3 digit & to give "'"
                for(let i = 0; i < x.length; i++){
                    saverStrn = saverStrn + x[i];
                    if(count % 3 === 0)
                        saverStrn = saverStrn + "'";
                        count ++;
                };
                // console.log(saverStrn);
                // to reverse the grounded string of number
                var y = saverStrn.split("").reverse().join("");
                // console.log(y)
                // to erase the "'"! if access in front of number
                if(y[0] === "'") y = y.substring(1, y.length);
                // console.log(y)
                // to apply + OR - sign front of numbers defense on inc or exp
                if(type === "inc") y = "+" + y;
                else y = "-" + y;
                // To return final grounded digits
                return y;
    
    };
    // PUBLIC SERVICE OF ui-CONTROLLER 
    return {
        // show the date function
        display_date : function(){
            var date = new Date();
            // console.log(date.getFullYear());
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            switch (month) {
                case 1: month = "Jan"
                    break;
                case 2: month = "Feb"
                    break;
                case 3: month = "March"
                    break;
                case 4: month = "April"
                    break;
                case 5: month = "May"
                    break;
                case 6: month = "June"
                    break;
                case 7: month = "July"
                    break;
                case 8: month = "Aug"
                    break;
                case 9: month = "Sep"
                    break;
                case 10: month = "Oct"
                    break;
                case 11: month = "Nov"
                    break;
                case 12: month = "Dec"
                default:
                    break;
            }
            // var week = date.getTime();
            document.querySelector(".budget__title--month").textContent = month + " / " + year;
        },
        uiPublic: function () {
            return {
                type: document.querySelector(domClasses.add_type).value,
                description: document.querySelector(domClasses.add__description).value,
                value: parseInt(document.querySelector(domClasses.add__value).value) // using parseInt() method for STRING TO NUMBER "100" - 100;

            }
        },
        // public function for DOM
        addList_items: function (type, items) {
            var dom, list;
            if (type === "inc") {
                list = domClasses.income_list;
                dom = '<div class="item clearfix" id="inc-$$ID$$"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="fa fa-close""></i></button></div></div></div>'

            } else {
                list = domClasses.expense_list;
                                    
                dom = '<div class="item clearfix" id="exp-$$ID$$"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><div class="item__percentage">21%</div><button class="item__delete--btn"><i class="fa fa-close""></i></button></div></div></div>'
            }

            dom = dom.replace("$$ID$$", items.id);
            dom = dom.replace("$$DESCRIPTION$$", items.description);
            dom = dom.replace("$$VALUE$$", sort_digit(items.value, type));

            document.querySelector(list).insertAdjacentHTML("beforeend", dom);
        },
        // change color of button
        change_btnColor: function(){
            document.querySelector(domClasses.addBTN).classList.toggle("red")
        },
        // clearing input // resset input 
        input_clear: function () {
            var clearfiled = document.querySelectorAll(domClasses.add__description + "," + domClasses.add__value);
            // convert list of items to array
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
        // SMALL PERCENTAGE
        display_small_percentage: function(per){
            var dotNote = document.querySelectorAll(domClasses.item__percentage);
            smallPercent_nodeList_foreach(dotNote, function(el, index){
                el.textContent = per[index] + "%";
            });
        },
        // displaying function
        display_data: function (est) {
            // console.log(est.all_inc);
            // to check condition of inc OR exp
            var type;
            if(est.all_inc > 0) type = "inc";
            else type = "exp";
            // color
            // if(type === "inc") 
            // document.querySelector(domClasses.add__description).style.backgroundColor = "blue";
            // to display data
            document.querySelector(domClasses.budget__value).textContent = sort_digit(est.all_net, type);
            document.querySelector(domClasses.budget__income__value).textContent = sort_digit(est.all_inc, "inc");
            document.querySelector(domClasses.budget__expenses__value).textContent = sort_digit(est.all_exp, "exp");
            // conditional check: if there is not any % amount "%" sign shouldn't appear 
            if (est.all_percentage !== 0) {
                document.querySelector(domClasses.budget__expenses__percentage).textContent = est.all_percentage + "%"
            } else {
                document.querySelector(domClasses.budget__expenses__percentage).textContent = est.all_percentage;
            }

        },
        // deleting item from DOM SAMPLE
        raseIt : function(element){
            // receiving by element id name inc-id or exp-id and then select it by getElementById
            var xxx = document.getElementById(element);
            // xxx is html div than below
            // console.log(xxx);
            // console.log(xxx.parentNode);
            // find the div contains xxx div by parentNode and then using removeChild to 
            xxx.parentNode.removeChild(xxx);

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
        this.percent = -1;
    }
    // SMALL PERCENTAGE PART IN INDIVITUAL EXPENSE ITEMS
    Expense.prototype.calculate_indivitual_percent = function(total_Income){
        if(total_Income > 0){
            this.percent = Math.round((this.value / total_Income)*100);
        }else{
            this.percent = 0;
        }
    };
    // RETURN INDIVITUAL EXPENSE PERCENTAGE
    Expense.prototype.get_indivitual_percent = function(){
        return this.percent;
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
        },
        net: 0,
        percentage: 0
    };
    // var i1 = new Income(1, "salary", 6000);
    // var e1 = new Expense(1, "rent", 600);

    // all_User_Data.data.inc_Data.push(i1)
    // all_User_Data.data.exp_Data.push(e1)

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

        // calculating values
        calculation: function (type) {
            var sum = 0;
            // adding the values to sum
            all_User_Data.data[type].forEach(function (el) {
                sum = sum + el.value;
            })
            // putting the sum to total
            all_User_Data.total[type] = sum;
            // calculating pure income or available balance
            all_User_Data.net = all_User_Data.total.inc - all_User_Data.total.exp;

            // this conditional statment is for rid of "NaN" from display
            if(all_User_Data.total.exp !== 0){
            // percentage estimation
            all_User_Data.percentage = Math.round((all_User_Data.total.exp / all_User_Data.total.inc) * 100)
            }
            else{
                // console.log("Do you see this");
                all_User_Data.percentage = 0;
            };

        },

        // SMALL PERCENTAGE CALCULATION
        definde_Indivitual_percent: function(){
            all_User_Data.data.exp.forEach(function(el){
                el.calculate_indivitual_percent(all_User_Data.total.inc)
            })
        },
        // SMALL PERCENTAGE CALCULATION
        return_indivitual_percent: function(){
            var allpercents = all_User_Data.data.exp.map(function(el){
                return el.get_indivitual_percent();
            })
            return allpercents;
        },

        // returning all calculated data to dom
        return_calculation: function () {
            return {
                all_inc: all_User_Data.total.inc,
                all_exp: all_User_Data.total.exp,
                all_net: all_User_Data.net,
                all_percentage: all_User_Data.percentage
            }
        },
        // delete item with using there uniue ID, from the array 
        delete_items: function (type, id) {
            // to get every items unique ID from array, using map()
            var items_id = all_User_Data.data[type].map(function (el) {
                return el.id;
            });
            // to get the unique ID's index/location, using indexOf()
            var index = items_id.indexOf(id);
            // check the condition if the deleting won't return -1, (array дотор байхүй элементийг устгахыг завдах үед array -ний хамгийн арын элементийг устгадаг, ингэж устагуулах үгүй нь тулд, нөгцөл шалгана)
            if (index !== -1){
                all_User_Data.data[type].splice(index, 1)
            }

            return index;

        },
        // showing data for temperory
        showData : function(){
            return all_User_Data;
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
            // console.log(returned_Item);
            // console.log(returned_Item.id);
            // console.log(returned_Item.description);
            // console.log(d.type);
            // console.log(returned_Item.value);
            // 3. user input // values to DOM
            ui.addList_items(d.type, returned_Item);
            // clear the input field and focus the cursor in the first input 
            ui.input_clear();
            // To recaluclate after delete item from the list
            re_calculate();
            // showing data for temperory
            fin.showData()

        }
      
        // // // 4. Calculate fincance (income, expense, available balance & percentage)
        // fin.calculation(d.type);
        // // // 5. Those estimated data to preparing to DOM
        // var estimation = fin.return_calculation();
        // // // console.log(estimation);
        // // // 6. DOM function
        // ui.display_data(estimation);
        // 7. Using the return_Item for finding corret id item
        // var xxx = fin.delete_items(d.type, returned_Item.id);
        // console.log(xxx);
        // ui.raseIt();
      
    };

    // To recaluclate after delete item from the list
    var re_calculate = function (){
        var inputVal = ui.uiPublic();
        // 4. Calculate fincance (income, expense, available balance & percentage)
        fin.calculation(inputVal.type);
        // if(inputVal.type === "inc") console.log("yes");                                                     //  w o r k i n g   on
        // 5. Those estimated data to preparing to DOM
        var estimation = fin.return_calculation();
        // console.log(estimation.all_percentage);
        // 6. DOM function
        ui.display_data(estimation);
        //  sort by digit
        // var a = ui.sort_digit(inputVal.type,estimation);
        // console.log(a);


        // SMALL PERCENTAGE CALCULATION
        fin.definde_Indivitual_percent();
        // SMALL PERCENTAGE CALCULATION
        var xxx = fin.return_indivitual_percent();
        // console.log(xxx);
        // SMALL PERCENTAGE display function to c
        ui.display_small_percentage(xxx)
   }
    
    // local/hiden function
    var letStartApp = function () {
        // click && enter keypress 's dom class 
        var DOM = ui.addButton();
        // when click the button
        document.querySelector(DOM.addBTN).addEventListener("click", function () {
            enterfunction();
        });
        // change btn color
        document.querySelector(DOM.add_type).addEventListener("change", ui.change_btnColor);
        // when press the enter keyboard
        document.addEventListener("keypress", function (event) {
            if (event.keyCode === 13) {
                enterfunction();
            }
        });
        // deleting items eventListener 
        document.querySelector(".container").addEventListener("click", function(event){
            // to find exact click which was button, for that first to find container with "id"
            var htmlID = event.target.parentNode.parentNode.parentNode.parentNode.id;
            // console.log(htmlID);
                if(htmlID){
                var toSaprate = htmlID.split("-");
                var type = toSaprate[0];
                var id_Num = parseInt(toSaprate[1]);
                // console.log(type + " " + id_Num);
                fin.delete_items(type, id_Num);
                console.log(htmlID);
                ui.raseIt(htmlID);

            // To recaluclate after delete item from the list
                re_calculate();
                };
        });

    };

    // PUBLIC SERVICE OF conCONNECTION CONTROLLER 
    return {
        conPublic: function () {
            // to show date function
            ui.display_date();

            console.log("App starting......");
            letStartApp();
        }
    }

})(uiController, finController);

conController.conPublic();
