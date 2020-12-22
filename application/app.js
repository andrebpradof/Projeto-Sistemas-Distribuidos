const Store = require('./store.js');
const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: 'user-preferences',
  defaults: {
    token:''
  }
});
var token_user = store.get('token');
var name_hospital = '';
$(window).on('load', function(){ 
  $('#forms-zip-code').on('submit',function(e){
      
    e.preventDefault();
    var cep = $('#cep').val();

    if(cep !== ''){
        name_hospital = '';
        $("#table-hospital tbody").empty();
        $.ajax({
            type: "GET",
            url: "http://localhost:3333/hospital/"+cep,
            headers: { "Authorization": 'Bearer ' + token_user },
            //beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer '+token_user); },
            beforeSend: function(){
              $("#table-hospital tbody").after('<tr class="line-search"><td colspan="3"><b>Searching...</b></td></tr>');
            },
            success: function(retorno){
              $(".line-search").remove();
              if(retorno.error === ''){
                
                for (var prop in retorno.hospital) {
                  $("#table-hospital tbody").append('<tr class="line-h" id="hospital-'+prop+'" nameHospital="'+retorno.hospital[prop].nome+'"><td>'+retorno.hospital[prop].nome+'</td><td>'+retorno.hospital[prop].local+'</td><td><button class="btn btn-danger btn-select-h btn-block" idHospital="'+prop+'" >Select</button></td></tr>');
                }
                
              }
              else{
                alert('Erro: '+retorno.error);
              }
            },
            error: function(err){
              console.log(err);
              alert('Error in consultation!');
            }   
        });
    }
    else{
        alert('Enter zip code!');
    }
  });
  $(document).on('click', '.btn-select-h', function() {
    var id_l = $(this).attr('idHospital');

    $(".line-h").removeClass('ativo-line');
    $("#hospital-"+id_l).addClass('ativo-line');
    name_hospital = $("#hospital-"+id_l).attr('nameHospital');
    console.log(name_hospital);
  });


  $('#forms-add-query').on('submit',function(e){
    e.preventDefault();
    var doctor = $('#doctor').val();
    var date = $('#date').val();

    if(name_hospital !== ''){
      var data = {doctor: doctor, hospital: name_hospital, data: date};
      $.ajax({
          contentType: 'application/json',
          type: "POST",
          url: "http://localhost:3333/query",
          headers: { "Authorization": 'Bearer ' + token_user },
          data: JSON.stringify(data),
          beforeSend: function(){

          },
          success: function(retorno){
            console.log(retorno);
            if(retorno.query !== undefined){
              $('#doctor').val('');
              $('#date').val('');
              name_hospital = '';
              $("#table-hospital tbody").empty();
              $("#table-hospital tbody").after('<tr class="line-search"><td colspan="3">Search hospitals by zip code</td></tr>');
              alert("Medical appointment successfully scheduled!");
            }
            else{
              alert("Try again!");
            }
          },
          error: function(err){
            console.log(err);
            alert('Error inserting query!');
          }   
      });
    }
    else{
      alert('Choose a hospital!');
    }
  });

  $(document).on('click', '#schedules', function() {
    $("#table-query tbody").empty();
    $.ajax({
        type: "GET",
        url: "http://localhost:3333/query",
        headers: { "Authorization": 'Bearer ' + token_user },
        //beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer '+token_user); },
        beforeSend: function(){
          $("#table-query tbody").after('<tr class="line-search"><td colspan="3"><b>Searching...</b></td></tr>');
        },
        success: function(retorno){
          $(".line-search").remove();
          if(retorno.error === undefined){
            
            for (var prop in retorno.query) {
              var data_s = retorno.query[prop].data.split("T");
              var dia_s = data_s[0].split("-");
              var retorno_data = dia_s[2]+'/'+dia_s[1]+'/'+dia_s[0]+' '+data_s[1];

              $("#table-query tbody").append('<tr class=""><td>'+retorno.query[prop].doctor+'</td><td>'+retorno.query[prop].hospital+'</td><td>'+retorno_data+'</td></tr>');
            }
            
          }
          else{
            alert('Erro: '+retorno.error);
          }
        },
        error: function(err){
          console.log(err);
          alert('Error in consultation!');
        }   
    });
    $('#exampleModal').modal('toggle');
  });

  $(document).on('click', '.close', function() {
    $('#exampleModal').modal('hide');
  });
});