$(function(){
    $(".loader").hide();
    $("#submit").click(function(){
        const name = $("#name").val();
        const write = $("#write").val();
        const element = document.querySelector(".post");
        const URL = 'http://localhost:5000/nugget';
        const URL_B = 'http://localhost:5000/posts';

        const entry ={
            name,
            write
        }
        console.log(entry)
        
        $(".loader").show();
        $("form").hide();
        $("#submit").hide();


        $.ajax({
            type: "POST",
            url: "/chatbot",
            data: {
                question: $("#write").val()
            },
            success: function(result) {
              $("#resp").append("<br>Me: "+$("#question").val());
              $("#response").append("<br>Me: "+$("#question").val()+"<br> Karabo: "+result.response);
              $("#question").val("")
              console.log(result.response)
            },
            error: function(result) {
                alert('error');
            }
        });


        $.ajax({
            url: URL,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            //success: function (data) {
              //  alert(data);
            //},
            data: JSON.stringify(entry)
        })//.then(res => res.json())
          .then(createdentry =>{
              console.log(createdentry);
              $(".loader").hide();
              $('form').trigger("reset");
              $("form").show();
              $("#submit").show();


        });

        listposts()

        function listposts(){

            $.ajax({
                url:URL_B,
                type:'GET'
            }).then(posts=>{
                console.log(posts);
                $.each(posts, function() {
                    $.each(this, function(h,k) {
                        const div = document.createElement('div');

                        const header = document.createElement('p');

                        const contents = document.createElement('h3');

                        if (h=="name"){
                            header.textContent = k;
                        }

                        else if (h =="write"){
                            contents.textContent = k;
                        }

                        div.appendChild(header);
                        div.appendChild(contents);

                        element.appendChild(div);
                    });
                  });
            });
        }

        /*fetch(URL, {
            method : 'POST',
            body : JSON.stringify(entry),
            headers :{
                contentType: 'application/json'
            }
        })
        .then(response => response.json())
        .then(createdentry => {
            console.log(createdentry);
        });*/
        
    })
})

