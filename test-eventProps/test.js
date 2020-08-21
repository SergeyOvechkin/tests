

var StateMap = {
	
	form: {
		container: "form",
		props: ["input", "click"],
		methods: {
			
			click: function(){
				event.preventDefault();
				var text = this.parent.props.input.getProp();
				
				this.rootLink.eventProps["emiter-entry-user"].setEventProp(text); //вызвали событие "emiter-entry-user" из формы
				window.localStorage.setItem('user_name', text);
				console.log(text);							
			}			
		},		
	},	
	greeting: {
		
		container: "greeting",
		props: [ "user_name", ['listen_entry_user', "emiter-entry-user", "" ], ['listen_exit_user', "emiter-exit-user", ""] ], //добавили слушателя события "emiter-entry-user"
		methods: {
			
			listen_entry_user: function(){
				
				this.parent.props.user_name.setProp( this.emiter.getEventProp() );
			},
			listen_exit_user: function(){ 
			
				this.parent.props.user_name.setProp("");
			}			
		},		
	},
	logout: { 
		
		container: "logout",
		props: [ "user_name", ["exit", "click", "a:first-of-type"], ["listen_entry_user", "emiter-entry-user", "" ] ], //свойство слушатель события "emiter-entry-user"
		methods: {
			
			listen_entry_user: function(){
				
				this.parent.props.user_name.setProp( this.emiter.getEventProp() );
			},
			exit: function(){
				
				var user_name = this.parent.props.user_name;
				
				this.rootLink.eventProps["emiter-exit-user"].setEventProp(user_name.getProp()); //вызываем событие "emiter-exit-user" предав в него имя пользователя
				window.localStorage.removeItem('user_name');
				user_name.setProp("");
			}
			
		},	
	},
    //здесь слушатель события добавляется в свойство массива, т.к. если добавить его в контейнер оно будет вызвано для каждого контейнера 
	users_array: { //массив с пользователями 
		
		arrayProps: [ ['listen_entry_user', "emiter-entry-user", ""] ], //свойство слушатель события "emiter-entry-user"
		arrayMethods: {
			
			listen_entry_user: function(){
				
				this.parent.add( {user_name: this.emiter.getEventProp()} );
			},			
		},		
		container: "user",
		props: [ "user_name",  ['listen_exit_user', "emiter-exit-user", ""]  ],
		methods: {
		   listen_exit_user: function(){//слушаем событие "emiter-exit-user" в каждом контейнере массива
								
				if(this.parent.props.user_name.getProp() == this.emiter.prop){
						
					this.parent.remove();							
				}						
			}
		},        	
	},
	eventEmiters: {///эмитеры событий
		
		["emiter-entry-user"]: {prop: ""}, 
		["emiter-exit-user"]: {prop: ""}, 		
	}
}
window.onload = function(){
	
		
	var HM = new HTMLixState(StateMap);
	var name = window.localStorage.getItem('user_name');
	
	if(name != null)HM.eventProps["emiter-entry-user"].setEventProp(name); ///вызвали событие "emiter-entry-user" при загрузке сайта

	console.log(HM);
	
}
 
