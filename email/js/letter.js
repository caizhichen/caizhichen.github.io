
var oEmail = document.querySelector('.main_content .email');

var html = list.map((item)=>{

	return `<li>
			    <input data-index = ${item.id} type="checkbox">
			    <div class="wrap-drag">
					<div>
						<span>${item.caption}</span>
						<span class="span2">${item.time}</span>
					</div>
				<p>${item.desc}</p>
				</div>
			</li>`
}).join('');

oEmail.innerHTML = html;

var allChecked = document.querySelector('.footer input');
var symbolChecked = document.querySelectorAll('.email input');

allChecked.onclick = function (){ // 全选

	symbolChecked.forEach((val)=>{

		val.checked = allChecked.checked;

		val.parentNode.style.background = val.checked?'#f2f6f9':'';

	});

};

symbolChecked.forEach((val)=>{ // 单选

     val.onclick = function (){

     	var isAllChecked = [...symbolChecked].every(val=>val.checked);

        isAllChecked?allChecked.checked = true:allChecked.checked = false;

        this.parentNode.style.background = this.checked?'#f2f6f9':'';

     };

});

//点击删除数据和结构

var deleteBtn = document.querySelector('#delet');

deleteBtn.onclick = function (){

	var isChecked = [...symbolChecked].filter(val=>val.checked);

	fnDelete();

};

var tip = document.querySelector('#hint3');
var wrapDrag = document.querySelectorAll('.wrap-drag');
var alreadyDelete = document.querySelector('.ulsmall .delete');

wrapDrag.forEach(function (item){

	item.onmousedown = function (ev){

		var ev = ev || event;

		if(!item.previousElementSibling.checked){
			  return;
		}

		var num = [...symbolChecked].filter(item=>item.checked).length;

		tip.innerHTML = `选中${num}封邮件`;
		
		tip.style.display = 'block';
		tip.style.left = ev.clientX - tip.offsetWidth/2 + 'px';
		tip.style.top = ev.clientY - tip.offsetHeight/2 + 'px';

		document.onmousemove = function (ev){

			var ev = ev || event;

			tip.style.left = ev.clientX - tip.offsetWidth/2 + 'px';
		    tip.style.top = ev.clientY - tip.offsetHeight/2 + 'px';

		   if( collision(tip,alreadyDelete) ){

		      tip.style.display = 'none';

		   	  fnDelete();

		   };

		    ev.preventDefault();

		};

		document.onmouseup = function (){

            tip.style.display = 'none';
		};

	};


});

function fnDelete(){

	var isChecked = [...symbolChecked].filter(item=>item.checked);

	isChecked.forEach((item)=>{

            item.parentNode.remove();

            list.splice(0,item.dataset.index);

		});

};





