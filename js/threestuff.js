
var scene, camera, renderer, composer,renderScene;
var geometry, material, mesh;
var c_x,c_z;

init();
animate();

function init() {

	scene = new THREE.Scene();
	
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 3000;
	camera.position.y = 800;
	//camera.position.x = 5000;
	camera.rotation.x = -20 * Math.PI / 180;
	c_x = camera.position.x;
	c_z = camera.position.z;
	var light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 50, 50, 50 );
scene.add( light );

	geometry = new THREE.BoxGeometry( 100, 100, 100 );
	var redmaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
	var bluematerial = new THREE.MeshBasicMaterial( { color: 0x00bfff, wireframe: true } );


	//cube = new THREE.Mesh( geometry, material );
	//scene.add( cube );


	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight);
	
	composer = new THREE.EffectComposer( renderer );

    renderScene = new THREE.RenderPass( scene, camera );
    
    renderScene.clear = true;
    renderScene.renderToScreen = true;
    
    composer.addPass( renderScene );
	
	let dots = new THREE.ShaderPass( THREE.RGBShiftShader );
    dots.renderToScreen = true
    
    //this.shaders.push( dots )
    composer.addPass( dots )

	document.body.appendChild( renderer.domElement );
}



function animate() {

	requestAnimationFrame( animate );

    var timer = Date.now() * 0.0001;

    camera.position.x = Math.cos( timer ) * 1500;
    camera.position.z = Math.sin( timer ) * 1500;
    camera.lookAt( scene.position );

	renderer.render( scene, camera );

}