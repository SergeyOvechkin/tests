///передача сообщений от дочерних компонентов родительским 
	
	
var StateMap = {
	
	test_array: {		
		container: "test_container",
		props: ["test_group", ["click", "click", ""]],
		methods: {
			
			click: function(){
				
					if(!event.message){						
					   event.message = this.parent.name+" - "+this.parent.index;   
				   }
                   				   
				   console.log(event.message);
				
			}
		},		
	},
	virtualArrayComponents: {
		
		group_array_1:{
			container: "group_cont_1",
			props: [ "group2", ["click", "click", ""] ],
			methods: {
			   
			   click: function(){   
				   
				   if(!event.message){				   
					   event.message = this.parent.name+" - "+this.parent.groupId;
				   }
			   }
				
			}			
		},
       group_array_2: {
		   container: "group_cont_2",
		   	props: [ ["click", "click", ""],],
			methods: {
			   
			   click: function(){
				   				   
				   event.message = this.parent.name+" - "+this.parent.groupId;				   
				   				   
			   },
 		   
			}	   
	   }		
	},
}
window.onload = function(){
	
	var HM = new HTMLixState(StateMap);
	
	console.log(HM);

}