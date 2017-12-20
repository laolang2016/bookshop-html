$(function () {
    console.log('网上书店');

    $('#send-to').mouseover(function () {
        $(this).find('#send-list').show();
        $(this).find('span').addClass('hover');
    });

    $('#send-to').find('span').mouseleave(function () {
        $(this).removeClass('hover');
        $('#send-list').hide();
    });
    $('#send-list').mouseleave(function () {
        $(this).hide();
        $('#send-to').find('span').removeClass('hover');
    });

    $('#send-list').find('a').click(function () {
        $('#send-to').find('span').find('i').text($(this).text());
    });
});