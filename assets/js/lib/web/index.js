$(function () {
    console.log('网上书店');

    // header 送至
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

    // 搜索框选择搜索类别
    $('#search-type-select').mousemove(function () {
        $('#search-type-list').show();
    });
    $('#search-type-list').find('li').click(function () {
        $('#search-type').val($(this).find('a').attr('title'));
        $(this).parent().hide();
    });
});