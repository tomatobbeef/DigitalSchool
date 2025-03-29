function park()
{
    viewer=window.parent.vi;
    pos=new Cesium.Cartesian3(-2291552.7298009736, 5002697.480840379, 3214700.5792261604)
    viewer.camera.flyTo({
        destination : pos,
        orientation : {
            head:3.037808197114813,
            pitch:-1.5268920873785223,
            roll:0
            
        }
    })
    window.parent.childopen(null,"newht","widgets/TwinCampus/parking/result.html")
}
