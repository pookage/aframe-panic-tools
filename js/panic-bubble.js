function setAttributes(element, attributes){
	for(let key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}//setAttributes

AFRAME.registerComponent('panic-controls', {
	schema: {},
	init: function () {
		//for testing only
		this.openBubble 	= AFRAME.utils.bind(this.openBubble, this);
		this.closeBubble 	= AFRAME.utils.bind(this.closeBubble, this);
		window.openBubble 	= this.openBubble;
		window.closeBubble 	= this.closeBubble;

		this.bubble 		= generateBubble();
		this.el.appendChild(this.bubble);

		function generateBubble(){

			const bubble 			= document.createElement("a-sphere");
			const growAnimation 	= createGrowAnimation();
			const shrinkAnimation 	= createShrinkAnimation();
			setAttributes(bubble, {
				"radius" 	: 1.5,
				"color" 	: "#fe97e1",
				"scale" 	: "0 0 0",
				"opacity"	: 0.7,
				"roughness" : 1,
				"metalness" : 0.2
			});

			bubble.appendChild(growAnimation);
			bubble.appendChild(shrinkAnimation);
			return bubble;

			function createGrowAnimation(){
				const animation = document.createElement("a-animation");
				setAttributes(animation, {
					"begin" 		: "grow",
					"attribute"		: "scale",
					"from" 			: "0 0 0",
					"to" 			: "1 1 1",
					"dur" 			: 1500,
					"easing" 		: "ease-out-bounce"
				});
				return animation;
			}//createGrowAnimation
			function createShrinkAnimation(){
				const animation = document.createElement("a-animation");
				setAttributes(animation, {
					"begin" 		: "shrink",
					"attribute"		: "scale",
					"from" 			: "1 1 1",
					"to" 			: "0 0 0",
					"dur" 			: 1000,
					"easing" 		: "ease-in-out"
				});
				return animation;
			}//createShinkAnimatino
		}//generateBubble
	},
  	update: function () {},
  	tick: function () {},
  	remove: function () {},
  	pause: function () {},
  	play: function () {},

  	openBubble: function(){
		this.bubble.emit("grow");
  	},
  	closeBubble: function(){
		this.bubble.emit("shrink");
  	}
});