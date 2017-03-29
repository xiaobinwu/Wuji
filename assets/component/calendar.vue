<template lang="jade">
	div#cal
		div#top
			div.select
				select#year-select
				&nbsp;年
				select#month-select
				&nbsp;月
			div.step
				i.fa.fa-angle-left#prev
				i.fa.fa-angle-right#next
		ul#wk
			li 一
			li 二
			li 三
			li 四
			li 五
			li 
				b 六
			li 
				b 日
		div#cm
		div#bm
			div.heavenly-branch
				span#heavenly
				年&nbsp;[<span id="branch"></span>]
			a(href="javascript:;;",id="now-date") 回到今天
</template>
<script>
	//需要配置webpack的externals，而且需要引入［https://github.com/xiaobinwu/calendar.js］
    import Vue from 'vue'
    import calendar from 'calendar'
    export default{
        name: 'calendar',     
        mounted(){
            const _this = this;
			calendar.init({
			    cellClickCallback: function(cell, datedata){
                    //emit click-callback事件
                    _this.$emit('click-callback', cell, datedata);  
			    }
			});
	    },
        components: {}
    }
</script>
<style lang="sass">
	@import "../public/scss/_variables.scss";
	$calendar-color: #429e6c;
	#cal{
        width: 562px;
        font-size: $size-h5;
        #top{
            height: 40px;
            line-height: 40px;
            clear: both;
            input{
            	padding: 0;
            } 
            .step{
                float: right;
                font-size: $size-h3;       
                i{
                	cursor: pointer;
                    font-size: 22px;
                }     	
                #prev{
                	margin-right: 10px;
                }
            }       	
            .select{
            	float: left;
                select{
                    height: 25px;
                    width: 100px;
                }
            }
        }
        #wk{
            margin: 0;
            padding: 0;
            height: 35px;
            color: #888;
            font-size: $size-h4;
            li{
                float: left;
                width: 80px;
                text-align: center;
                line-height: 25px;
                list-style: none;
                b{
	                font-weight: normal;
	                color: $calendar-color;              	
                }
            }
        }
        #cm{
            padding-bottom: 15px;
            border: 1px dashed #eee;
            clear: left;
            position: relative;
            .cell{
                position: absolute;
                width: 42px;
                height: 36px;
                text-align: center;
                margin: 0 0 0 19px;
                cursor: pointer;
                .so{
                	font: $size-h3 arial;
                }            	
            }
        }
        #bm{
            text-align: right;
            height: 30px;
            line-height: 30px;
            clear: both;
            padding: 5px 0;
            font-size: $size-base;  
            .heavenly-branch{
                color: $calendar-color;
                float: left;
            }
            #now-date{
                float: right;
                padding: 0px 10px;
                background-color: $calendar-color;
                color: $white;
                font-size: $size-base;
                height: 20px;
                line-height: 20px;
                margin-top: 6px;
                text-decoration: none;
                border-radius: 10px;
            }     	
        }
        #fd{
            display: none;
            position: absolute;
            border: 1px solid #dddddf;
            background: $white;
            color: #333;
            padding: 10px;
            line-height: 21px;
            width: 150px;
            border-radius: 10px;
            &:before{
                content: '';
                position: absolute;
                left: -8px;
                width: 0;
                height: 0;
                border-top: 8px solid transparent;
                border-right: 8px solid #dddddf;
                border-bottom: 8px solid transparent;            	
            }
            &:after{
                content: '';
                position: absolute;
                left: -6px;
                top: 10px;
                width: 0;
                height: 0;
                border-top: 8px solid transparent;
                border-right: 8px solid #fff;
                border-bottom: 8px solid transparent;           	
            }
            b{
                font-weight: normal;
                color: $calendar-color;            	
            }
        }
	}
</style>