//сокращения для свойств, массивов и контейнеров

//this.$$("emiter-name") - сокращенный доступ к пользовательским событиям
//this.$$("emiter-name").set("prop") - сокращенное название setEventProp
//this.$$("emiter-name").get("prop") - сокращенное название getEventProp

//this.$() - сокращенный доступ к корневому экземпляру приложения
//this.$(componentName) - сокращенный доступ к компоненту


//this.$props() , this.$methods() - сокращенный доступ к общим методам и свойствам приложения
//this.$methods(methodName) - сокращенный доступ к stateMethods методу 
//this.$props(nameProp) - сокращенный доступ к переменным stateProperties



//сокращения только для свойств

//this.props(propName) - сокращенный доступ к свойству в общем контейнере или массиве, для свойств массива
//this.methods(nameAuxMethod) - сокращенный доступ к вспомогательному методу в общем контейнере или массиве, для свойств массива



var StateMap = {
	
	form: {
		container: "form",
		props: ["input", "click"],
		methods: {
			
			click: function(){
				event.preventDefault();
				//var text = this.parent.props.input.getProp();
				  var text = this.props('input').getProp();
				
				  //this.rooLink.eventProps["emiter-entry-user"].setEventProp(text);
				
				  this.$$("emiter-entry-user").set(text);   //вызвали событие "emiter-entry-user" из формы с помощью сокращенного метода

                  console.log( this.$("greeting") ); // вывели в консоль компонент greeting
                  console.log( this.$props("testProp") ); // вывели в консоль переменную из stateProperties
                  console.log( this.$methods("testMethod")() );	//вызвали метод из stateMethods		
   
                  console.log( this.$methods() );	
                  console.log( this.$props() );				  
				
				window.localStorage.setItem('user_name', text);
				console.log(text);							
			}			
		},		
	},	
	greeting: {
		
		container: "greeting",
		props: [ "user_name", ['listen_entry_user', "emiter-entry-user", "" ], ['listen_exit_user', "emiter-exit-user", ""],
				["testAuxMethod", "aux"], 
				
				["click", "click", ""]
		],
		methods: {
			
			click: function(){
				
				console.log(  this.methods("testAuxMethod")()  );//доступ к вспомогательному методу в том-же контейнере сокращенным способом
				
			},			
			testAuxMethod: function(){
				
				return "testAuxMethod";
				
			},
			
			listen_entry_user: function(){
				
				this.props("user_name").setProp( this.emiter.get() ); //доступ к свойству сокращенным способом
			},
			listen_exit_user: function(){ 
			
				//this.parent.props.user_name.setProp("");
				  this.props("user_name").setProp("");
			}			
		},		
	},
	logout: { 
		
		container: "logout",
		props: [ "user_name", ["exit", "click", "a:first-of-type"], ["listen_entry_user", "emiter-entry-user", "" ] ], 
		methods: {
			
			listen_entry_user: function(){
				
				this.parent.props.user_name.setProp( this.emiter.getEventProp() );
			},
			exit: function(){
				
				var user_name = this.parent.props.user_name;
				
				//доступ к корневому экземляру приложения сокращенным способом	
				
				this.$().$$("emiter-exit-user").set(user_name.getProp()); 
				window.localStorage.removeItem('user_name');
				user_name.setProp("");
			}
			
		},	
	},
	users_array: {
		
		arrayProps: [ ['listen_entry_user', "emiter-entry-user", ""] ], 
		arrayMethods: {
			
			listen_entry_user: function(){
				
				this.parent.add( {user_name: this.emiter.getEventProp()} );
			},			
		},		
		container: "user",
		props: [ "user_name",  ['listen_exit_user', "emiter-exit-user", ""]  ],
		methods: {
		   listen_exit_user: function(){
								
				if(this.parent.props.user_name.getProp() == this.emiter.prop){
						
					this.parent.remove();							
				}						
			}
		},        	
	},
	eventEmiters: {
		
		["emiter-entry-user"]: {prop: ""}, 
		["emiter-exit-user"]: {prop: ""}, 		
	},
	stateProperties: {
		
		testProp: "testProp",
		testProp2: "testProp2",
		
	},
	stateMethods: {
		
		testMethod: function(){
			
			return "testMethod";
		},
		testMethod2: function(){
			
			return "testMethod2";
		}
	}
	
}
window.onload = function(){
	
		
	var HM = new HTMLixState(StateMap);
	var name = window.localStorage.getItem('user_name');
	
	if(name != null)HM.$$("emiter-entry-user").set(name); ///вызвали событие "emiter-entry-user" сокращенным способом

	console.log(HM);
	
}
 
