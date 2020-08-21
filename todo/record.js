var myStorage = window.localStorage;


var StateMap = {
	
	record_menu: {
		selector: "nav.record-menu-all-items",
		arrayProps: ["input", "input_style", "input_click", "add_click", "rm_click", "edit_click", ["listen_state_on_load", "emiter-state-on-load", ""] ],
		arrayMethods: {
			
			listen_state_on_load: function(){
				
				var isFirstLoad = true;
				
				if(this.emiter.prop == 1)isFirstLoad = false;
				
				var state = this.rootLink.stateProperties.task_list;
				
				if(isFirstLoad){
					
					state = this.rootLink.stateMethods.get_from_storage();
					if(!state) state = {};
					this.rootLink.stateProperties.task_list = state;
				}
				
					this.parent.removeAll(true);
					
					var currentTask = this.rootLink.stateProperties.currentTask;
					
					for(var key in state){

						if(currentTask == null){
							
							currentTask = key;
							
							this.parent.add({ title: key, class: "active"});
							
						}else{
							
							this.parent.add({ title: key});
						}
					}
					this.rootLink.stateProperties.currentTask = currentTask;
					this.rootLink.eventProps["emiter-togle-task-list"].emit();
				
			},			
			input_click: function(){
				
				event.preventDefault();

				
				var props = this.parent.props;
				var task_list = this.rootLink.stateProperties.task_list;
				var task_list_operation = this.rootLink.stateProperties.task_list_operation; 
				var currentTask = this.rootLink.stateProperties.currentTask;
				var inp_text = props.input.getProp();
				
				if(inp_text.trim() == ""){
					
					alert("забыли ввести название списка");
					props.input_style.setProp("display: none !important;");
					return;
				}
				if(task_list_operation == "save"){
				
					task_list[inp_text] = {};
				
					var container = this.parent.add({ title: inp_text });
					//console.log(container);
					if(currentTask == null){
					
						currentTask = inp_text;
					
						this.rootLink.eventProps["emiter-togle-task-list"].emit();
					}	
					
				}if(task_list_operation == "edit"){ 
				
					var oldTask = task_list[currentTask];
					
					task_list[inp_text] = oldTask;
					
					delete task_list[currentTask];
					this.rootLink.eventProps["emiter-rename-task-list"].setEventProp(inp_text);
					
					this.rootLink.stateProperties.task_list_operation = "save";
					this.rootLink.stateProperties.currentTask = inp_text;
					
				}
				props.input_style.setProp("display: none !important;");
				props.input.setProp("");
				
				this.rootLink.stateMethods.save_in_storage(task_list);
				
			},
			add_click: function(){
				
				   event.preventDefault();
							
					this.parent.props.input_style.setProp("display: '';");
			},
			rm_click: function(){
				
				event.preventDefault();
				
				var currentTask  = this.rootLink.stateProperties.currentTask;				
				var task_list =  this.rootLink.stateProperties.task_list;
				
				if(currentTask == null)return;
	
				delete task_list[currentTask];
				
				//currentTask = null;
				this.rootLink.stateMethods.save_in_storage(task_list);				
				this.rootLink.eventProps["emiter-state-on-load"].setEventProp(1);
				
				
				
			},
			edit_click: function(){
				
				event.preventDefault();
				
				var currentTask = this.rootLink.stateProperties.currentTask;
				var task_list = this.rootLink.stateProperties.task_list;
				if(currentTask == null)return;
				if(task_list[currentTask] == undefined)return;
				console.log(currentTask);
				this.rootLink.stateProperties.task_list_operation = "edit";
				this.parent.props.input_style.setProp("display: '';");
				
				
			}
			
		},
		container: "menu_item",
		props: ["title", "click", "class", ["listen_togle_task", "emiter-togle-task-list", ""], ["listen_rename_task", "emiter-rename-task-list", ""]],
		methods: {
			listen_rename_task: function(){
				var newTitle = this.emiter.prop;
				var currentTitle = this.rootLink.stateProperties.currentTask;
				
				if(this.parent.props.title.getProp() == currentTitle)this.parent.props.title.setProp(newTitle);
				
			},			
			listen_togle_task: function(){
				
		
				
				var task = this.rootLink.stateProperties.currentTask;
				this.parent.props.class.removeProp("active");
				
				if(task == this.parent.props.title.getProp())this.parent.props.class.setProp("active");
				
			},
			click: function(){
				
				var currentTask = this.parent.props.title.getProp();
				this.rootLink.stateProperties.currentTask = currentTask;
				
				
	
				this.rootLink.eventProps["emiter-togle-task-list"].emit();
			}
			
		}
	},
	task_form: {
		
		container: "task_form",
		props: ["input", "remove", "save", "display"],
		methods: {
			
			remove: function(){
				
				event.preventDefault();
				
				this.parent.props.display.setProp("display: none !important;");
				
			},
			
			
			
			save: function(){
				
				event.preventDefault();
				
				var record = this.parent.props.input.getProp();
				if(record.trim() == ""){
					
					alert("забыли ввести название");
					return;
					
				}
				if(this.rootLink.stateProperties.task_list[this.rootLink.stateProperties.currentTask] == undefined)return;
				this.rootLink.stateProperties.task_list[this.rootLink.stateProperties.currentTask][record] = {
					
					status: "unfulfilled",
				};
				this.rootLink.stateMethods.save_in_storage(this.rootLink.stateProperties.task_list);
				
				this.rootLink.eventProps["emiter-togle-task-list"].emit();
				//this.rootLink.state["task_records"].add({ title: record})
				
				this.parent.props.display.setProp("display: none !important;");
				
			},
			
		},
		
	},
	task_records: {
		arrayProps: [ ["listen_togle_task", "emiter-togle-task-list", ""] ],
		arrayMethods: {
			
			listen_togle_task: function(){
				
				var recods = {};
				
				if(this.rootLink.stateProperties.currentTask != null) recods = this.rootLink.stateProperties.task_list[this.rootLink.stateProperties.currentTask];
				
				var show_btn = this.rootLink.stateProperties.show_btn;
				
				this.parent.removeAll(true);
	
				for(var key in recods){
					var rec = { title: key};
					if(recods[key].status == "completed"){
						
						rec.check = true;
						
					}else{
						
						rec.check = false;
					}
					
					if(show_btn == "all"){
						
						this.parent.add(rec);
						
					}else if(show_btn == "completed" && recods[key].status == "completed"){
						
						this.parent.add(rec);
						
					}else if(show_btn == "unfulfilled" && recods[key].status == "unfulfilled"){
						
						this.parent.add(rec);
					}					
				}
			}			
		},
		container: "record",
		props: ["title", "check_click",  "remove", "check"],
		methods: {
			
			check_click: function(){
				
				var title = this.parent.props.title.getProp();
				var task_list = this.rootLink.stateProperties.task_list;
				var currentTask = this.rootLink.stateProperties.currentTask;
				console.log(currentTask);
			
				
				if(task_list[currentTask][title].status == "unfulfilled"){
					
					task_list[currentTask][title].status = "completed";
					
					
				}else{
					
					task_list[currentTask][title].status = "unfulfilled";
								
										
				}
				this.rootLink.stateMethods.save_in_storage(task_list);

			},
			remove: function(){
				event.preventDefault();
				
				
				var title = this.parent.props.title.getProp();
				var task_list = this.rootLink.stateProperties.task_list;
				var currentTask = this.rootLink.stateProperties.currentTask;
				
				delete task_list[currentTask][title];
				this.parent.remove(true);
				
				this.rootLink.stateMethods.save_in_storage(this.rootLink.stateProperties.task_list);

			}

		}		
	},
	toolbar: {
		
		container: "toolbar",
		props: ["btn_add", "btn_show_all", "btn_show_completed", "btn_show_unfulfilled", "btn_all_class", "btn_completed_class", "btn_unfulfilled_class"],
		methods: {
			
			btn_add: function(){
				
				if(this.rootLink.stateProperties.currentTask == null){
					
					alert("сначала создайте список задачь");
					return;
				}
			
				this.rootLink.state["task_form"].props.display.setProp("dispaly: ''");
				this.rootLink.state["task_form"].props.input.setProp("");
				
			},
			btn_show_all: function(){
					
				this.rootLink.stateMethods.togle_visible_records(this, "all", "btn_all_class" );

			},
			btn_show_completed: function(){
				
				this.rootLink.stateMethods.togle_visible_records(this, "completed", "btn_completed_class" );	

			},			
			btn_show_unfulfilled: function(){
					
					this.rootLink.stateMethods.togle_visible_records(this, "unfulfilled", "btn_unfulfilled_class" );
				
			},			
		},
		
		
	},
	stateProperties: {
				
		task_list: {},
		currentTask: null,
		show_btn: "all",
		task_list_operation: "save",
		
	},
	stateMethods: {
		
		togle_visible_records: function(context, show_btn, name_btn){
			
				context.rootLink.stateProperties.show_btn = show_btn;
				context.rootLink.eventProps["emiter-togle-task-list"].emit();
				
				var props = context.parent.props;
					props.btn_all_class.removeProp("active");
					props.btn_completed_class.removeProp("active");
					props.btn_unfulfilled_class.removeProp("active");
					
					props[name_btn].setProp("active");
		},
		save_in_storage: function(state){
			
			var string = JSON.stringify(state);
				
				 myStorage.setItem('state', string);
				 
				 var state = localStorage.getItem('state');
				 
				 var newObj = JSON.parse(state);
				 
				 console.log(newObj);
			
		},
		get_from_storage: function(){
			
				var state = localStorage.getItem('state');
				 
				 var newObj = JSON.parse(state);
				 
				 return newObj;
			
		}
		
	},
	eventEmiters: {
		
		["emiter-togle-task-list"]: { prop: "", },
		["emiter-state-on-load"]: {prop: ""},
		["emiter-rename-task-list"]: {prop: ""},
		
	}
	
}


window.onload = function(){
	
	var HM = new HTMLixState(StateMap);
	
	 HM.eventProps["emiter-state-on-load"].emit();
	
	console.log(HM);
	
		
}