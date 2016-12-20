//选取对象模型
function _(className){
	return document.getElementsByClassName(className)[0];
}
var uls = _('uls'); //获取播放列表
var lis = uls.children;//获取播放列表中的歌曲
var h1 = _('h1');//获取歌曲名称
var speed = _('speed');//上一首
var play = _('play');//播放
var rewind = _('rewind');//下一首
var makes = _('makes');//获取总进度条
var progress = _('progress');//获取进度条
var clock //定义定时器
var a = _('a');//开始时间
var b = _('b');//总时间
var arrs = [];//定义存放歌曲数组
var number = 0;//定义当前第几首歌曲
var video;//定义当前选中的音乐
var clock;//定义定时器
var duration;//定义歌曲总时长
var currentTime;//定义当前播放时长;
var star;//定义时时获取函数
var biu = _('biu');//播放方式;
//DOM加载完后函数执行
$(function(){

	// 准备工作
	//把歌曲通过循环放在同一个数组中
	$('.content .cright .uls li').each(function(){
		var val = $(this).attr('title');//获取点击的歌曲名
		var mUrl = 'video/'+val+'.mp3';//获取点击歌曲的路径
		arrs[$(this).index()] = new Audio(mUrl);//声明歌曲播放
	});
	//----一切操作的开始!
	//点击歌曲列表 改变样式 
	$('.content .cright .uls li').click(function(){
		for(var i=0;i<lis.length;i++){
			lis[i].style.color = 'black';//默认样式
			this.style.color = '#FAAC62';//当前选中的歌曲
			var text = this.innerHTML;//当前选中的歌曲名
			h1.innerHTML = text;//把歌曲名给h1
		}
		//点击播放	
		for(var i=0;i<arrs.length;i++){
			arrs[i].pause();//默认不播放
			play.src = './img/9.png';
		}	
		number = $(this).index();//获取当前播放歌曲的下标		
		video = arrs[number];//把歌曲赋给video
		video.currentTime = 0;
		video.play();//播放
		duration = video.duration;//获取歌曲总时长

		//定时器:时时获取歌曲播放的当前时间和播放进度
		function star(){
			var minute1 = Math.floor(duration/60);//秒转分钟
			var second1 = Math.floor(duration%60);//获取剩余秒数
			b.innerHTML = '0'+minute1+':'+second1;//把值给b

			currentTime = video.currentTime;//获取歌曲当前时长
			var minute2 = Math.floor(currentTime/60);//秒转分钟
			var second2 = Math.floor(currentTime%60);//获取剩余秒数

			//判断前面是否加'0';
			if(second2<10){
				a.innerHTML = '0'+minute2+':'+'0'+second2;
			}else{
				a.innerHTML = '0'+minute2+':'+second2;
			}

			//设置进度条
			var count = parseInt(currentTime/duration*10000);//获取比例	
			var pro = count/100 +'%';	
			progress.style.width = pro;//当前的进度
			if(duration == currentTime){
				clearInterval(clock);//播放完毕,清除定时器
				//播放下一首
				if(number<5){
					number ++;
					arrs[number].play();
					video = arrs[number];
					setInterval(star,1000);
					change(lis,number);
				}else{
					number = 0;
					arrs[number].play();
					video = arrs[number];
					setInterval(star,1000);
					change(lis,number);ii
				}
			}
		}
		clock = setInterval(star,1000);//执行定时器
		play.src = './img/7.png';//改成暂停图片


		//任意点击进度条
		makes.addEventListener('click',makes_click,false);
		function makes_click(event){
			var ml = event.clientX;//鼠标距离浏览器左边的距离
			var pl = makes.offsetLeft;//progress对象距离浏览器左边的距离
			var leftNum = ml - pl + 1;//鼠标距离左边元素的距离
			var pWidth = parseInt(getStyle(makes,'width'));//获取进度条总长度
			var pes = (leftNum/pWidth)*100+'%';//获取百分比
			video.currentTime = video.duration *(leftNum/pWidth);//当前的时长
			// console.log(video.currentTime);
			currentTime = video.currentTime;//时时获取当前播放时长
			progress.style.width = pes ;//进度条的位置
		}
	});
	//下一首播放
		rewind.addEventListener('click',rewind_click,false);
		function rewind_click(){
			if(number<5){
				number ++ ;
				for(var i=0;i<arrs.length;i++){
					arrs[i].pause();
				}
				arrs[number].currentTime = 0;//重置播放时间
				arrs[number].play();
				duration = arrs[number].duration;
				video = arrs[number];		
				setInterval(star,1000);
				console.log(duration,number);
				change(lis,number);//改变样式
					
			}else{
				number = 0;
				for(var i=0;i<arrs.length;i++){
					arrs[i].pause();
				}	
				arrs[number].currentTime = 0;
				arrs[number].play();
				setInterval(star,1000);
				console.log(duration,number);
				change(lis,number);//改变样式
			}
		}
		//上一首播放
		speed.addEventListener('click',speed_click,false);
		function speed_click(){
			if(number>0){
				number -- ;
				for(var i=0;i<arrs.length;i++){
					arrs[i].pause();
				}
				arrs[number].currentTime = 0;//重置播放时间
				arrs[number].play();
				var duration = arrs[number].duration;//获取歌曲总时长
				duration = arrs[number].duration;
				video = arrs[number];		
				setInterval(star,1000);
				console.log(duration,number);
				change(lis,number);//改变样式
					
			}else{
				number = 0;
				for(var i=0;i<arrs.length;i++){
					arrs[i].pause();
				}	
				arrs[number].currentTime = 0;
				arrs[number].play();
				var duration = arrs[number].duration;//获取歌曲总时长
				clock = setInterval(star,1000);
				console.log(duration,number);
				change(lis,number);//改变样式
			}
		}
		//播放和暂停
		play.addEventListener('click', play_click, false);
		function play_click(){
			if(video.paused){
				video.play();
				this.src = './img/7.png'
			}else{
				video.pause();
				play.src = './img/9.png';
			}
			
		}
	//播放方式
	biu.addEventListener('click',biu_click,false);
	function biu_click(){
		if(biu.src = './img/order.png'){
			biu.src = './img/random.png';
		}else{
			biu.src = './img/random.png';
			alert('111');
		}
	}




});


// 获取内存中计算后的样式
function getStyle(obj, attr){
	var cs = obj.currentStyle || window.getComputedStyle(obj, null);
	return cs[attr];
}

//封装一个改变样式函数
function change(obj,num){
	for(var i=0;i<obj.length;i++){
		obj[i].style.color = 'black';//默认样式
	}
	obj[num].style.color = '#FAAC62';//当前选中的歌曲
	var text = obj[num].innerHTML;//当前选中的歌曲名
	h1.innerHTML = text;//把歌曲名给h1
}