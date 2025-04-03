<template>
  <div ref="mapContainer" id="map" class="map"></div>
</template>

<script>

export default {
  name: 'MyMapComponent',
  mounted() {
    this.initMap();
  },
  methods: {

  }
};
</script>

<style scoped>
.map {
  width: 600px;
  height: 500px;
}
</style>