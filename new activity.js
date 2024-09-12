
function validate_name(evt) {

    var theEvent = evt || window.event;


    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {

        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /^[a-zA-Z]+$/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}


var majors = ["IT system", "Mobile", "MultiMedia", "Computer Science", "Softwear Engineering"];


function validate_input() {
    var regex = /^[a-zA-Z]+$/;

        var x = document.forms["Form"]["fname"].value;
    var check1 = false;
    if (x == "" || !x.match(regex)) {
        var y = document.getElementById("fname_msg")
        y.innerHTML = "This filed is required"
        y.style.color = "red"
    } else {
        var y = document.getElementById("fname_msg")
        y.innerHTML = ""
        check1 = true;
    }

    var m = document.forms["Form"]["lname"].value;
    var check2 = false;
    if (m == "") {
        var r = document.getElementById("lname_msg")
        r.innerHTML = "This filed is required"
        r.style.color = "red"
    } else {
        var y = document.getElementById("lname_msg")
        y.innerHTML = ""
        check2 = true;
    }

    var e = document.forms["Form"]["Gender"].value;
    var check3 = false;
    if (e == "") {
        var w = document.getElementById("radio_msg")
        w.innerHTML = "select gender,Please"
        w.style.color = "red"

    } else {
        var y = document.getElementById("radio_msg")
        y.innerHTML = ""
        check3 = true;
    }

    
    var a = document.forms["Form"]["skill"].value;
    var html = document.getElementById("html_id");
    var Css = document.getElementById("css_id");
    var js = document.getElementById("js_id");
    var jQ = document.getElementById("jq_id");

    var check4 = false;
    if (html.checked || Css.checked || js.checked || jQ.checked) {
        var b = document.getElementById("skills_msg")
        b.innerHTML = ""
        check4 = true;
    } else {
        var w = document.getElementById("skills_msg")
        w.innerHTML = "please,select sckills"
        w.style.color = "red"
    }

    
    var s = document.forms["Form"]["Major"].value;
    var check5 = false;
    if (s == "") {
        var w = document.getElementById("major_msg")
        w.innerHTML = "please,select Major"
        w.style.color = "red"
    } else {
        var w = document.getElementById("major_msg")
        w.innerHTML = ""
        check5 = true;
    }
    if (check5) {
        var exist = false;
        for (let i = 0; i < majors.length; i++) {
            if (majors[i] == s) {
                exist = true;
                break;
            }
        }
        if (!exist) {
            var w = document.getElementById("major_msg")
            w.innerHTML = "please,select Major"
            w.style.color = "red"
            check5 = false;
        }
    }

    
    var f = document.forms["Form"]["hDate"].value;
    var check6 = false;
    if (f == "") {
        var w = document.getElementById("hdate_msg")
        w.innerHTML = "please,select Hire Date"
        w.style.color = "red"

    } else {
        var w = document.getElementById("hdate_msg")
        w.innerHTML = ""
        check6 = true;
    }

    
    var c = document.getElementById("descTA").value;
    var check7 = false;
    c = c.trim();
    if (c == "") {
        var n = document.getElementById("desc_msg")
        n.innerHTML = "This filed is required"
        n.style.color = "red"

       
    } else {
        var n = document.getElementById("desc_msg")
        n.innerHTML = ""
        check7 = true;
    }

    return check1 & check2 & check3 & check4 & check5 & check6 & check7;

}


var data = [];
var data_index = 0;


function add() {
    var check = validate_input();

    if (check != false) {

        var fname = document.forms["Form"]["fname"].value;
        var lname = document.forms["Form"]["lname"].value;

        var genderList = document.forms["Form"]["Gender"];
        var gender;
        for (let i = 0; i < genderList.length; i++) {
            if (genderList[i].checked) {
                gender = genderList[i].value;
            }
        }

        var skillList = document.forms["Form"]["skill"];
        var skills = [];
        var index = 0;
        for (let i = 0; i < skillList.length; i++) {
            if (skillList[i].checked) {
                skills[index] = skillList[i].value;
                index++;
            }
        }

        var major = document.forms["Form"]["Major"].value;
        var hdate = document.forms["Form"]["hDate"].value;
        var desc = document.getElementById("descTA").value;

        data[data_index] = [fname, lname, gender, skills, major, hdate, desc];
        data_index++;
        clear_input();
        show_table();
    }

}


function show_table() {
    $("#table_data").empty();
    for (let i = 0; i < data.length; i++) {
        var output = "<tr>" +
            "<td>" + data[i][0] + " " + data[i][1] + "</td>" +
            "<td>" + data[i][2] + "</td>" +
            "<td>" + data[i][4] + "</td>" +
            "<td>" + data[i][5] + "</td>" +
            "<td> <button onclick=\"show(" + i + ")\"> Show </button> </td>" +
            "<td> <button onclick=\"edit(" + i + ")\"> Edit </button> </td>" +
            "<td> <button onclick=\"destroy(" + i + ")\"> Delete </button> </td>" +
            "</tr>";
        $("#table_data").append(output);
    }
}


function clear_input() {
    $("#Form")[0].reset();
}


function show(index) {
    alert("name:\n" + data[index][0] + " " + data[index][1] + "\n\n" + "Description:\n" + data[index][6] + "\n\n" + "Skills:\n" + data[index][3]);
}


var updated_index;


function edit(index) {
    updated_index = index;
    $("#fname").val(data[index][0]);
    $("#lname").val(data[index][1]);

    if (data[index][2] == "Male") {
        $("#male").prop('checked', true);
    } else if ((data[index][2] == "Female")) {
        $("#female").prop('checked', true);
    }

    for (let i = 0; i < data[index][3].length; i++) {
        switch (data[index][3][i]) {
            case "HTML":
                $("#html_id").prop('checked', true);
                break;
            case "CSS":
                $("#css_id").prop('checked', true);
                break;
            case "JavaScript":
                $("#js_id").prop('checked', true);
                break;
            case "jQuery":
                $("#jq_id").prop('checked', true);
                break;
        }
    }

    $("#Major").val(data[index][4]);
    $("#hDate").val(data[index][5]);
    $("#descTA").val(data[index][6]);

    $("#Update_btn").attr("disabled", false);
    $("#Add_btn").attr("disabled", true);
}


function update() {
    var check = validate_input();

    if (check != false) {
        var fname = document.forms["Form"]["fname"].value;
        var lname = document.forms["Form"]["lname"].value;

        var genderList = document.forms["Form"]["Gender"];
        var gender;
        for (let i = 0; i < genderList.length; i++) {
            if (genderList[i].checked) {
                gender = genderList[i].value;
            }
        }

        var skillList = document.forms["Form"]["skill"];
        var skills = [];
        var index = 0;
        for (let i = 0; i < skillList.length; i++) {
            if (skillList[i].checked) {
                skills[index] = skillList[i].value;
                index++;
            }
        }

        var major = document.forms["Form"]["Major"].value;
        var hdate = document.forms["Form"]["hDate"].value;
        var desc = document.getElementById("descTA").value;

        data[updated_index] = [fname, lname, gender, skills, major, hdate, desc];
        clear_input();
        $("#Update_btn").attr("disabled", true);
        $("#Add_btn").attr("disabled", false);
        show_table();
    }
}


function destroy(index) {
    data.splice(index, 1);
    show_table();
}