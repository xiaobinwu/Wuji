/*
* 工具类-懒加载
*/
var lazyLoadUtil = (function(){

	var defaults = {
		url: "data-url",
		container: "window",
		ticker: 250
	}
	function lazyload(element, options){
		this.element = element;
		this.options = $.extend({},defaults,options || {});
		this.options.childrenNode = [];
		this.init();
	}
	lazyload.prototype.init = function(){
		this.getDoms();
		this.initEvent();
	}
	lazyload.prototype.getDoms = function(){
		var $element,
			_self = this;
		if(typeof this.element === "object"){
			$element = this.element;
		}else{
			$element = $(this.element);
		}
		$element.each(function(index){
			var url, isImg, data;
			if($(this)[0].nodeName.toLowerCase() !== 'img'){
				url = $(this).find("img").attr(_self.options.url);
				isImg = false;
			}else{
				url = $(this).attr(_self.options.url);
				isImg = true; 
			}
			data = {
				obj: $(this), 
				url: url,
				isImg: isImg
			};
			_self.options.childrenNode.push(data);
		});
	}
	lazyload.prototype.setImg = function(obj, src, isImg){
		if(!isImg){
			obj.find("img").attr("src", src);
		}else{
			obj.attr("src", src);
		}	
	}
	lazyload.prototype.isload = function(obj, isImg){
		if(!isImg){
			var $img = obj.find("img");
			return $img.attr('src') === $img.attr(this.options.url);
		}else{
			return obj.attr('src') === obj.attr(this.options.url);
		}		
	}
	lazyload.prototype.loading = function(){
		//垂直方向图片延时
		var post,
			posb,
			_self = this,
			container = this.options.container,
			childrenNode = this.options.childrenNode,
			conHeight = $(container).outerHeight();
		if(container === "window"){
			var conTop = $(container).scrollTop();
		}else{
			var conTop = $(container).offset().top;
		}
		//绑定元素高宽最好固定，不然影响计算
		for (var i = 0, len = childrenNode.length; i < len; i++) {
			var obj = childrenNode[i].obj,
				url = childrenNode[i].url,
				isImg = childrenNode[i].isImg;
				if(obj){
					//计算是否在显示区域内
					post = obj.offset().top - (conHeight + conTop);
					posb = obj.offset().top + obj.height() - conTop;
                    if((post < 0 && posb > 0)){
                    	if(url != '' && !this.isload(obj, isImg)){
                    		this.setImg(obj,url,isImg);
                    	}
                    }					
				}
		}
	}
	lazyload.prototype.initEvent = function(){
		var _self = this,
			container = this.options.container;
		$(container).scroll(function(){
			_self.loading();
		});
		//延时，这样计算出的值准确
		setTimeout(function(){ 
			_self.loading();
		}, this.options.ticker);
	}
	//挂载在jquery扩展函数上
	$.fn.lazyload = function(options){
		var _self = $(this),
			params = $.extend({},defaults,options || {}),
			data = _self.data("lazyload");
		if(!data){
			_self.data("lazyload",(new lazyload(_self,params)));
		}else{
			_self.data("lazyload").options = params;
			_self.data("lazyload").options.childrenNode = [];
			_self.data("lazyload").init();
		}
	}

	return{
		init: function(element, options){
			return new lazyload(element, options);
		}
	}

})();

module.exports = lazyLoadUtil;