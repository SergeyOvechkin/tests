///вспомогательные методы можно добавлять ко всем типам контейнеров и обычным массивам, виртуальным массивам их добавлять нельзя 
///вспомогательные методы - с типом aux указываются только с помощью массива ["имя_метода", "aux"] 
//в созданном контейнере он появится в объекте methods контейнера или массива, для методов массива
//this в нем указывает на контейнер либо массив, вспомогательный метод может принимать параметры и возвращать значения 
//вспомогательные методы можно наследовать также как и обычные свойства

var StateMap = {
	
	form: {
		container: "form",
		props: ["input", "click", ["test_and_send_name", "aux"] ], ///добавили свойство-вспомогательный метод с типом aux
		methods: {
			
			click: function(){
				event.preventDefault();
				var text = this.parent.props.input.getProp();
				
				this.parent.methods.test_and_send_name(text); // вспомогательные (aux) методы находятся в объекте methods контейнера
				
				console.log(text);
							
			},
			test_and_send_name: function(name){ // метод может принимать параметры
				
				///this в методе указывает на контейнер
				
				if(name.length < 2){
					alert("имя должно быть больше двух символов");
					return;
				}
				
				this.rootLink.eventProps["emiter-set-name"].setEventProp(name); // вызвали событие "emiter-set-name" из метода
				window.localStorage.setItem('user_name', name);
								
			}		
		},		
	},
	users_array: {  
		selector: "div.row",
		arrayProps: [ "message", 
		              ["send_message", "aux"], //добавили вспомогательный метод
  		              ['listen_set_name', "emiter-set-name", ""],
 					  ['listen_exit_user', "emiter-exit-user", ""]  				  
					  ], 
		arrayMethods: {
			
            send_message: function(type, mess){ //вспомогательный метод принимает два параметра
				
				if(type == "login"){
					
					this.props.message.setProp("новый посетитель - "+mess); //this в методе массива указывает на массив
					
				}else if(type == "logout"){
					
					this.props.message.setProp(mess+" - покинул сайт");
					
				}				
			},					
			listen_set_name: function(){
				
				this.parent.add( {user_name: this.emiter.getEventProp()} );
				
				this.parent.methods.send_message("login", this.emiter.getEventProp()); //вызвали вспомогательный метод	
				
			},
			listen_exit_user: function(){
				
				this.parent.data.forEach(container=>{
					
					if(container.props.user_name.getProp() == this.emiter.getEventProp()){
						
						container.remove(true); 
					}					
				});
                 this.parent.methods.send_message("logout", this.emiter.getEventProp()); //вызвали вспомогательный метод				
			},			
		},		
		container: "user",
		props: [ "user_name", ],
		methods: {
		},        	
	},	
	greeting: {
		
		container: "greeting",
		props: [ "user_name", ['listen_set_name', "emiter-set-name", "" ], ['listen_exit_user', "emiter-exit-user", ""] ], 
		methods: {
			
			listen_set_name: function(){
				
				this.parent.props.user_name.setProp( this.emiter.getEventProp() );
			},
			listen_exit_user: function(){ 
			
				this.parent.props.user_name.setProp("");
			}			
		},		
	},
	logout: { 
		
		container: "logout",
		props: [ "user_name", ["exit", "click", "a:first-of-type"], ['listen_set_name', "emiter-set-name", "" ] ], 
		methods: {
			
			listen_set_name: function(){
				
				this.parent.props.user_name.setProp( this.emiter.getEventProp() );
			},
			exit: function(){
				
				var user_name = this.parent.props.user_name;
				
				this.rootLink.eventProps["emiter-exit-user"].setEventProp(user_name.getProp()); 
				
				window.localStorage.removeItem('user_name');
				user_name.setProp("");
			}			
		},	
	},
	eventEmiters: {
		
		["emiter-set-name"]: {prop: ""}, 
		["emiter-exit-user"]: {prop: ""}, 
		
	}
}
window.onload = function(){

	var HM = new HTMLixState(StateMap);
	var name = window.localStorage.getItem('user_name');
	
	if(name != null)HM.eventProps["emiter-set-name"].setEventProp(name); 

	console.log(HM);
	
}
 
