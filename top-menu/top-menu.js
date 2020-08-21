var State = {
	
	menu: {
		container: "menu_item_level_1",
		//свойства массива ul data-menu="array" 
		arrayProps: [ "toggler"],
		arrayMethods: {
			toggler: function(){
				
				event.stopPropagation();
				
				//тоглер работает только для мобильной версии сайта
				if(this.rootLink.eventProps['emiter-resize'].prop > this.rootLink.stateProperties.mobailWidth){
					
					return;
					
				}else{
					  ///если кликнули по пустому пространству, (не по меню)
					 if( document.querySelector("html") == event.target|| document.body == event.target.parentElement || event.target.parentElement.querySelector('[data-menu_item_level_2]') == null && event.target.parentElement.querySelector('[data-menu_item_level_3]') == null && !event.target.parentElement.classList.contains("menu-toggler") ){

						//убираем стили display: block тем самым делаем контейнеры "menu_item_level_1" невидимыми
						if(this.prop !=null){
							this.rootLink.eventProps['emiter-toggler-btn'].setEventProp("");
							this.prop = null;				
						}
				    ///если кликнули по тоглеру меню
					}else if( event.target.parentElement.classList.contains("menu-toggler") ){	
					
						console.log( event.target.parentElement.classList.contains("menu-toggler") );
						
						///делаем контейнеры видимыми, если они невидимы
						if(this.prop==null){
					
							
							this.rootLink.eventProps['emiter-toggler-btn'].setEventProp("display: block");
							this.prop = 1;
							
						///делаем контейнеры невидимыми, если они видимы
						}else{							
							this.rootLink.eventProps['emiter-toggler-btn'].setEventProp("");
							this.prop = null;
							
						}	
					}
				}			
			}			
		},
		///Свойства контейнера
		///селекторы ищут элемент в нутри контейнера menu_item_level_1 this.htmlLink.querySelector(selector) важно правильно указать селектор
		props: [  ["submenuclass", "class", "ul:first-of-type"], ["group", "group", "ul:first-of-type"],
		          ["toggle", 'click', ""], ["over", 'mouseover', ""], ["out",'mouseout', ""], 
				  ["listner_resize",'emiter-resize', ""], ["listner_click",'emiter-click-menu_item_level_1', ""],
				  ["listner_toggler",'emiter-toggler-btn', ""], ["style",'style', ""]],
		methods:{ 
					over: function(){
						
						this.rootLink.stateMethods.over(this);
						
					},
					out: function(){
						
						this.rootLink.stateMethods.out(this);
					},
					toggle: function(event){
												
						   if(event.target.parentElement.dataset['menu_item_level_1'] == undefined)return;
						   
						   this.rootLink.stateMethods.toggle(this, 'emiter-click-menu_item_level_1');																		
					},
					listner_resize: function(){
						
							this.rootLink.stateMethods.listner_resize(this);
					},
					listner_click: function(){
						
						this.rootLink.stateMethods.listner_click(this);		
					},
					listner_toggler: function(){
						
						this.parent.props.style.setProp(this.emiter.prop);
						
					}
		}		
	},
	virtualArrayComponents: {
		
		menu_level_2:{
			container: "menu_item_level_2",
			props: [ ["group_2","group", "ul:first-of-type"], ["submenuclass", "class", "ul:first-of-type"], ["toggle", 'click', ""],  
			        ["over", 'mouseover', ""], ["out",'mouseout', ""], 
					["listner_resize",'emiter-resize', ""], ["listner_click",'emiter-click-menu_item_level_2', ""]],
			methods: {
					over: function(){
						
						this.rootLink.stateMethods.over(this);
						
					},
					out: function(){
						
						this.rootLink.stateMethods.out(this);
					},
					toggle: function(){
						
						  this.rootLink.stateMethods.toggle(this, 'emiter-click-menu_item_level_2');
																		
					},
					listner_resize: function(){
						
						this.rootLink.stateMethods.listner_resize(this);
				
					},
					listner_click: function(){
						
						this.rootLink.stateMethods.listner_click(this);
		
					}										
			}		
	    },
		menu_level_3:{
			container: "menu_item_level_3",
			props: [ ],
			methods: {

			}
		
	    },			
	},	
	eventEmiters: {
		['emiter-resize']: {//добавили пользовательское событие ресайза экрана,
			
			prop: null,
		},
		['emiter-click-menu_item_level_1']: {
			
			prop: 'index', //здесь будет меняться index контейнера по которому кликнули, при клике по первому уровню (нужно для мобильной версии)
		},
		['emiter-click-menu_item_level_2']: {
			
			prop: 'index', //здесь будет меняться index контейнера при клике по второму уровню (нужно для мобильной версии)
		},
		['emiter-toggler-btn']: {///событие для отображения или скрытия всех контейнеров(для мобильной версии) при клике на пустом пространстве
			
			prop: "none"
		}

	},
	stateProperties: {
		
		mobailWidth: 600,
		
	},
	stateMethods: {
		
		over: function(context){/// при наведении курсора убирает класс .hover-non со свойства submenuclass делая свойство видимым
			
			context.parent.props.submenuclass.removeProp("hover-non");			
		},
		out: function(context){/// добавляет класс .hover-non к свойству submenuclass делая свойство невидимым
			
			context.parent.props.submenuclass.setProp("hover-non");			
		},
		toggle: function(context, emiterName){///тоже что и верхние два только при клике, для мобильной версии
               
			 context.rootLink.eventProps[emiterName].setEventProp(context.parent.index); 
			 
			 if(context.prop == null){
								
								context.parent.props.submenuclass.removeProp("hover-non");
								context.prop  = 1;
								
							}else{
								
								context.parent.props.submenuclass.setProp("hover-non");
								context.prop  = null;
							}							
																									
		},
		listner_resize: function(context){///включает или выключает события наведения и клика в зависимости от ширины экрана (переключает мобильную и широкую версию меню)
			
								var windowSize = context.emiter.getEventProp();						
								var props = context.parent.props;
								
								
								
								if(windowSize < context.rootLink.stateProperties.mobailWidth){ 

									props.over.disableEvent("mouseover");				
									props.out.disableEvent("mouseout");
					
									props.toggle.enableEvent("click");
					
						}else{

									props.over.enableEvent("mouseover");
									props.out.enableEvent("mouseout");
					
									props.toggle.disableEvent("click");
						}						
		},
		listner_click: function(context){ ///функция для мобильной версии добавляет класс hover-non тем самым сворачивает пункты если кликнули по другому
						
				var index = context.emiter.getEventProp();
				
				if(context.parent.index != index){
							
					context.parent.props.submenuclass.setProp("hover-non");
						
					context.parent.props.toggle.prop  = null;
				}			
		}		
		
	}
}
window.onload = function(){
///создаем экземпляр  HTMLix
var HM = new HTMLixState(State);
HM.eventProps['emiter-resize'].setEventProp(window.innerWidth);//вызываем пользовательское событие при загрузке страници, чтобы определить ширину экрана и включить нужные обработчики событий и отключить ненужные

//вызываем пользовательское ['emiter-resize'] событие при ресайзе, чтобы отключить и включить нужные обработчики событий в зависимости от ширины экрана
window.onresize = function(){ HM.eventProps['emiter-resize'].setEventProp(window.innerWidth) };

if(window.innerWidth < 600)HM.eventProps['emiter-resize'].setEventProp(window.innerWidth) 

//добавляем обработчик события кликов к документу страници, чтобы убирать из видимости меню мобильной версии при клике на пустом пространстве экрана 
document.addEventListener("click", HM.state["menu"].props.toggler.events.click);

console.log(HM);
}