<template>
  <v-container grid-list-xs app fill-height>
    <div id="container"></div>
  </v-container>
</template>
<script>
import * as THREE from "three";
import SimplexNoise from "simplex-noise";

export default {
  data() {
    return {
      dataArray: null
    };
  },
  created() {
    this.ball = null;
    this.renderer = null;
    this.scene = null;
    this.camera = null;
  },
  methods: {
    init() {
      this.scene = new THREE.Scene();
      var group = new THREE.Group();
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.set(0, 0, 90);
      this.camera.lookAt(this.scene.position);
      this.scene.add(this.camera);

      this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      var planeGeometry = new THREE.PlaneGeometry(800, 800, 20, 20);
      var planeMaterial = new THREE.MeshLambertMaterial({
        color: 0x6904ce,
        side: THREE.DoubleSide,
        wireframe: true
      });

      // var plane = new THREE.Mesh(planeGeometry, planeMaterial);
      // plane.rotation.x = -0.5 * Math.PI;
      // plane.position.set(0, 30, 0);
      // group.add(plane);

      // var plane2 = new THREE.Mesh(planeGeometry, planeMaterial);
      // plane2.rotation.x = -0.5 * Math.PI;
      // plane2.position.set(0, -30, 0);
      // group.add(plane2);

      var icosahedronGeometry = new THREE.IcosahedronGeometry(10, 4);
      var lambertMaterial = new THREE.MeshLambertMaterial({
        color: 0xff00ee,
        wireframe: true
      });

      this.ball = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
      this.ball.position.set(0, 0, 0);
      group.add(this.ball);

      var ambientLight = new THREE.AmbientLight(0xaaaaaa);
      this.scene.add(ambientLight);

      var spotLight = new THREE.SpotLight(0xffffff);
      spotLight.intensity = 0.9;
      spotLight.position.set(-10, 40, 20);
      spotLight.lookAt(this.ball);
      spotLight.castShadow = true;
      this.scene.add(spotLight);

      // var orbitControls = new THREE.OrbitControls(camera);
      // orbitControls.autoRotate = true;

      this.scene.add(group);

      document
        .getElementById("container")
        .appendChild(this.renderer.domElement);

      this.renderer.render(this.scene, this.camera);
    },
    animate: function() {
      // requestAnimationFrame(this.animate)
      // this.ball.rotation.x += 0.01
      // this.ball.rotation.y += 0.01
      // this.renderer.render(this.scene, this.camera)

      // var lowerHalfArray = this.dataArray.slice(
      //   0,
      //   this.dataArray.length / 2 - 1
      // );
      // var upperHalfArray = this.dataArray.slice(
      //   this.dataArray.length / 2 - 1,
      //   this.dataArray.length - 1
      // );
      // var overallAvg = this.avg(this.dataArray);
      // var lowerMax = this.max(lowerHalfArray);
      // var lowerAvg = this.avg(lowerHalfArray);
      // var upperMax = this.max(upperHalfArray);
      // var upperAvg = this.avg(upperHalfArray);
      var lowerMaxFr = 1;
      var upperAvgFr = 0.2;
      this.makeRoughBall(
        this.ball,
        this.modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8),
        this.modulate(upperAvgFr, 0, 1, 0, 4)
      );
      // group.rotation.y += 0.005;
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
    },
    makeRoughBall(mesh, bassFr, treFr) {
      var noise = new SimplexNoise();
      mesh.geometry.vertices.forEach(function(vertex, i) {
        var offset = mesh.geometry.parameters.radius+5;
        var amp = 5;
        var time = window.performance.now();
        vertex.normalize();
        var rf = 0.00001;
        var distance =
          offset +
          bassFr +
          noise.noise3D(
            vertex.x + time * rf * 7,
            vertex.y + time * rf * 8,
            vertex.z + time * rf * 9
          ) *
            amp *
            treFr;
        vertex.multiplyScalar(distance);
      });
      mesh.geometry.verticesNeedUpdate = true;
      mesh.geometry.normalsNeedUpdate = true;
      mesh.geometry.computeVertexNormals();
      mesh.geometry.computeFaceNormals();
    },
    createDataArray() {
      this.animate();
    },
    fractionate(val, minVal, maxVal) {
      return (val - minVal) / (maxVal - minVal);
    },
    modulate(val, minVal, maxVal, outMin, outMax) {
      var fr = this.fractionate(val, minVal, maxVal);
      var delta = outMax - outMin;
      return outMin + fr * delta;
    },

    avg(arr) {
      var total = arr.reduce(function(sum, b) {
        return sum + b;
      });
      return total / arr.length;
    },

    max(arr) {
      return arr.reduce(function(a, b) {
        return Math.max(a, b);
      });
    }
  },
  mounted() {
    this.init();
    this.createDataArray();
  }
};
</script>
<style scoped>
body {
  margin: 0;
}
canvas {
  display: block;
}
</style>