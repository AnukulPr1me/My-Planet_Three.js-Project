import * as THREE from 'three';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls'




const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(3, 64,64);

const material = new THREE.MeshStandardMaterial({
    color: "#00ff83",
})

const mesh =  new THREE.Mesh(geometry, material);
scene.add(mesh)

//size
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}


//light
const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(10, 10, 10);
scene.add(light)

//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 100)
camera.position.z = 20;
scene.add(camera)

//render
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2);
renderer.render(scene, camera)

//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

//resize
window.addEventListener('resize', () =>{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    
    camera.aspect = sizes.width /sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}
loop()