/**
 * 轮播图插件
 * 多个轮播图共存参考：http://www.qdfuns.com/notes/16345/794010951bddb93b190ceebfbcaa9bd4.html
 */
;(function ($) {
    //'use strict';


    /**
     * 默认配置
     * event : 触发图片切换的事件
     * autoPlay : 是否自动播放
     * timeInterval : 自动播放的时间间隔
     * @type {{event: string, autoPlay: boolean, timeInterval: number}}
     */
    var defaultOption = {
        event: 'mouseover',
        autoPlay : true,
        timeInterval : 3000
    };

    var cfClass = {
        btnGroup : '.km-cf-btn-group',
        btnGroupStr : 'km-cf-btn-group',

        hover : '.hover',
        hoverStr : 'hover'
    };

    // 插件脚本变量
    var cfConfig = {
        // 父元素宽度
        parentWidth : 0,
        // 父元素高度
        parentHeight : 0,
        // 共显示多个个元素
        itemNumber : 0,
        // 当前显示第几个元素
        currentIndex : 0,
        // 图片区域
        imgContent : null,
        // 按钮区域
        btnContent : null,
        // 定时器的引用
        autoPlayInterval : 0
    };


    /**
     * 初始化
     * @param self
     */
    function init( self ){
        // 初始化配置数据
        cfConfig.parentWidth = self.parent().width();
        cfConfig.parentHeight = self.parent().height();
        cfConfig.imgContent = self.find('ul').eq(0);
        cfConfig.itemNumber = cfConfig.imgContent.children('li').length;

        // 设置图片容器宽度
        cfConfig.imgContent.css({
            width : cfConfig.itemNumber * cfConfig.parentWidth + 'px',
            height : cfConfig.parentHeight
        });

        // 设置每张图片的宽度
        cfConfig.imgContent.find('li').each(function () {
            $(this).find('img').css({
                width : cfConfig.parentWidth + 'px',
                height : cfConfig.parentHeight + 'px'
            });
        });

        // 添加按钮
        var btnContent = $('<ul>');
        btnContent.addClass(cfClass.btnGroupStr);
        for( var i = 1; i <= cfConfig.itemNumber; i++ ){
            var a = $('<a>').attr('href','#').text(i);
            var li = $('<li>').append(a);
            btnContent.append(li);
        }
        cfConfig.imgContent.parent().append(btnContent);

        // 设置第一个按钮处于激活状态
        cfConfig.btnContent = btnContent;
        cfConfig.btnContent.find('li').eq(0).addClass(cfClass.hoverStr);
    }

    /**
     * 指定显示第几个
     * @param i
     */
    function showIndex(i){
        if( cfConfig.currentIndex != i ){
            cfConfig.imgContent.css({
                left : -1 * cfConfig.parentWidth * i + 'px'
            });
            cfConfig.btnContent.find('li').eq(i).addClass(cfClass.hoverStr);
            cfConfig.btnContent.find('li').eq(i).siblings('li').removeClass();
            cfConfig.currentIndex = i;
        }
    }

    /**
     * 显示下一个
     */
    function showNext(){
        console.log(cfConfig.autoPlayInterval);
        if( (cfConfig.itemNumber - 1) === cfConfig.currentIndex){
            // 如果当前已经是最后一个，则显示第一个
            showIndex(0);
        }else{
            showIndex(cfConfig.currentIndex + 1);
        }
    }

    /**
     * 启用自动播放
     * @param option
     */
    function startAutoPlay(option){
        cfConfig.autoPlayInterval = setInterval(showNext,option.timeInterval);
    }

    /**
     * 停止自动播放
     */
    function stopAutoPlay(){
        clearInterval(cfConfig.autoPlayInterval);
    }

    $.fn.kmcf = function (options) {

        var option = $.extend({},defaultOption,options);

        return this.each(function () {
            var self = $(this);

            init(self);

            // 是否自动播放
            if( option.autoPlay ){
                startAutoPlay(option)
            }

            cfConfig.btnContent.find('li').each(function (i) {
                $(this).on(option.event, function () {
                    showIndex(i);
                });
                if( option.autoPlay ){
                    $(this).find('a').mouseover(function () {
                        // 鼠标 进入 按钮时，停止 自动播放
                        stopAutoPlay();
                    }).mouseleave(function () {
                        // 鼠标 离开 按钮时，启用 自动播放
                        startAutoPlay(option);
                    });
                }

            });
        });
    };
})(jQuery);

