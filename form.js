var key = '';
var xhr = new XMLHttpRequest();
xhr.open("GET", "./key.txt", true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        key = xhr.responseText;
    }
};
xhr.send();

function validateContactForm() {
    var valid = true;
    $(".info").html("");
    $(".input-field").css('border', '#e0dfdf 1px solid');
    $("#field1").removeClass("error-field");
    $("#field2").removeClass("error-field");
    $("#field3").removeClass("error-field");
    $("#field4").removeClass("error-field");



    var field1 = $("#field1").val();
    var field2 = $("#field2").val();
    var field3 = $("#field3").val();
    var field4 = $("#field4").val();


    if (field1 == "") {
        $("#field1-label").html("Required.");
        $("#field1").css('border', '#e66262 1px solid');
        $("#field1").addClass("error-field");
        valid = false;
    }

    if (field2 == "") {
        $("#field2-label").html("Required.");
        $("#field2").css('border', '#e66262 1px solid');
        $("#field2").addClass("error-field");
        valid = false;
    }

    if (field3 == "") {
        $("#field3-label").html("Required.");
        $("#field3").css('border', '#e66262 1px solid');
        $("#field3").addClass("error-field");
        valid = false;
    }


    if(field1 != "" && field2 != "" && field3 != ""){
        valid=true
    }
    
    if(valid){
        var url = "https://api.openai.com/v1/completions";

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
    
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader(
            "Authorization",
            `Bearer ${key}`
        );
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                console.log(xhr.responseText);
                let response = xhr.responseText;
                response = JSON.parse(response);
    
                console.log(response);
    
                document.getElementById("output").innerHTML =
                    response["choices"][0]["text"];
            }
        };
    
        prompt=
            `This is the example text that I want you to use, Make sure you have all available fields with this page in this text. Doesnt matter where it is as long as it has text around it. with the fields imbedded in the form.JS file you will create. I will have the fields ${field1} in the text like this again ${field2} and then again ${field3}. So in the JS file, please put exactly this format with ${field4} included so I can easily edit. Thank you.
        `
    
        prompt = JSON.parse(JSON.stringify(prompt));
    
    
        var data = {
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.7,
            max_tokens: 2048,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        };
    
        data = JSON.stringify(data);
    
        xhr.send(data);
    }

    



    return valid;
}




function text() {
    // console.log("hello")


}