$(document).ready(function(){
    for(var i = 0; i<50; i++){
        $(`<img id="img${i}" src='movieposter/${i+1}.jpg'>`).addClass('box').css({
            width: 100,
            height: Math.floor(Math.random()*100) +100,

        }).prependTo('.main_Contauner_p')
    }   
    
    $('.main_Contauner_p').masonry({
        columnWidth: 110
    });

    $('.box').click(function(){
        $("#movieinfo").fadeIn('slow');
        $("#backgroundGray").fadeIn('slow');
        $(`<img src="${$(this).attr('src')}"></img>`).addClass('infoposter').css({
            width: 100,
            height: 200,
            marginLeft: "35%"
        }).appendTo("#movieinfo");
    })
    $('#backgroundGray').click(function(){
    $('#backgroundGray').fadeOut('slow');
    setTimeout(function(){
        $('.infoposter').remove();
    },600)

    $('#movieinfo').fadeOut('slow');
})

})